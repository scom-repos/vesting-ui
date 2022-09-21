import { customModule, application, Module, Styles, Control, Label, Button, Modal, Input, Table, Image, Datepicker, IEventBus, Panel, VStack, Container } from '@ijstech/components';
import { isWalletConnected, getChainId, getTokenIconPath } from '@vesting/store';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import * as api from '../lockDetail/lockDetailAPI'
import * as api_lock from '../locks/locksAPI'
import moment from 'moment';
import { EventId, ITokenObject } from '@vesting/global';
import { ILockRecord } from '@scom/vesting-sdk';
import { Utils } from "@ijstech/eth-wallet";
import { Result } from '@vesting/main';
import { IERC20ApprovalAction, IERC20ApprovalEventOptions, ERC20ApprovalModel } from '../global/approvalModel'
import { ILocksDetails, ILockExtInfo } from '../lockDetail/lockDetailAPI'

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

const DefaultDateFormat = 'DD/MM/YYYY HH:MM';

interface Recipient {
  recipient: string,
  amount: string,
  startDate: number,
  endDate: number,
  no: number
}

interface Recipient_str {
  recipient: string,
  amount: string,
  startDate: string,
  endDate: string,
  no: string
}

interface RecipientShowOnTable {
  recipient: string,
  amount: string,
  startDate: string,
  endDate: string,
  no: number,
  duration: string
}

@customModule
export class newLock extends Module {

  private label1: Label;
  private label2: Label;
  private label5: Label;
  private label6: Label;
  private label7: Label;
  private label8: Label;
  private label9: Label;
  private label10: Label;
  private label11: Label;
  private label12: Label;
  private label13: Label;
  private label14: Label;
  private label15: Label;
  private label16: Label;
  private label17: Label;
  private label18: Label;
  private campaignNameLabel: Label;
  private campaignName: Label;
  private firstPnlIcon: Image;
  private dlcsvBtn: Button;
  private impcsvBtn: Button;
  private addRecipientBtn: Button;
  private table: Table;
  private backBtn: Button;
  private approveBtn: Button;
  private confirmBtn: Button;
  private addRecipientModal: Modal;
  private popup_recipient_label: Label;
  private popup_recipient_value: Input;
  private popup_amount_label: Label;
  private popup_amount_value: Input;
  private popup_startD_label: Label;
  private popup_startD_value: Datepicker;
  private popup_endD_label: Label;
  private popup_endD_value: Datepicker;
  private popup_title: Label;
  private popup_addBtn: Button;
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private openswapResult: Result;
  private approvalModelAction: IERC20ApprovalAction;
  private approvalModel: ERC20ApprovalModel;
  private confirmBtn_spin: Button;
  private approveBtn_spin: Button;

  private locksDetails: any;
  private earilestStartDate: number;
  private lastestEndDate: number;
  private recipientsToBeAdded: Recipient[] = [];
  private recipientCounter: number = 0;
  private totalLocked: number = 0;
  private loadingModal: Modal;
  private pageContent: VStack;

