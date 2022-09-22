import { customModule, application, Module, Styles, Control, Input, Image, VStack, IEventBus, Container, Label, Button, HStack, Modal, GridLayout, Icon, Panel } from '@ijstech/components';
import { 
  isWalletConnected, 
  getChainId, 
  setDataFromSCConfig, 
  getVaultFactoryAddress, 
  getNetworkExplorerName,
  viewOnExplorerByTxHash,
} from '@vesting/store';
import Assets from '@vesting/assets';
import { EventId, parseContractError, registerSendTxEvents } from '@vesting/global';
import { TransactionReceipt, Wallet } from "@ijstech/eth-wallet";
import { getNewProfileId, newProfile } from './API';
import styleClass from './index.css';

const Theme = Styles.Theme.ThemeVars;
const TextAlignCenter = Styles.style({
  textAlign: 'center'
});

interface IMessage {
  status: 'warning' | 'success' | 'error';
  content?: string;
  txtHash?: string;
  obj?: any;
}

@customModule
export class Config extends Module {
  private $eventBus: IEventBus;
  private pnlErrorMsg: VStack;
  private lbErrorMsg: Label;
  private pnlMain: VStack;
  private resultModal: Modal;
  private pnlResultModalMain: Panel;
  private btnConfirm: Button;
  
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
    this.classList.add(styleClass);
    super.init();
    this.onSetupPage(isWalletConnected());
  }

  async buildLink(txHash: string) {
    if (txHash) {
      const chainId = await Wallet.getInstance().chainId;
      viewOnExplorerByTxHash(chainId, txHash);
    }
  }

  closeResultModal() {
    this.resultModal.visible = false;
  }

  async extractErrorMsg(message: IMessage) {
    if (message.status !== 'error') return message.content;
    if (message.content && message.content.includes('Internal JSON-RPC error.')) {
      message.content = JSON.parse(message.content.replace('Internal JSON-RPC error.\n', '')).message;
    }
    
    let errorMsg = await parseContractError(message.content??'', message.obj);
    return errorMsg;
  }

  private openTxRejectedModal(message: IMessage) {
    this.resultModal.onOpen = async (target: Control) => {
      this.pnlResultModalMain.clearInnerHTML();
      const mainSection = await VStack.create({
        horizontalAlignment: 'center'
      });
      const icon = await Icon.create({
        name: 'exclamation-triangle',
        height: 50,
        fill: Theme.colors.primary.main,
        margin: { bottom: '1.875rem' },
      }, mainSection)
      icon.classList.add("inline-block");
      mainSection.appendChild(icon);

      const label = await Label.create({
        caption: 'Transaction Rejected.',
        margin: { bottom: '1.875rem' },
        font: { size: '1.125rem', color: Theme.colors.warning.light }
      }, mainSection);
      mainSection.appendChild(label);

      const errMsgBlock = await VStack.create({
        margin: { top: '1rem' }
      }, mainSection);
      errMsgBlock.id = "errMsgBlock";
      const caption = await this.extractErrorMsg(message);
      const contentLabel = await Label.create({
        caption: caption,
        margin: { bottom: '1rem' },
      }, errMsgBlock);
      errMsgBlock.appendChild(contentLabel);
      mainSection.appendChild(errMsgBlock);

      const button = await Button.create({
        width: '100%',
        caption: 'Cancel',
        margin: { top: '1rem' },
        padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '2rem' },
        background: { color: Theme.colors.primary.main},
      }, mainSection);
      button.onClick = () => this.closeResultModal();
      mainSection.appendChild(button);   
      this.pnlResultModalMain.appendChild(mainSection);
    }
    this.resultModal.visible = true;
  }

  private async addTxHashContentBlock(parent: Container, txHash: string) {
    const chainId = await Wallet.getInstance().chainId;
    const explorerName = getNetworkExplorerName(chainId);
    const section = await VStack.create({}, parent);

    const label1 = await Label.create({
      caption: txHash.substring(0, 33),
      margin: { bottom: '1rem' }
    }, section);
    section.appendChild(label1);

    const label2 = await Label.create({
      caption: txHash.substring(33, txHash.length),
      margin: { bottom: '1rem' }
    }, section);
    section.appendChild(label2);

    const link = await Label.create({
      caption: `View on ${explorerName}`,
      margin: { top: '1rem' },
      font: { color: '#FD4A4C'},
      display: 'inline-block'
    }, section);
    link.onClick = this.buildLink.bind(this, txHash);
    link.classList.add("red-link", "block");
    section.appendChild(link);
    parent.appendChild(section);
  }

  private async openTxSubmittedModal(txHash: string) {
    this.resultModal.onOpen = async (target: Control) => {
      this.pnlResultModalMain.clearInnerHTML();
      const mainSection = await VStack.create({
        horizontalAlignment: 'center'
      });
      mainSection.id = "warningSection";
      const loading = (
        <i-panel height={100}>
          <i-vstack id="loadingElm" class="i-loading-overlay" height="100%" background={{ color: 'transparent' }} >
            <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
              <i-icon 
                class="i-loading-spinner_icon"
                image={{ url: Assets.fullPath('img/loading.svg'), width: 24, height: 24 }}
              ></i-icon>
              <i-label font={{ color: '#FD4A4C' }} class="i-loading-spinner_text"></i-label>
            </i-vstack>
          </i-vstack>
        </i-panel>
      )
      mainSection.appendChild(loading);
      const section = await Panel.create({
        margin: { bottom: 20 }
      }, mainSection);

      const label = await Label.create({
        caption: 'Transaction submitted and your profile is being created',
        display: 'block',
        margin: { bottom: '1rem' },
        font: { size: '1.125rem', color: Theme.colors.warning.light }
      });
      section.appendChild(label);

      if (txHash) {
        await this.addTxHashContentBlock(section, txHash);
      }

      mainSection.appendChild(section);      
      this.pnlResultModalMain.appendChild(mainSection);
    }
    this.resultModal.visible = true;
  }

  private async openTxConfirmedModal(profileId: number, txHash: string) {
    const title = `New Profile ID ${profileId} Created`;
    this.resultModal.onOpen = async (target: Control) => {
      this.pnlResultModalMain.clearInnerHTML();
      const mainSection = await VStack.create({
        horizontalAlignment: 'center'
      });
      const icon = await Icon.create({
        name: 'check-circle',
        height: 50,
        fill: Theme.colors.primary.main,
        margin: { bottom: '1.875rem' },
      }, mainSection)
      icon.classList.add("inline-block");
      mainSection.appendChild(icon);

      const label = await Label.create({
        caption: title,
        margin: { bottom: '1.875rem' },
        font: { size: '1.125rem', color: Theme.colors.warning.light }
      }, mainSection);
      mainSection.appendChild(label);

      const contentSection = await VStack.create({}, mainSection);
      contentSection.id = "contentSection";
      mainSection.appendChild(contentSection);

      const contentLabel = await Label.create({
        caption: '',
      });
      contentSection.appendChild(contentLabel);

      if (txHash) {
        await this.addTxHashContentBlock(contentSection, txHash);
      }

      const button = await Button.create({
        width: '100%',
        caption: 'Close',
        margin: { top: '1rem' },
        padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '2rem' },
        background: { color: Theme.colors.primary.main },
      }, mainSection);
      button.onClick = () => this.closeResultModal();
      mainSection.appendChild(button);

      this.pnlResultModalMain.appendChild(mainSection)
    }
    this.resultModal.visible = true;
  }

  private async onSetupPage(isWalletConnected: boolean) {
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

  private async clickConfirm() {
    const txHashCallback = (err: Error, receipt?: string) => {
      if (err) {
        this.openTxRejectedModal({
          status: 'error',
          content: err.message,
        })
      }
      else if (receipt) {
        this.btnConfirm.rightIcon.visible = true;
        this.btnConfirm.caption = 'Confirming';
        this.openTxSubmittedModal(receipt);
      }
    }
    const confirmationCallback = (receipt: TransactionReceipt) => {
      this.btnConfirm.rightIcon.visible = false;
      this.btnConfirm.caption = 'Confirm';
      let profileId = getNewProfileId(receipt);
      if (profileId != null) {
        console.log('profileId', profileId)
        this.$eventBus.dispatch("txConfirmed", {
          profileId
        });
        this.openTxConfirmedModal(profileId, receipt.transactionHash);
      }
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })
    let receipt = await newProfile();
  }

  render() {
    return (
      <i-panel height='100%' width='100%'>
        <i-vstack id="pnlMain" margin={{left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem'}} gap="1rem">
          <i-hstack id="stackFirstStep" padding={{left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem'}} border={{ radius: 30 }} horizontalAlignment="space-between" background={{ color: '#000000' }}>
            <i-hstack verticalAlignment="center" gap={15}>
              <i-label caption="STEP 1" font={{ size: '20px', name: 'Montserrat SemiBold', color: Theme.colors.primary.main }} />
              <i-label caption="Click Confirm to Create a Profile" font={{ size: '20px', name: 'Montserrat SemiBold' }} />
            </i-hstack>
            <i-button
              id="btnConfirm" caption='Confirm' width='200px' height='50' onClick={this.clickConfirm}
              rightIcon={{spin: true, visible: false}}
              background={{ color: Theme.background.main }} border={{ radius: 12, width: 2, style: 'solid', color: '#FFB82F' }}
            />
          </i-hstack>          
        </i-vstack>
        <i-vstack id="pnlErrorMsg" visible={false} horizontalAlignment="center" verticalAlignment='center' width='100%' height='100%'>
          <i-label id="lbErrorMsg" />
        </i-vstack>
        <i-modal
          id='resultModal'
          class={TextAlignCenter}
          maxWidth='500px'
          closeIcon={{ name: 'times' }}
        >
          <i-panel id="pnlResultModalMain" class="i-modal_content"></i-panel>
        </i-modal>               
      </i-panel>
    )
  }
}
