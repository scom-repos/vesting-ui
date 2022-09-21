import { customModule, Module, Styles, Control, Panel, application, IEventBus, Label, Icon, VStack, Image, Modal, Container } from '@ijstech/components';
import { isWalletConnected, getChainId, getTokenIconPath } from '@vesting/store';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import * as api from './claimDetailAPI'
import { EventId, registerSendTxEvents } from '@vesting/global';
import moment from 'moment';
import { Result } from '@vesting/main';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

const DefaultDateFormat = 'DD/MM/YYYY';
const DefaultTimeFormat = 'HH:MM'

@customModule
export class ClaimDetail extends Module {
  private firstPnlIcon: Image;
  private firstPnlVstackLabel1: Label;
  private firstPnlVVHstackLabel: Label;
  private firstPnlVVHstackIcon: Icon;
  private firstPnlLabel1: Label;
  private firstPnlLabel2: Label;
  private vestingList: VStack;
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private loadingModal: Modal;
  private pageContent: VStack;
  private openswapResult: Result;
  private claimAllBtnPanel: VStack;

  private claimsDetails: any;
  private claimList: any;
  private lockList: any;

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

  async init() {
    super.init();
    this.classList.add(styleClass);
  }

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      await this.loadApiData_claimsDetails();
      this.renderFirstPnl();
      this.renderList();
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

  private async loadApiData_claimsDetails() {
    this.claimsDetails = await api.getClaimsDetails(this.getCampaignId());
    this.claimList = this.claimsDetails.claimInfoList;
    this.lockList = this.claimsDetails.lockInfoList;
  }

  private getCampaignId() {
    const arr = window.location.hash.split('/');
    return Number(arr[2]);
  }
  
  private async onVerify(target: any, data: any) {
    const txHashCallback = (err: Error, receipt?: string) => {
      if (err) {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        target.caption = 'Verify'
        this.openswapResult.showModal();
      }
      else if (receipt) {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.openswapResult.showModal();
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.onSetupPage(isWalletConnected());
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })
    api.verifyMerkleLock(data.id, data.merkleTreeData);
    target.caption = 'Verifying'
    target.rightIcon = <i-icon name='spinner' spin={true} margin={{ left: 10 }} width='20px' height='20px' fill='white' />
  }

  private async onClaim(target: any, data: any) {
    const txHashCallback = (err: Error, receipt?: string) => {
      if (err) {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        target.caption = 'Claim'
        this.openswapResult.showModal();
      }
      else if (receipt) {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.openswapResult.showModal();
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.onSetupPage(isWalletConnected());
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })
    api.claim(data.tokenId, null, null);
    target.caption = 'Claiming'
    target.rightIcon = <i-icon name='spinner' spin={true} margin={{ left: 10 }} width='20px' height='20px' fill='white' />
  }

  private async onClaimAll(target: any) {
    const txHashCallback = (err: Error, receipt?: string) => {
      if (err) {
        this.openswapResult.message = {
          status: 'error',
          content: err,
        }
        target.caption = 'Claim All'
        this.openswapResult.showModal();
      }
      else if (receipt) {
        this.openswapResult.message = {
          status: 'success',
          txtHash: receipt
        }
        this.openswapResult.showModal();
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.onSetupPage(isWalletConnected());
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })
    target.caption = 'Claiming All'
    target.rightIcon = <i-icon name='spinner' spin={true} margin={{ left: 10 }} width='20px' height='20px' fill='white' />

    let idList: number[] = [];
    for (let i = 0; i < this.claimList.length; i++) {
      idList.push(this.claimList[i].tokenId)
    }
    await api.claimAll(idList, null, null);
  }

