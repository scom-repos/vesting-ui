import { customModule, application, Module, Styles, Control, Input, VStack, IEventBus, Container, Label} from '@ijstech/components';
import { isWalletConnected, getChainId, setDataFromSCConfig, getVaultFactoryAddress } from '@vesting/store';
import Assets from '@vesting/assets';
import { EventId, registerSendTxEvents } from '@vesting/global';
import { TransactionReceipt } from "@ijstech/eth-wallet";
import { getNewProfileId, newProfile } from './API';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

interface IAdminInfo {
  address: string;
  index: number;
}

@customModule
export class Admin extends Module {
  private vstackAdmins: VStack;
  private $eventBus: IEventBus;
  private adminInfoList: IAdminInfo[];
  private adminRowList: Node[];
  private adminRowCount: number;
  private pnlErrorMsg: VStack;
  private lbErrorMsg: Label;
  private pnlMain: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    let scconfig = require('../scconfig.json');
    if (scconfig) {
      setDataFromSCConfig(scconfig);
    }
    this.registerEvents();
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
    this.adminInfoList = [];
    this.adminRowList = [];
    this.adminRowCount = 0;
    this.addAdmin();
    this.onSetupPage(isWalletConnected());
  }

  private async onSetupPage(isWalletConnected: boolean){
    if (isWalletConnected) {
      let factory = await getVaultFactoryAddress();
      if (factory) {
        this.pnlErrorMsg.visible = false;
        this.pnlMain.visible = true;
      }
      else {
        this.lbErrorMsg.caption = 'No Vault Factory is found on this chain';
        this.pnlErrorMsg.visible = true;
        this.pnlMain.visible = false;
      }
    }
    else {
      this.lbErrorMsg.caption = 'Please connect your wallet';
      this.pnlErrorMsg.visible = true;
      this.pnlMain.visible = false;
    }
  }

  private clickRemoveAdmin(target: Control, idx: number) {
    if (this.adminInfoList.length > 0) {
      const adminInfoIdx = this.adminInfoList.findIndex(v => v.index == idx);
      if (adminInfoIdx != -1) this.adminInfoList.splice(adminInfoIdx, 1);
    }
    if (this.adminRowList.length > idx) {
      this.vstackAdmins.removeChild(this.adminRowList[idx]);
    }
  }

  private changeAdminAddress(target: Control, idx: number) {
    const address = (target as Input).value;
    const adminInfoIdx =  this.adminInfoList.findIndex(v => v.index == idx);
    if (adminInfoIdx != -1) {
      this.adminInfoList[adminInfoIdx].address = address;
    }
    else {
      this.adminInfoList.push({
        address,
        index: idx
      })
    }
  }

  private addAdmin() {
    let idx = this.adminRowCount;
    let adminRow;
    if (idx == 0) {
      adminRow = (
        <i-hstack width="100%">
          <i-input width="90%" onChanged={(target: Control) => this.changeAdminAddress(target, idx)}></i-input>
        </i-hstack>
      )
    }
    else {
      adminRow = (
        <i-hstack width="100%">
          <i-input width="90%" onChanged={(target: Control) => this.changeAdminAddress(target, idx)}></i-input>
          <i-icon name="times" fill="#f7d063" height={18} width={18} onClick={(target: Control) => this.clickRemoveAdmin(target, idx)} >      
          </i-icon>
        </i-hstack>
      )
    }
    this.vstackAdmins.append(adminRow);
    this.adminRowList.push(adminRow);
    this.adminRowCount++;
  }

  private async clickConfirm() {
    const adminAddresses = this.adminInfoList.map(v => v.address);
    const confirmationCallback = (receipt: TransactionReceipt) => {
      let profileId = getNewProfileId(receipt);
      console.log('profileId', profileId)
      this.$eventBus.dispatch("txConfirmed", {
        profileId
      });
    }
    registerSendTxEvents({
      confirmation: confirmationCallback
    })
    let receipt = await newProfile(adminAddresses);
  }

  render() {
    return (
      <i-panel height='100%' width='100%'>
        <i-vstack id="pnlMain" width='100%' horizontalAlignment='center'>
          <i-hstack width="80%" padding={{top: '1rem', bottom: '1rem'}}>
            <i-label width="50%" caption="Admins"></i-label>
            <i-vstack width="50%" id="vstackAdmins">
            </i-vstack>
          </i-hstack>
          <i-hstack width='100%' horizontalAlignment='center'>
            <i-button caption="Add" onClick={this.addAdmin}></i-button>
          </i-hstack>
          <i-vstack width='100%' maxWidth='1400px' horizontalAlignment='center'> 
            <i-hstack width='calc(100% - 3rem)' horizontalAlignment='end' gap={10}
              margin={{left: '1.5rem', right: '1.5rem', bottom: '1rem'}} padding={{left: '10', right: '10', bottom: '10', top: '10'}}>
              <i-button id='confirmBtn' caption='Confirm' width='200px' height='50' onClick={this.clickConfirm}/>
            </i-hstack>
          </i-vstack>
        </i-vstack>
        <i-vstack id="pnlErrorMsg" visible={false} horizontalAlignment="center" verticalAlignment='center' width='100%' height='100%'>
          <i-label id="lbErrorMsg" />
        </i-vstack>
      </i-panel>
    )
  }
}