  private addRecipientStartDate: number;
  private addRecipientEndDate: number;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvents();
  }

  async onLoad() {
    this.pageContent.visible = false;
    this.loadingModal.visible = true
    await this.onSetupPage(isWalletConnected());
    this.pageContent.visible = true;
    this.loadingModal.visible = false
  }

  registerEvents() {
    this.$eventBus.register(this, EventId.IsWalletConnected, this.onWalletConnect)
    this.$eventBus.register(this, EventId.chainChanged, this.onChainChange)
    this.$eventBus.register(this, EventId.IsWalletDisconnected, this.onWalletConnect)
  }

  onWalletConnect = async (connected: boolean) => {
    let chainId = getChainId();
    if (connected && !chainId) {
      this.onChainChange();
    } else {
      this.onSetupPage(connected);
    }
  }

  onChainChange = () => {
    this.onSetupPage(true);
  }

  async init() {
    super.init();
    this.popup_startD_value.onChanged = this.onSetStartDate.bind(this)
    this.popup_endD_value.onChanged = this.onSetEndDate.bind(this)
    this.classList.add(styleClass);
    this.initApprovalModelAction();

    // dummy_code
    // this.recipientsToBeAdded = [
    //   {
    //     recipient: '123',
    //     startDate: 1661422794,
    //     endDate: 1661432794,
    //     amount: '1',
    //     no: 0
    //   },
    //   {
    //     recipient: '124',
    //     startDate: 1661422794,
    //     endDate: 2661422794,
    //     amount: '1',
    //     no: 1
    //   }
    // ]
  }

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      await this.loadApiData_locksDetails();
      this.renderFirstPanel();
      this.renderRecipientDetailPanel();
      this.renderBtnBar();
      this.renderTable();
      this.renderpopUpWindow();
      this.showApproveBtnAndConfirmBtn();
    } else {
      this.renderNotConnected();
    }
  }

  private renderNotConnected() {
    this.MainPnl.innerHTML = '';
    const elm =
      <i-vstack horizontalAlignment="center" verticalAlignment='center' width='100%' height='100%'>
        <i-label caption="Please connect with your wallet" />
      </i-vstack>
    this.MainPnl.append(elm);
  }

  private onSetStartDate() {
    if (this.popup_startD_value.value) {
      this.addRecipientStartDate = this.popup_startD_value.value.unix();
    } else {
      this.addRecipientStartDate = 0;
    }
  }

  private onSetEndDate() {
    if (this.popup_endD_value.value) {
      this.addRecipientEndDate = this.popup_endD_value.value.unix();
    } else {
      this.addRecipientEndDate = 0;
    }
  }

  private unixTimeToString(unix: number | string) {
    if (typeof (unix) == 'number') {
      return moment(unix * 1000).format(DefaultDateFormat)
    } else {
      return unix
    }
  }

  // private stringToUnixtime(str: number | string) {
  //   if (typeof (str) == 'number') {
  //     return str
  //   } else {
  //     return moment(str, 'DD/MM/YYYY').unix();
  //   }
  // }

  private async loadApiData_locksDetails() {
    this.locksDetails = await api.getLocksDetails(this.getCampaignId());
  }

  private calculateEarilestStartDateAndLastestEndDate() {
    let startDateList: number[] = [];
    let endDateList: number[] = [];

    for (let i = 0; i < this.recipientsToBeAdded.length; i++) {
      startDateList.push(this.recipientsToBeAdded[i].startDate)
      endDateList.push(this.recipientsToBeAdded[i].endDate)
    }

    this.earilestStartDate = Math.min.apply(Math, startDateList)
    this.lastestEndDate = Math.max.apply(Math, endDateList)
  }

  private getCampaignId() {
    const arr = window.location.hash.split('/');
    return Number(arr[2]);
  }

  private renderBtnBar() {
    this.campaignNameLabel.caption = 'Campaign Name';
    this.campaignName.caption = this.locksDetails.tokenObj.name;
    this.dlcsvBtn.caption = 'Download CSV';
    this.impcsvBtn.caption = 'Import CSV';
    this.addRecipientBtn.caption = 'Add Recipient';
    this.addRecipientBtn.icon.name = 'plus';

    //second button bar
    this.backBtn.caption = 'BACK';
    this.approveBtn.caption = 'APPROVE';
    this.confirmBtn.caption = 'Confirm';
    this.approveBtn_spin.caption = 'APPROVING';
    this.confirmBtn_spin.caption = 'Confirming';
    this.confirmBtn_spin.rightIcon = <i-icon name='spinner' spin={true} height='20px' width='20px' />
    this.approveBtn_spin.rightIcon = <i-icon name='spinner' spin={true} height='20px' width='20px' />
  }

  private onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  private renderFirstPanel() {
    this.firstPnlIcon.url = Assets.fullPath(getTokenIconPath(this.locksDetails.tokenObj, getChainId()));
    this.label1.caption = 'Symbol: ';
    this.label2.caption = this.locksDetails.tokenObj.symbol;
    this.label5.caption = 'Contract Address: ';
    this.label6.caption = this.locksDetails.tokenObj.address;
    this.label7.caption = 'Decimals: ';
    this.label8.caption = this.locksDetails.tokenObj.decimals;
    this.label9.caption = 'Your Balance: ';
    this.label10.caption = 'Disabled';
  }

  private renderRecipientDetailPanel() {
    this.calculateEarilestStartDateAndLastestEndDate();
    let totalRecipants: number = 0;
    this.totalLocked = 0;
    let recipantsList: string[] = [];

    for (let i = 0; i < this.recipientsToBeAdded.length; i++) {
      this.totalLocked += Number(this.recipientsToBeAdded[i].amount);
      recipantsList.push(this.recipientsToBeAdded[i].recipient);
    }

    let uniqueRecipantsList = recipantsList.filter(this.onlyUnique)
    totalRecipants = uniqueRecipantsList.length;

    this.label11.caption = 'Total Recipients:';
    this.label12.caption = totalRecipants.toString();
    this.label13.caption = 'Total locked: ';
    this.label14.caption = Number(this.totalLocked).toFixed(4) + ' ' + this.locksDetails.tokenObj.symbol;
    this.label15.caption = 'Earliest Start date: ';
    this.label16.caption = this.unixTimeToString(this.earilestStartDate);
    this.label17.caption = 'Lastest End Date: ';
    this.label18.caption = this.unixTimeToString(this.lastestEndDate);
  }

  private deleteRecipient(rowData: any) {
    const no = rowData.no;
    const index = this.recipientsToBeAdded.findIndex(v => v.no == no);
    if (index >= 0) {
      this.recipientsToBeAdded.splice(index, 1);
    }
    this.table.data = this.recipientsToBeAdded;
    this.renderRecipientDetailPanel()
  }

  private addRecipient() {
    if (!this.popup_recipient_value.value || !this.popup_amount_value.value ||
      !this.addRecipientStartDate || !this.addRecipientEndDate) { return; }

    let item: Recipient = {
      recipient: this.popup_recipient_value.value,
      amount: this.popup_amount_value.value,
      startDate: this.addRecipientStartDate,
      endDate: this.addRecipientEndDate,
      no: this.recipientCounter++
    };

    this.recipientsToBeAdded.push(item)
    this.disablePopupWindow();
    this.renderRecipientDetailPanel();
    this.showApproveBtnAndConfirmBtn();
    this.renderTable();
  }

  private calculateDuration(startDate: number, endDate: number) {
    let duration = endDate - startDate;
    duration = parseInt((duration / 60 / 60 / 24).toFixed());
    let yyyy: number, dd: number;
    let duration_str = '0'
    if (duration >= 365) {
      yyyy = duration / 365;
      dd = duration % 365;
      duration_str = Math.floor(yyyy) + ' ' + 'year(s)' + ' ' + dd + ' ' + 'day(s)';
    } else {
      dd = duration;
      duration_str = dd + ' ' + 'day(s)';
    }
    return duration_str;
  }

  private async confirmAddRecipient() {
    if (this.recipientsToBeAdded.length == 0) { return; }
    let lockRecords: ILockRecord[] = [];

    for (let i = 0; i < this.recipientsToBeAdded.length; i++) {
      let item: ILockRecord = {
        account: this.recipientsToBeAdded[i].recipient,
        amount: Utils.toDecimals(this.recipientsToBeAdded[i].amount).toFixed(),
        startDate: this.recipientsToBeAdded[i].startDate,
        endDate: this.recipientsToBeAdded[i].endDate
      }
      lockRecords.push(item)
    }
    this.recipientsToBeAdded = []
    let campaignId = this.getCampaignId()
    this.onPayRouter();
    await api.doMerkleLock(campaignId, lockRecords)
  }

  private onPayRouter = () => {
    this.openswapResult.message = {
      status: 'warning',
      content: `Comfirming`
    }
    this.openswapResult.showModal();
    this.approvalModelAction.doPayAction(null);
  }

  private enablePopupWindow() {
    this.addRecipientModal.visible = true;
  }

  private disablePopupWindow() {
    this.addRecipientModal.visible = false;
  }

  private renderpopUpWindow() {
    this.popup_recipient_label.caption = 'Recipient: '
    this.popup_amount_label.caption = 'Amount: '
    this.popup_startD_label.caption = 'Start Date (D/M/Y): '
    this.popup_endD_label.caption = 'End Date (D/M/Y): '

    this.popup_title.caption = 'Add Recipient'
    this.popup_addBtn.caption = 'Add'
  }

  private backToMyCampaignDetail() {
    let id = this.getCampaignId()
    window.location.href = `#/locks/${id}`;
  }

  private async showApproveBtnAndConfirmBtn() {
    await this.approvalModelAction.checkAllowance(this.locksDetails.tokenObj, this.totalLocked.toFixed());
  }

  private approveAddRecipient() {
    this.onApproveRouterMax();
  }

  onSubmit = async () => {
    this.openswapResult.showModal();
  }

  private getApprovalModelAction = async (options: IERC20ApprovalEventOptions) => {
    const address = await api_lock.getVaultContractAddress();
    const approvalOptions = {
      ...options,
      spenderAddress: address
    };
    this.approvalModel = new ERC20ApprovalModel(approvalOptions);
    let approvalModelAction = this.approvalModel.getAction();
    return approvalModelAction;
  }

  async initApprovalModelAction() {
    this.approvalModelAction = await this.getApprovalModelAction({
      sender: this,
      payAction: this.onSubmit,
      // added a recipient, but still bot approved
      onToBeApproved: async (token: ITokenObject) => {
        this.approveBtn.visible = true;
        this.confirmBtn.visible = false;
      },
      onToBePaid: async (token: ITokenObject) => {
        this.approveBtn.visible = false;
        this.confirmBtn.visible = true;
      },
      // comfirmed at meta mask, but still loading
      onApproving: async (token: ITokenObject, receipt?: string, data?: any) => {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.approveBtn_spin.visible = true;
        this.approveBtn.visible = false
        this.confirmBtn.visible = false;
        this.openswapResult.showModal();
      },
      // finished whole approve action
      onApproved: async (token: ITokenObject, data?: any) => {
        this.approveBtn_spin.visible = false;
        this.approveBtn.visible = false;
        this.confirmBtn.visible = true;
      },
      onApprovingError: async (token: ITokenObject, err: Error) => {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        this.openswapResult.showModal();
        this.approveBtn_spin.visible = false;
        this.approveBtn.visible = true;
        this.confirmBtn.visible = false;
      },
      onPaying: async (receipt?: string, data?: any) => {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.confirmBtn_spin.visible = true;
        this.confirmBtn.visible = false
        this.approveBtn.visible = false;
        this.openswapResult.showModal();
      },
      onPaid: async (data?: any) => {
        application.EventBus.dispatch(EventId.Paid);
        this.confirmBtn_spin.visible = false;
        this.confirmBtn.visible = true;
        this.recipientsToBeAdded = []
        this.renderTable()
      },
      onPayingError: async (err: Error) => {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        this.confirmBtn_spin.visible = false;
        this.confirmBtn.visible = true;
        this.approveBtn.visible = false;
        this.openswapResult.showModal();
      }
    })
  }

  // Meta mask window is showing
  private onApproveRouterMax = () => {
    this.openswapResult.message = {
      status: 'warning',
      content: `Approving`
    }
    this.openswapResult.showModal();
    this.approvalModelAction.doApproveAction(this.locksDetails.tokenObj, '1', null);
  }

  private downloadCSV() {
    let convertUnixToDate: any = this.recipientsToBeAdded;
    for (let i = 0; i < convertUnixToDate.length; i++) {
      if (typeof (convertUnixToDate[i].startDate) == 'number') {
        convertUnixToDate[i].startDate = this.unixTimeToString(convertUnixToDate[i].startDate)
      }
      if (typeof (convertUnixToDate[i].endDate) == 'number') {
        convertUnixToDate[i].endDate = this.unixTimeToString(convertUnixToDate[i].endDate)
      }
    }
    var json = convertUnixToDate
    var fields = Object.keys(json[0])
    var replacer = function (key: any, value: any) { return value === null ? '' : value }
    var csv: any = json.map(function (row: any) {
      return fields.map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    console.log(csv)

    // download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'Recipient list');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private importCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    this.recipientsToBeAdded.forEach(function (rowArray: any) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  private renderTable() {
    const columnData = [
      { title: 'Recipient', fieldName: 'recipient', width: '26%', sortable: true },
      { title: 'Amount', fieldName: 'amount', width: '18%', sortable: true },
      { title: 'Start Date (D/M/Y)', fieldName: 'startDate', width: '18.5%', sortable: true },
      { title: 'End Date (D/M/Y)', fieldName: 'endDate', width: '18.5%', sortable: true },
      { title: 'Duration', fieldName: 'duration', width: '10%', sortable: true },
      {
        title: '', fieldName: 'button1', width: '5%', sortable: false,
        onRenderCell: (source: Control, columnData: any, rowData: any) => {
          return <i-icon id='deleteRecipientBtn' class='deleteRecipientBtn' name='times-circle' fill='white' width='20px' height='20px' background={{color: '#F29224'}}
            onClick={() => this.deleteRecipient(rowData)} padding={{ top: 2, bottom: 2, right: 2, left: 2 }} />
        }
      },
      {
        title: '', fieldName: 'button2', width: '4%', sortable: false,
        onRenderCell: (source: Control, columnData: any, rowData: any) => {
          return <i-icon class='copy' name='copy' fill='white' width='20px' height='20px' background={{color: '#F29224'}}
            padding={{ top: 2, bottom: 2, right: 2, left: 2 }} tooltip={{ content: `The data has been copied`, trigger: 'click' }}
            onClick={() => application.copyToClipboard((JSON.stringify(rowData)) || '')}
          />
        }
      }
    ]
    this.table.columns = columnData;
    let recipientsToBeAdded_fixed: RecipientShowOnTable[] = []
    if (this.recipientsToBeAdded.length != 0) {
      for (let i = 0; i < this.recipientsToBeAdded.length; i++) {
        let item: RecipientShowOnTable = {
          recipient: this.recipientsToBeAdded[i].recipient,
          amount: Number(this.recipientsToBeAdded[i].amount).toFixed(4),
          startDate: this.unixTimeToString(this.recipientsToBeAdded[i].startDate),
          endDate: this.unixTimeToString(this.recipientsToBeAdded[i].endDate),
          no: this.recipientsToBeAdded[i].no,
          duration: this.calculateDuration(this.recipientsToBeAdded[i].startDate, this.recipientsToBeAdded[i].endDate),
        }
        recipientsToBeAdded_fixed.push(item)
      }
    }
    this.table.data = recipientsToBeAdded_fixed;
  }

  render() {
    return (
      <i-panel id='MainPnl' height='100%' width='100%'>
        <i-vstack id='pageContent' width='100%' horizontalAlignment='center'>
          <i-hstack width='100%' maxWidth='1400px' horizontalAlignment='center'>
            <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='228px' horizontalAlignment='center' width='100%' stack={{ basis: '60%' }}>
              <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='175px' maxWidth='1400px' width='calc(100% - 3rem)'
                margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}
                background={{color: '#000000'}} border={{ radius: '27px' }} gap={10}
                mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}>
                <i-hstack horizontalAlignment='center' stack={{ basis: '15%', shrink: '1', grow: '1' }}>
                  <i-image id='firstPnlIcon' height='100' width='100' />
                </i-hstack>
                <i-grid-layout templateRows={['auto', 'auto', 'auto', 'auto']} templateColumns={['30%', '70%']} stack={{ basis: '75%', shrink: '1', grow: '1' }}
                  gap={{ row: 5, column: 5 }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }} verticalAlignment='center'>
                  <i-label id='label1' grid={{ row: 1, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label2' grid={{ row: 1, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>

                  <i-label id='label5' grid={{ row: 2, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label6' grid={{ row: 2, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }} class='address'></i-label>

                  <i-label id='label7' grid={{ row: 3, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label8' grid={{ row: 3, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>

                  <i-label id='label9' grid={{ row: 4, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label10' grid={{ row: 4, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                </i-grid-layout>
              </i-stack>
            </i-grid-layout>
            <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='228px' horizontalAlignment='center' width='100%' stack={{ basis: '40%' }}>
              <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='175px' maxWidth='1400px' width='calc(100% - 3rem)'
                margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}
                background={{color: '#000000'}} border={{ radius: '27px' }} gap={10}
                mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}>
                <i-grid-layout templateRows={['auto', 'auto', 'auto', 'auto']} templateColumns={['50%', '50%']} width='100%'
                  gap={{ row: 5, column: 5 }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }} verticalAlignment='center'>
                  <i-label id='label11' grid={{ row: 1, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label12' grid={{ row: 1, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>

                  <i-label id='label13' grid={{ row: 2, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label14' grid={{ row: 2, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>

                  <i-label id='label15' grid={{ row: 3, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label16' grid={{ row: 3, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }} class='address'></i-label>

                  <i-label id='label17' grid={{ row: 4, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-label id='label18' grid={{ row: 4, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                </i-grid-layout>
              </i-stack>
            </i-grid-layout>
          </i-hstack>
          <i-hstack width='100%' maxWidth='1400px' horizontalAlignment='center'>
            <i-hstack width='calc(100% - 3rem)' horizontalAlignment='start'
              margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}>
              <i-hstack horizontalAlignment='start' verticalAlignment='center' gap={7} stack={{ basis: '50%' }}>
                <i-label id='campaignNameLabel' font={{ name: 'Montserrat', size: '16px' }} />
                <i-hstack width='200px' height='46px' border={{ width: '3.45px', color: '#9C9C9C', style: 'solid', radius: '11.51px' }}
                  verticalAlignment='center' horizontalAlignment='center' background={{color: '#000000'}}>
                  <i-label id='campaignName' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                </i-hstack>
              </i-hstack>
              <i-hstack horizontalAlignment='end' gap={7} verticalAlignment='center' stack={{ basis: '50%' }}>
                <i-button id='dlcsvBtn' width='170px' height='44px' background={{color: '#34343A'}} font={{ size: '17.64px' }} onClick={this.downloadCSV} />
                <i-button id='impcsvBtn' width='170px' height='44px' background={{color: '#34343A'}} font={{ size: '17.64px' }} onClick={this.importCSV} />
                <i-button id='addRecipientBtn' width='170px' height='44px' background={{color: 'linear-gradient(270deg, #FF9900 0%, #FC7428 100%)'}} font={{ size: '17.64px' }} onClick={this.enablePopupWindow} />
              </i-hstack>
            </i-hstack>
          </i-hstack>
          <i-hstack width='100%' maxWidth='1400px' horizontalAlignment='center'>
            <i-hstack width='calc(100% - 3rem)' horizontalAlignment='start'
              margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}>
              <i-table id='table' heading={true} background={{color: '#000000'}} font={{ name: 'Montserrat', size: '13px' }} width='100%' />
            </i-hstack>
          </i-hstack>
          <i-vstack width='100%' maxWidth='1400px' horizontalAlignment='center'>
            <i-hstack width='calc(100% - 3rem)' horizontalAlignment='end' gap={10}
              margin={{ left: '1.5rem', right: '1.5rem', bottom: '1rem' }} padding={{ left: '10', right: '10', bottom: '10', top: '10' }}>
              <i-button id='backBtn' width='200px' height='50' background={{color: 'linear-gradient(270deg, #7B7B7B 0%, #929292 100%)'}} onClick={this.backToMyCampaignDetail} />
              <i-button id='approveBtn' width='200px' height='50' background={{color: '#34343A'}} onClick={this.approveAddRecipient} />
              <i-button id='confirmBtn' width='200px' height='50' onClick={this.confirmAddRecipient} />
              <i-button id='approveBtn_spin' width='200px' height='50' background={{color: '#34343A'}} visible={false} />
              <i-button id='confirmBtn_spin' width='200px' height='50' visible={false} />
            </i-hstack>
          </i-vstack>
        </i-vstack>
        <i-modal
          id='addRecipientModal' maxWidth='500px' closeIcon={{ name: 'times-circle', fill: '#fff' }}>
          <i-grid-layout
            width='100%'
            verticalAlignment='center' gap={{ row: 5 }}
            padding={{ top: '1rem', bottom: '1rem', left: '2rem', right: '2rem' }}
            templateColumns={['1fr', '1fr']}
            templateRows={['auto', 'auto', 'auto', 'auto', 'auto', 'auto']}
            templateAreas={
              [
                ['title_area', 'title_area'],
                ["recipient_label_area", "recipient_value_area"],
                ["amount_label_area", "amount_value_area"],
                ['startD_label_area', 'startD_value_area'],
                ['endD_label_area', 'endD_value_area'],
                ['addBtn_area', 'addBtn_area']
              ]
            }>

            <i-hstack width='100%' horizontalAlignment='center' grid={{ area: 'title_area' }} padding={{ bottom: 15 }}>
              <i-label id='popup_title' font={{ size: '20px', color: 'rgb(252, 116, 40)' }}></i-label>
            </i-hstack>

            <i-label id='popup_recipient_label' grid={{ area: 'recipient_label_area' }} font={{ name: 'montserrat' }} />
            <i-input id='popup_recipient_value' grid={{ area: 'recipient_value_area' }} font={{ name: 'montserrat' }} width='100%' />

            <i-label id='popup_amount_label' grid={{ area: 'amount_label_area' }} font={{ name: 'montserrat' }} />
            <i-input id='popup_amount_value' grid={{ area: 'amount_value_area' }} font={{ name: 'montserrat' }} width='100%' />

            <i-label id='popup_startD_label' grid={{ area: 'startD_label_area' }} font={{ name: 'montserrat' }} />
            <i-datepicker id='popup_startD_value' type='dateTime' grid={{ area: 'startD_value_area' }} font={{ name: 'montserrat' }} width='100%' captionWidth="0px" />

            <i-label id='popup_endD_label' grid={{ area: 'endD_label_area' }} font={{ name: 'montserrat' }} />
            <i-datepicker id='popup_endD_value' type='dateTime' grid={{ area: 'endD_value_area' }} font={{ name: 'montserrat' }} width='100%' captionWidth="0px" />

            <i-hstack width='100%' horizontalAlignment='center' grid={{ area: 'addBtn_area' }} padding={{ top: 15 }}>
              <i-button id='popup_addBtn' font={{ name: 'montserrat' }} width='100px' height='44px' onClick={this.addRecipient} />
            </i-hstack>

          </i-grid-layout>
        </i-modal>
        <portal-result
          id='openswapResult' maxWidth='500px'>
        </portal-result>
        <i-modal id='loadingModal' width={500} minHeight={300} closeOnBackdropClick={false}>
          <i-hstack horizontalAlignment="center" verticalAlignment='center' width='100%' height={300}>
            <i-label caption="Loading" />
            <i-icon name='spinner' spin={true} margin={{ left: 10 }} width='50px' height='50px' fill='white' />
          </i-hstack>
        </i-modal>
      </i-panel>
    )
  }
}
