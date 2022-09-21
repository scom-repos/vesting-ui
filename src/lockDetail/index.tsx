import { customModule, Module, Styles, Control, Label, Icon, Table, Input, Button, Modal, VStack, Datepicker, Image, IEventBus, Panel, application, Container } from '@ijstech/components';
import { isWalletConnected, getChainId, getTokenIconPath } from '@vesting/store';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import * as api from './lockDetailAPI';
import moment from 'moment';
import { EventId } from '@vesting/global';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

const DefaultDateFormat = 'DD/MM/YYYY HH:MM';

interface TableContent {
  veatingId: number,
  locked: number | string,
  startDate: string,
  endDate: string,
  duration: string,
  recipient: string,
  dateCreated: string
}

@customModule
export class LockDetail extends Module {
  private imgCampaign: Image;
  private imgToken: Image;
  private lbCampaignName: Label;
  private label2: Label;
  private label5: Label;
  private label6: Label;
  private searchBox: Input;
  private searchBox1: Datepicker;
  private dateFrom: Label;
  private searchBox2: Datepicker;
  private dateTo: Label;
  private table1: Table;
  private csv: Button;
  private TotalCampaignLabel: Label;
  private TotalVestingRecords: Label;
  private TotalRecipientsLabel: Label;
  private TotalRecipientsCaption: Label;
  private TotalLockedLabel: Label;
  private TotalLockedCaption: Label;
  private TotalClaimedLabel: Label;
  private TotalClaimedCaption: Label;
  private addLock: Button;
  private copiedLockList: any;
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private loadingModal: Modal;
  private pageContent: VStack;

  private showStart: any = [];
  private showEnd: any = [];
  private showSearch: any = [];

  private locksDetails: api.ILocksDetails;

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
    this.searchBox1.onChanged = this.setDateLowerLimit.bind(this)
    this.searchBox2.onChanged = this.setDateUpperLimit.bind(this)
    this.classList.add(styleClass);

