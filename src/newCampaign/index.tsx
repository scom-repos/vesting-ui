import { customModule, Module, Styles, Control, Label, Button, Upload, Input, IEventBus, Panel, application, Modal, VStack, Container } from '@ijstech/components';
import { isWalletConnected, getChainId } from '@vesting/store';
import { TokenSelection } from '@vesting/common';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import { ITokenObject, EventId, registerSendTxEvents } from '@vesting/global'
import * as api from './newCampaignAPI'
import { Result } from '@vesting/main';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

interface newCampaignParams {
  name: string,
  imgUrl: string,
  token: string
}

@customModule
export class newCampaign extends Module {

  private back: Button;
  private confirm: Button;
  private campaignNameLabel: Label;
  private campaignNameInput: Input;
  private campaignIconLabel: Label;
  private campaignIconInput: Upload;
  private TokenLabel: Label;
  private selectedToken: ITokenObject;
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private loadingModal: Modal;
  private pageContent: VStack;

  private tokenSelect: TokenSelection;
  private uploadedImgUrl: string;
  private openswapResult: Result;
  private confirm_spin: Button;

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

  async init() {
    super.init();
    this.classList.add(styleClass);
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

  private onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      this.renderPage();
      this.renderButtons();
      this.initTokenSelection();
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

  private initTokenSelection() {
    this.tokenSelect.onSelectToken = (token: ITokenObject) => this.onSelectToken(token, false);
    this.tokenSelect.isBtnMaxShown = false;
    this.tokenSelect.isCommonShown = true;
  }

  async onSelectToken(token: ITokenObject, isFrom: boolean) {
    this.selectedToken = token;
  }

  private backToMyCampaign() {
    window.location.href = '#/locks';
  }

  private renderButtons() {
    this.back.caption = 'BACK';
    this.confirm.caption = 'Confirm';
  }

  private renderPage() {
    this.campaignNameLabel.caption = 'New campaign name: ';
    this.campaignIconLabel.caption = 'New campaign Icon: ';
    this.campaignIconInput.caption = 'Drag the picture to here';
    this.TokenLabel.caption = 'Token: ';
    this.confirm_spin.caption = 'Confirming'
    this.confirm_spin.rightIcon = <i-icon name='spinner' spin={true} margin={{ left: 10 }} width='20px' height='20px' fill='white' />
    this.confirm.visible = true;
    this.confirm_spin.visible = false;
  }

  private async confirmAddNewCampaign() {
    const txHashCallback = (err: Error, receipt?: string) => {
      if (err) {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        this.openswapResult.showModal();
        this.onSetupPage(isWalletConnected());
      }
      else if (receipt) {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.openswapResult.showModal();
        this.onSetupPage(isWalletConnected());
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.onSetupPage(isWalletConnected());
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })

    // old code
    let item: newCampaignParams = {
      name: this.campaignNameInput.value,
      imgUrl: this.uploadedImgUrl,
      token: this.selectedToken.address!
    }
    this.confirm.visible = false;
    this.confirm_spin.visible = true;
    await api.newCampaign(item.name, item.imgUrl, item.token);
    await this.onSetupPage(isWalletConnected());
  }

  private async onChangeFile(source: Control, files: File[]) {
    if (!files.length) return;
    const data: any = await this.campaignIconInput.toBase64(files[0]);
    this.uploadedImgUrl = data || '';
  }

  render() {
    return (
      <i-panel id='MainPnl' width='100%' height='100%'>
        <i-vstack id='pageContent' horizontalAlignment='center'>
          <i-vstack horizontalAlignment='start' width='calc(100% - 3rem)' maxWidth='1400px' gap={5}
            margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
            padding={{ left: '10', right: '10', top: '10', bottom: '10' }}>
            <i-hstack horizontalAlignment='start' minHeight={150}>
              <i-label id='pageTitle' font={{ size: '40px', bold: true }} />
            </i-hstack>
            <i-hstack width='100%'>
              <i-hstack stack={{ basis: '30%' }}>
                <i-label id='campaignNameLabel' />
              </i-hstack>
              <i-hstack stack={{ basis: '70%' }}>
                <i-input id='campaignNameInput' captionWidth='0px' width='100%' />
              </i-hstack>
            </i-hstack>
            <i-hstack width='100%' verticalAlignment='center'>
              <i-hstack stack={{ basis: '30%' }}>
                <i-label id='campaignIconLabel' />
              </i-hstack>
              <i-hstack stack={{ basis: '70%' }}>
                <i-upload id='campaignIconInput' draggable={true} multiple={false} onChanged={this.onChangeFile.bind(this)} />
              </i-hstack>
            </i-hstack>
            <i-hstack width='100%' verticalAlignment='center'>
              <i-hstack stack={{ basis: '30%' }}>
                <i-label id='TokenLabel' />
              </i-hstack>
              <i-hstack stack={{ basis: '70%' }}>
                <token-selection id="tokenSelect" background={{color: '#929292'}}></token-selection>
              </i-hstack>
            </i-hstack>
          </i-vstack>
          <i-hstack horizontalAlignment='end' gap={5} width='calc(100% - 3rem)' maxWidth='1400px'
            margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
            padding={{ left: '10', right: '10', top: '10', bottom: '10' }}>
            <i-button id='back' width='200px' height='55px' background={{color: '#929292'}} onClick={this.backToMyCampaign}></i-button>
            <i-button id='confirm' width='200px' height='55px' background={{color: '#929292'}} onClick={(target) => this.confirmAddNewCampaign(target)}></i-button>
            <i-button id='confirm_spin' width='200px' height='55px' background={{color: '#929292'}} visible={false}></i-button>
          </i-hstack>
          <portal-result
            id='openswapResult' maxWidth='500px'>
          </portal-result>
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