  private async renderFirstPnl() {

    this.firstPnlIcon.url = Assets.fullPath(getTokenIconPath(this.claimsDetails.tokenObj, getChainId()))
    this.firstPnlVstackLabel1.caption = this.claimsDetails.tokenObj.name;
    this.firstPnlVVHstackLabel.caption = this.claimsDetails.tokenObj.address;
    this.firstPnlLabel2.caption = Number(this.claimsDetails.claimable).toFixed(4) + ' ' + this.claimsDetails.tokenObj.symbol;

    // const
    this.firstPnlVVHstackIcon.name = 'copy';
    this.firstPnlLabel1.caption = 'Claimable: ';
    this.firstPnlVVHstackIcon.onClick = () => application.copyToClipboard(this.firstPnlVVHstackLabel.caption || '')

    this.claimAllBtnPanel.innerHTML = '';
    let item = <i-button id='firstPnlBtn' caption='Claim All' height='47' width='191' font={{ size: '18px' }} onClick={(target) => this.onClaimAll(target)} />
    this.claimAllBtnPanel.append(item)
  }

  private renderList() {
    this.vestingList.innerHTML = '';
    this.renderLockList();
    this.renderClaimList();
  }

  private renderClaimList() {
    for (let i = 0; i < this.claimList.length; i++) {
      if (this.claimList[i].locked != '0') {
        let item =
          <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='169px' horizontalAlignment='center' >
            <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='169px' maxWidth='1400px' width='calc(100% - 3rem)'
              margin={{ left: '1.5rem', right: '1.5rem', top: '0.5rem', bottom: '0.5rem' }}
              background={{ color: '#000000'}}
              border={{ radius: '27px', width: '2.7px', color: '#A8A8A8', style: 'solid' }}
              mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}>
              <i-vstack gap={5} padding={{ left: '10', right: '10', top: '10', bottom: '10' }} stack={{ basis: '40%', shrink: '1', grow: '1' }} verticalAlignment='center' horizontalAlignment='center' width='100%'>
                <i-vstack horizontalAlignment='start' width='min(80%, 350px)' gap={5}>
                  <i-hstack gap={5} verticalAlignment='center' horizontalAlignment='center'>
                    <i-icon name='lock' fill='white' width='30' height='34' margin={{ right: 20 }} />
                    <i-label caption={Number(this.claimList[i].locked).toFixed(4) + ' ' + this.claimsDetails.tokenObj.symbol} font={{ name: 'Montserrat', size: '25px' }} class='canBreak' />
                  </i-hstack>
                  <i-vstack verticalAlignment='center' horizontalAlignment='start' gap={5} width='100%'>
                    <i-hstack width='100%'>
                      <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '50%', shrink: '1', grow: '1' }} >
                        <i-label caption='Vesting Start: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                      </i-hstack>
                      <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '50%', shrink: '1', grow: '1' }} >
                        <i-label caption={moment(this.claimList[i].vestingStart * 1000).format(DefaultDateFormat) + ' ' + moment(this.claimList[i].vestingStart * 1000).format(DefaultTimeFormat)} font={{ name: 'Montserrat', size: '16px' }}></i-label>
                      </i-hstack>
                    </i-hstack>
                    <i-hstack width='100%'>
                      <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '50%', shrink: '1', grow: '1' }} >
                        <i-label caption='Vesting End: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                      </i-hstack>
                      <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '50%', shrink: '1', grow: '1' }} >
                        <i-label caption={moment(this.claimList[i].vestingEnd * 1000).format(DefaultDateFormat) + ' ' + moment(this.claimList[i].vestingEnd * 1000).format(DefaultTimeFormat)} font={{ name: 'Montserrat', size: '16px' }}></i-label>
                      </i-hstack>
                    </i-hstack>
                  </i-vstack>
                </i-vstack>
              </i-vstack>
              <i-hstack background={{ color: '#212128' }} minHeight='169px' gap={20} verticalAlignment='center' horizontalAlignment='center' stack={{ basis: '60%', shrink: '1', grow: '1' }}
                border={{ radius: '27px', width: 2.7, color: '#A8A8A8' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }} width='100%'>
                <i-vstack verticalAlignment='center' horizontalAlignment='center' gap={5} stack={{ basis: '60%', shrink: '1', grow: '1' }}>
                  <i-hstack width='min(80%, 350px)'>
                    <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '30%', shrink: '1', grow: '1' }} >
                      <i-label caption='Claimable: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                    </i-hstack>
                    <i-hstack horizontalAlignment='end' verticalAlignment='center' stack={{ basis: '30%', shrink: '1', grow: '1' }} >
                      <i-label caption={Number(this.claimList[i].claimable).toFixed(4) + ' ' + this.claimsDetails.tokenObj.symbol} font={{ name: 'Montserrat', size: '16px' }} class='canBreak' ></i-label>
                    </i-hstack>
                  </i-hstack>
                  <i-hstack width='min(80%, 350px)'>
                    <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '30%', shrink: '1', grow: '1' }}>
                      <i-label caption='Claimed: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                    </i-hstack>
                    <i-hstack horizontalAlignment='end' verticalAlignment='center' stack={{ basis: '30%', shrink: '1', grow: '1' }} >
                      <i-label caption={Number(this.claimList[i].claimed).toFixed(4) + ' ' + this.claimsDetails.tokenObj.symbol} font={{ name: 'Montserrat', size: '16px' }} class='canBreak' ></i-label>
                    </i-hstack>
                  </i-hstack>
                </i-vstack>
                <i-hstack verticalAlignment='center' horizontalAlignment='center' stack={{ basis: '40%', shrink: '1', grow: '1' }}>
                  <i-button caption='Claim' height={47} width={191} font={{ size: '18px' }} onClick={(target) => this.onClaim(target, this.claimList[i])} />
                </i-hstack>
              </i-hstack>
            </i-stack>
          </i-grid-layout>
        this.vestingList.append(item)
      }
    }
  }

  private renderLockList() {
    for (let i = 0; i < this.lockList.length; i++) {
      if (this.lockList[i].locked != '0') {
        let item =
          <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='169px' horizontalAlignment='center' >
            <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='169px' maxWidth='1400px' width='calc(100% - 3rem)' gap={5}
              margin={{ left: '1.5rem', right: '1.5rem', top: '0.5rem', bottom: '0.5rem' }}
              background={{ color: '#000000' }}
              border={{ radius: '27px', width: '2.7px', color: '#A8A8A8', style: 'solid' }}
              mediaQueries={[{ maxWidth: '1000px', properties: { direction: 'vertical' } }]}
              padding={{left: '0.5rem', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}>
              <i-hstack gap={5} verticalAlignment='center' horizontalAlignment='center' stack={{ basis: '40%', shrink: '1', grow: '1' }}>
                <i-icon name='lock' fill='white' width='30' height='34' margin={{ right: 20 }} />
                <i-label caption={Number(this.lockList[i].locked).toFixed(4) + ' ' + this.claimsDetails.tokenObj.symbol} font={{ name: 'Montserrat', size: '25px' }} />
              </i-hstack>
              <i-vstack verticalAlignment='center' horizontalAlignment='center' stack={{ basis: '36%', shrink: '1', grow: '1' }} minWidth='250px'>
                <i-hstack width='min(80%, 350px)'>
                  <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '45%', shrink: '1', grow: '1' }} >
                    <i-label caption='Vesting Start: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                  </i-hstack>
                  <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '55%', shrink: '1', grow: '1' }} >
                    <i-label caption={moment(this.lockList[i].vestingStart * 1000).format(DefaultDateFormat) + ' ' + moment(this.lockList[i].vestingStart * 1000).format(DefaultTimeFormat)} font={{ name: 'Montserrat', size: '16px' }}></i-label>
                  </i-hstack>
                </i-hstack>
                <i-hstack width='min(80%, 350px)'>
                  <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '45%', shrink: '1', grow: '1' }} >
                    <i-label caption='Vesting End: ' font={{ name: 'Montserrat', size: '16px' }}></i-label>
                  </i-hstack>
                  <i-hstack horizontalAlignment='start' verticalAlignment='center' stack={{ basis: '55%', shrink: '1', grow: '1' }} >
                    <i-label caption={moment(this.lockList[i].vestingEnd * 1000).format(DefaultDateFormat) + ' ' + moment(this.lockList[i].vestingEnd * 1000).format(DefaultTimeFormat)} font={{ name: 'Montserrat', size: '16px' }}></i-label>
                  </i-hstack>
                </i-hstack>
              </i-vstack>
              <i-hstack verticalAlignment='center' horizontalAlignment='center' stack={{ basis: '24%', shrink: '1', grow: '1' }}>
                <i-button caption='Verify' height={47} width={191} font={{ size: '18px' }} background={{ color: '#d95a41' }} onClick={(target) => this.onVerify(target, this.lockList[i])} />
              </i-hstack>
            </i-stack>
          </i-grid-layout>
        this.vestingList.append(item)
      }
    }
  }

  render() {
    return (
      <i-panel id='MainPnl' width='100%' height='100%'>
        <i-vstack id='pageContent'>
          <i-grid-layout templateColumns={['auto']} templateRows={['auto']} minHeight='228px' horizontalAlignment='center'>
            <i-stack grid={{ row: 1, column: 1 }} direction='horizontal' alignItems='center' minHeight='228px' maxWidth='1400px' width='calc(100% - 3rem)'
              margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }} padding={{ left: '10', right: '10', top: '10', bottom: '10' }}
              background={{ color: '#000000' }} border={{ radius: '27px', width: '2.7px', color: '#A8A8A8', style: 'solid' }}
              mediaQueries={
                [
                  {
                    maxWidth: '1000px',
                    properties: {
                      direction: 'vertical'
                    }
                  }
                ]
              }>
              <i-hstack stack={{ basis: '52%', shrink: '1', grow: '1' }} id='firstPnlVstack' resizer={true} horizontalAlignment='center' padding={{ left: '10', right: '10', top: '10', bottom: '10' }} gap={10} verticalAlignment='center'>
                <i-image id='firstPnlIcon' height='100' width='100' />
                <i-vstack gap={5}>
                  <i-label id='firstPnlVstackLabel1' font={{ size: '31.25px' }} />
                  <i-hstack gap={5} verticalAlignment='center'>
                    <i-label id='firstPnlVVHstackLabel' class='canBreak' font={{ name: 'Montserrat', size: '12.8px' }} />
                    <i-icon id='firstPnlVVHstackIcon' class='firstPnlVVHstackIcon' height='17' width='17' fill='white' tooltip={{ content: `The address has been copied`, trigger: 'click' }} />
                  </i-hstack>
                </i-vstack>
              </i-hstack>
              <i-hstack stack={{ basis: '25%', shrink: '1', grow: '1' }} horizontalAlignment='center' verticalAlignment='center' padding={{ left: '10', right: '10', top: '10', bottom: '10' }} minWidth='250px'>
                <i-label id='firstPnlLabel1' stack={{ basis: '40%', shrink: '1', grow: '1' }} font={{ name: 'Montserrat', size: '16px' }} />
                <i-label id='firstPnlLabel2' stack={{ basis: '60%', shrink: '1', grow: '1' }} font={{ name: 'Montserrat', size: '16px' }} class='canBreak' />
              </i-hstack>
              <i-hstack id='claimAllBtnPanel' stack={{ basis: '23%', shrink: '1', grow: '1' }} horizontalAlignment='center' padding={{ left: '10', right: '10', top: '10', bottom: '10' }} />
            </i-stack>
          </i-grid-layout>
          <i-vstack id='vestingList' gap={2} margin={{ bottom: 10 }} />
        </i-vstack>
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