    // test
    // this.copiedLockList = [
    //   {
    //     locked: '1',
    //     recipient: '0x123',
    //     startDate: 1661420529,
    //     endDate: 1661440529
    //   },
    //   {
    //     locked: '2',
    //     recipient: '0x122',
    //     startDate: 1661420529,
    //     endDate: 1661460529
    //   },
    // ]
  }

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      await this.loadApiData_locksDetails();
      this.initShowList();
      this.setListAllVisible();
      this.renderFirstPanel();
      this.renderTable(this.copiedLockList);
      this.renderLastPanel();
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

  private initShowList() {
    for (let i = 0; i < this.copiedLockList.length; i++) {
      this.showStart.push(true);
      this.showEnd.push(true);
      this.showSearch.push(true);
    }
  }

  private unixTimeToString(unix: number) {
    return moment(unix * 1000).format(DefaultDateFormat)
  }

  private async loadApiData_locksDetails() {
    const lockDetails = await api.getLocksDetails(this.getCampaignId());
    if (lockDetails) {
      this.locksDetails = lockDetails;
      this.copiedLockList = this.locksDetails.lockInfoList;

      // calculate duration and transfer all unix timestamp to string
      for (let i = 0; i < this.copiedLockList.length; i++) {
        let duration = this.copiedLockList[i].endDate - this.copiedLockList[i].startDate;

        duration = parseInt((duration / 60 / 60 / 24).toFixed()); // get duration in form of day
        let yyyy, dd: number;
        if (duration >= 365) {
          yyyy = duration / 365;
          dd = duration % 365;
          this.copiedLockList[i].duration = yyyy + ' ' + 'year(s)' + ' ' + dd + ' ' + 'day(s)';
        } else {
          dd = duration;
          this.copiedLockList[i].duration = dd + ' ' + 'day(s)';
        }
        this.copiedLockList[i].startDate = this.unixTimeToString(this.copiedLockList[i].startDate)
        this.copiedLockList[i].endDate = this.unixTimeToString(this.copiedLockList[i].endDate)
        this.copiedLockList[i].dateCreated = this.unixTimeToString(this.copiedLockList[i].dateCreated)
      }
    }
  }

  private getCampaignId() {
    const arr = window.location.hash.split('/');
    return Number(arr[2]);
  }

  private setListAllVisible() {
    for (let i = 0; i < this.copiedLockList.length; i++) {
      this.copiedLockList[i].visible = true;
    }
  }

  private renderFirstPanel() {
    this.imgCampaign.url = this.locksDetails.campaignImgUrl;
    this.imgToken.url = Assets.fullPath(getTokenIconPath(this.locksDetails.tokenObj, getChainId()));
    this.lbCampaignName.caption = this.locksDetails.campaignName;
    this.label2.caption = `${this.locksDetails.tokenObj.name} (${this.locksDetails.tokenObj.symbol})`;
    this.label6.caption = this.locksDetails.tokenObj.address || '';
    this.addLock.caption = 'Add Lock';
  }

  private onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  private renderLastPanel() {
    let totalVestingRecords: number = 0;
    let totalRecipants: number = 0;
    let totalLocked: number = 0;
    let recipantsList: string[] = [];
    for (let i = 0; i < this.copiedLockList.length; i++) {
      totalVestingRecords++;
      totalLocked += Number(this.copiedLockList[i].locked);
      recipantsList.push(this.copiedLockList[i].recipient);
    }

    let uniqueRecipantsList = recipantsList.filter(this.onlyUnique)
    totalRecipants = uniqueRecipantsList.length;

    this.TotalCampaignLabel.caption = 'Total Vesting Records: ';
    this.TotalVestingRecords.caption = totalVestingRecords.toString();
    this.TotalRecipientsLabel.caption = 'Total Recipients: ';
    this.TotalRecipientsCaption.caption = totalRecipants.toString();
    this.TotalLockedLabel.caption = 'Total Locked: ';
    this.TotalLockedCaption.caption = totalLocked.toFixed(4).toString() + ' ' + this.locksDetails.tokenObj.symbol;
    // this.TotalClaimedLabel.caption = 'Total Claimed: ';
    // this.TotalClaimedCaption.caption = 'Disable';
    this.csv.caption = 'Download CSV';
  }

  private renderTable(dataSrc: any) {
    this.searchBox.placeholder = 'Search by Vesting ID or Recipient Address';
    this.dateFrom.caption = 'Date Range';
    this.dateTo.caption = 'to';
    this.table1.columns = [
      { title: 'Vesting ID', fieldName: 'vestingId', width: '12.5%', sortable: true },
      { title: 'Locked Amount', fieldName: 'locked', width: '12.5%', sortable: true },
      { title: 'Start Date (D/M/Y)', fieldName: 'startDate', width: '12.5%', sortable: true },
      { title: 'End Date (D/M/Y)', fieldName: 'endDate', width: '12.5%', sortable: true },
      { title: 'Duration', fieldName: 'duration', width: '12.5%', sortable: true },
      { title: 'Recipient', fieldName: 'recipient', width: '12.5%', sortable: true },
      { title: 'Lock Date (D/M/Y)', fieldName: 'dateCreated', width: '12.5%', sortable: true }
    ]

    let renderContent: TableContent[] = [];
    for (let i = 0; i < dataSrc.length; i++) {
      if (dataSrc[i].visible == true) {
        renderContent.push(dataSrc[i])
      }
    }
    for (let i = 0; i < renderContent.length; i++) {
      renderContent[i].locked = Number(renderContent[i].locked).toFixed(4)
    }
    this.table1.data = renderContent;
  }

  private onClickedAddLock(id: number) {
    window.location.href = `#/locks/${id}/addLock`;
  }

  private setDateLowerLimit() {
    const regex = /([0-9]+)\/([0-9]+)\/([0-9]+)/gm;
    const match = regex.exec(moment(this.searchBox1.value).format('DD/MM/YYYY'));
    const dd = parseInt(match![1])
    const mm = parseInt(match![2])
    const yyyy = parseInt(match![3])
    // console.log(parseInt(match![1]), parseInt(match![2]), parseInt(match![3]))

    this.showStart = []
    for (let i = 0; i < this.copiedLockList.length; i++) {
      let start_regex = /([0-9]+)\/([0-9]+)\/([0-9]+)/gm;
      let start_match = start_regex.exec(this.copiedLockList[i].startDate);
      let start_dd = parseInt(start_match![1])
      let start_mm = parseInt(start_match![2])
      let start_yyyy = parseInt(start_match![3])

      if ((start_yyyy < yyyy) || (start_yyyy >= yyyy && start_mm < mm) || (start_yyyy >= yyyy && start_mm >= mm && start_dd < dd)) {
        this.showStart.push(false)
      } else {
        this.showStart.push(true)
      }
    }
    this.showTableFilterResult();
  }

  private setDateUpperLimit() {
    const regex = /([0-9]+)\/([0-9]+)\/([0-9]+)/gm;
    const match = regex.exec(moment(this.searchBox2.value).format('DD/MM/YYYY'));
    const dd = parseInt(match![1])
    const mm = parseInt(match![2])
    const yyyy = parseInt(match![3])
    // console.log(parseInt(match![1]), parseInt(match![2]), parseInt(match![3]))

    this.showEnd = []
    for (let i = 0; i < this.copiedLockList.length; i++) {
      let end_regex = /([0-9]+)\/([0-9]+)\/([0-9]+)/gm;
      let end_match = end_regex.exec(this.copiedLockList[i].endDate);
      let end_dd = parseInt(end_match![1])
      let end_mm = parseInt(end_match![2])
      let end_yyyy = parseInt(end_match![3])

      if ((end_yyyy > yyyy) || (end_yyyy <= yyyy && end_mm > mm) || (end_yyyy <= yyyy && end_mm <= mm && end_dd > dd)) {
        this.showEnd.push(false)
      } else {
        this.showEnd.push(true)
      }
    }
    this.showTableFilterResult();
  }

  private onSearchBoxChanged() {
    this.showSearch = [];
    if (this.searchBox.value != null) {
      let pattern = this.searchBox.value as string
      let regex = new RegExp(pattern, 'i')
      for (let i = 0; i < this.copiedLockList.length; i++) {
        if (regex.test(this.copiedLockList[i].vestingId as string) == false
          && regex.test(this.copiedLockList[i].recipient) == false) {
          this.showSearch.push(false)
        } else {
          this.showSearch.push(true)
        }
      }
    } else {
      for (let i = 0; i < this.copiedLockList.length; i++) {
        this.showSearch.push(true);
      }
    }
    this.showTableFilterResult();
  }

  private showTableFilterResult() {
    this.setListAllVisible();
    for (let i = 0; i < this.copiedLockList.length; i++) {
      if (this.showSearch[i] && this.showStart[i] && this.showEnd[i]) {
        this.copiedLockList[i].visible = true;
      } else {
        this.copiedLockList[i].visible = false;
      }
    }
    this.renderTable(this.copiedLockList);
  }

  private downloadCSV() {
    let convertUnixToDate = this.copiedLockList;
    for (let i = 0; i < convertUnixToDate.length; i++) {
      if (typeof (convertUnixToDate[i].startDate) == 'number') {
        convertUnixToDate[i].startDate = this.unixTimeToString(convertUnixToDate[i].startDate)
      }
      if (typeof (convertUnixToDate[i].endDate) == 'number') {
        convertUnixToDate[i].endDate = this.unixTimeToString(convertUnixToDate[i].endDate)
      }
      if (typeof (convertUnixToDate[i].dateCreated) == 'number') {
        convertUnixToDate[i].dateCreated = this.unixTimeToString(convertUnixToDate[i].dateCreated)
      }
    }
    var json = convertUnixToDate  // here
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

  render() {
    return (
      <i-panel id='MainPnl' height='100%' width='100%'>
        <i-vstack id='pageContent' horizontalAlignment='center'>
          <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='228px' horizontalAlignment='center' width='100%'>
            <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='175px' maxWidth='1400px' width='calc(100% - 3rem)'
              margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}
              background={{color: '#000000'}} border={{ radius: '27px', width: '2.7px', color: '#A8A8A8', style: 'solid' }} gap={10}
              mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}>
              <i-hstack horizontalAlignment='center' stack={{ basis: '20%', shrink: '1', grow: '1' }}>
                <i-image id='imgCampaign' height="100px" />
              </i-hstack>
              <i-grid-layout templateRows={['auto', 'auto', 'auto', 'auto']} templateColumns={['30%', '70%']} stack={{ basis: '50%', shrink: '1', grow: '1' }}
                gap={{ row: 5, column: 5 }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }} verticalAlignment='center'>
                <i-label caption='Campaign Name: ' grid={{ row: 1, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                <i-label id='lbCampaignName' grid={{ row: 1, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                <i-label caption='Token Name: ' grid={{ row: 2, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                <i-hstack verticalAlignment='center' gap="1rem" grid={{ row: 2, column: 2 }}>
                  <i-label id='label2' font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                  <i-image id='imgToken' height='40' width='40' />
                </i-hstack>  
                <i-label caption='Token Address: ' grid={{ row: 3, column: 1 }} font={{ name: 'Montserrat', size: '13.27px' }}></i-label>
                <i-label id='label6' grid={{ row: 3, column: 2 }} font={{ name: 'Montserrat', size: '13.27px' }} class='address'></i-label>
              </i-grid-layout>           
              <i-hstack stack={{ basis: '30%', shrink: '1', grow: '1' }}>
                <i-button id='addLock' width='190' height='47' onClick={() => this.onClickedAddLock(this.getCampaignId())}></i-button>
              </i-hstack>
            </i-stack>
          </i-grid-layout>
          <i-grid-layout templateColumns={['auto']} templateRows={['auto']} horizontalAlignment='center' width='100%'>
            <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' maxWidth='1400px' width='calc(100% - 3rem)' margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
              padding={{ left: '10', right: '10', top: '10', bottom: '10' }} gap={10} mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}>
              <i-hstack verticalAlignment='center' horizontalAlignment='start' stack={{ basis: '65%' }} minWidth='300px'>
                <i-input id='searchBox' background={{color: '#000000'}} width='100%' maxWidth='750px' minWidth='300px' onChanged={this.onSearchBoxChanged} />
              </i-hstack>
              <i-hstack verticalAlignment='center' horizontalAlignment='end' gap={5} stack={{ basis: '20%' }} minWidth='300px'>
                <i-label id='dateFrom' />
                <i-datepicker id='searchBox1' placeholder='Start' width='100%' captionWidth="0px" />
              </i-hstack>
              <i-hstack verticalAlignment='center' horizontalAlignment='end' gap={5} stack={{ basis: '15%' }} minWidth='300px'>
                <i-label id='dateTo' />
                <i-datepicker id='searchBox2' placeholder='End' width='100%' captionWidth="0px" />
              </i-hstack>
            </i-stack>
          </i-grid-layout>
          <i-vstack maxWidth='1400px' width='calc(100% - 3rem)' margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
            padding={{ left: '10', right: '10', top: '10', bottom: '10' }}>
            <i-table id='table1' heading={true} background={{color: '#000000'}} font={{ name: 'Montserrat', size: '12px' }}></i-table>
          </i-vstack>
          <i-grid-layout minHeight='156px' maxWidth='1400px' width='calc(100% - 3rem)' padding={{ left: '1rem', right: '1rem', top: '1rem', bottom: '1rem' }}
            margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} background={{color: '#000000'}} border={{ radius: '27px', width: '1px', color: '#000000', style: 'solid' }}
            gap={{ row: 5, column: 5 }} templateColumns={['20%', '20%', '20%', '20%', '20%']} templateRows={['50%', '50%']}
            templateAreas=
            {[['record_label_area', 'record_value_area', 'lock_label_area', 'lock_value_area', 'btn_area'],
            ['recipient_label_area', 'recipient_value_area', 'claim_label_area', 'claim_value_area', 'btn_area']]}
            mediaQueries={
              [
                {
                  maxWidth: '742px',
                  properties: {
                    templateColumns: ['50%', '50%'],
                    templateRows: ['20%', '20%', '20%', '20%', '20%'],
                    templateAreas: [
                      ['record_label_area', 'record_value_area'],
                      ['lock_label_area', 'lock_value_area'],
                      ['recipient_label_area', 'recipient_value_area'],
                      ['claim_label_area', 'claim_value_area'],
                      ['btn_area', 'btn_area']
                    ]
                  }
                }
              ]
            }>
            <i-hstack grid={{ area: 'record_label_area' }} horizontalAlignment='start' verticalAlignment='center'>
              <i-label id='TotalCampaignLabel' font={{ name: 'Montserrat', size: '16px' }} ></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'record_value_area' }} horizontalAlignment='end' verticalAlignment='center'>
              <i-label id='TotalVestingRecords' font={{ name: 'Montserrat', size: '16px' }} ></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'recipient_label_area' }} horizontalAlignment='start' verticalAlignment='center'>
              <i-label id='TotalRecipientsLabel' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'recipient_value_area' }} horizontalAlignment='end' verticalAlignment='center'>
              <i-label id='TotalRecipientsCaption' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'lock_label_area' }} horizontalAlignment='start' verticalAlignment='center'>
              <i-label id='TotalLockedLabel' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'lock_value_area' }} horizontalAlignment='end' verticalAlignment='center' >
              <i-label id='TotalLockedCaption' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'claim_label_area' }} horizontalAlignment='start' verticalAlignment='center' >
              <i-label id='TotalClaimedLabel' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'claim_value_area' }} horizontalAlignment='end' verticalAlignment='center' >
              <i-label id='TotalClaimedCaption' font={{ name: 'Montserrat', size: '16px' }}></i-label>
            </i-hstack>
            <i-vstack grid={{ area: 'btn_area' }} horizontalAlignment='center' verticalAlignment='center' >
              <i-button id='csv' height='44px' width='170px' onClick={this.downloadCSV}></i-button>
            </i-vstack>
          </i-grid-layout>
        </i-vstack>
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
