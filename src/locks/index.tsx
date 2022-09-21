import { customModule, Module, Styles, Control, Label, Panel, Input, Button, ComboBox, CardLayout, VStack, IEventBus, application, Modal, Container } from '@ijstech/components';
import { isWalletConnected, getChainId } from '@vesting/store';
import { EventId, ITokenObject } from '@vesting/global';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import * as api from './locksAPI'
import * as api_common from '@vesting/common'
import { ICampaignExtInfo } from './locksAPI';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

@customModule
export class locks extends Module {

  private searchBox: Input;
  private comboBox: ComboBox;
  private comboBoxLabel: Label;
  private newCampaign: Button;
  private cardList: CardLayout;
  private statusPanel: Panel;
  private statusLabel: Label;
  private copiedCardList: any;
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private loadingModal: Modal;
  private pageContent: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvents();
  }

  async onLoad() {
    this.pageContent.visible = false;
    this.loadingModal.visible = true
    let myCampaigns: ICampaignExtInfo[] = await api.getMyCampaigns();
    await this.setCopiedCardListValueByAPI(myCampaigns);
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

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      this.setListAllVisible();
      this.renderFirstPanel();
      this.renderCardList(this.copiedCardList);
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

  private async setCopiedCardListValueByAPI(myCampaignList: ICampaignExtInfo[]) {
    this.copiedCardList = [];
    for (let i = 0; i < myCampaignList.length; i++) {
      if (myCampaignList[i].dataUri) {  // hard code
        let data = await api_common.fetchFileJsonContentByCID2(myCampaignList[i].dataUri) // Some campaigns' data cannot be fetched
        let item = {
          id: myCampaignList[i].id,
          icon: data.imgUrl,
          CampanyName: data.name,
          Locked: myCampaignList[i].locked,
          Claimed: myCampaignList[i].claimed,
          tokenSymbol: myCampaignList[i].tokenObj.symbol
        }
        this.copiedCardList.push(item)
      }
    }
  }

  private setListAllVisible() {
    if (!this.copiedCardList) { return; }
    for (let i = 0; i < this.copiedCardList.length; i++) {
      this.copiedCardList[i].visible = true;
    }
  }

  private renderFirstPanel() {
    this.searchBox.placeholder = 'Search campaign by campaign name/token/token address';
    this.comboBoxLabel.caption = 'Sort By: '
    this.comboBox.items = [
      {
        value: 'Locked',
        label: 'Value Locked'
      },
      {
        value: 'Claimed',
        label: 'Value Claimed'
      },
    ];
    this.comboBox.icon = <i-icon name='search'></i-icon>
    this.newCampaign.caption = 'New Campaign'
  }

  private enterMyCampaignDetail(id: number) {
    window.location.href = `#/locks/${id}`;
  }

  private addNewCampaign() {
    window.location.href = '#/newCampaign'
  }

  private renderCardStatus(cardObj: any) {
    if (cardObj.status == 'LIVE') {
      this.statusLabel.caption = 'LIVE';
      this.statusPanel.background.color = '#3D8C58';
    } else if (cardObj.status == 'CLOSED') {
      this.statusLabel.caption = 'CLOSED';
      this.statusPanel.background.color = '#A8A8A8';
    }
  }

  private onComboBoxChanged() { //sorting
    let sortedCardList;
    switch (((this.comboBox.value) as any).value) {
      case 'Locked':
        sortedCardList = this.copiedCardList.sort((a: any, b: any) => (a.Locked < b.Locked) ? 1 : (a.Locked > b.Locked) ? -1 : 0); break;
      case 'Claimed':
        sortedCardList = this.copiedCardList.sort((a: any, b: any) => (a.Claimed < b.Claimed) ? 1 : (a.Claimed > b.Claimed) ? -1 : 0); break;
    }
    this.copiedCardList = sortedCardList
    this.renderCardList(this.copiedCardList);
  }

  private onSearchBoxChanged() {  //searching, set visible to true if match, false otherwise
    this.setListAllVisible();
    if (this.searchBox.value != null) {
      let pattern = this.searchBox.value as string
      let regex = new RegExp(pattern, 'i')
      for (let i = 0; i < this.copiedCardList.length; i++) {
        if (regex.test(this.copiedCardList[i].CampanyName) == false
          && regex.test(this.copiedCardList[i].tokenSymbol) == false) {
          this.copiedCardList[i].visible = false;
        }
      }
    }
    this.renderCardList(this.copiedCardList);
  }

  private renderCardList(cardListData: any) {
    this.cardList.innerHTML = '';
    if (!cardListData) { return; }
    for (let i = 0; i < cardListData.length; i++) {
      if (cardListData[i].visible == true) {
        let item =
          <i-panel width='280px'>
            <i-vstack width='100%' height='100%' border={{ width: '2.7px', color: '#A8A8A8', style: 'solid', radius: '30px' }} onClick={() => this.enterMyCampaignDetail(cardListData[i].id)}>
              <i-hstack id='statusPanel' width='66px' height='30px' border={{ radius: '9.33px' }} position='absolute' verticalAlignment='center' horizontalAlignment='center'
                margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                <i-label id='statusLabel' />
              </i-hstack>
              <i-vstack stack={{ basis: '65%' }} background={{color: '#000000'}} verticalAlignment='center' horizontalAlignment='center'
                border={{ radius: "30px 30px 0 0" }}>
                <i-image url={cardListData[i].icon} height='100px' margin={{ bottom: 20 }}></i-image>
                <i-label caption={cardListData[i].CampanyName} font={{ name: 'Montserrat', size: '20px' }}></i-label>
              </i-vstack>
              <i-vstack stack={{ basis: '35%' }} background={{color: '#212128'}} verticalAlignment='center' horizontalAlignment='center'
                padding={{ top: 10, bottom: 10, left: 20, right: 20 }} border={{ radius: "0 0 30px 30px" }}>
                <i-hstack width='100%' maxWidth='250px'>
                  <i-hstack stack={{ basis: '40%' }} horizontalAlignment='start' verticalAlignment='center'>
                    <i-label caption={"Locked: "} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                  <i-hstack stack={{ basis: '60%' }} horizontalAlignment='end' verticalAlignment='center'>
                    <i-label caption={Number(cardListData[i].Locked).toFixed(4) + ' ' + cardListData[i].tokenSymbol} font={{ name: 'Montserrat', size: '13px' }} class='canBreak'></i-label>
                  </i-hstack>
                </i-hstack>
                <i-hstack width='100%' maxWidth='250px'>
                  <i-hstack stack={{ basis: '40%' }} horizontalAlignment='start' verticalAlignment='center'>
                    <i-label caption={"Claimed: "} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                  <i-hstack stack={{ basis: '60%' }} horizontalAlignment='end' verticalAlignment='center'>
                    <i-label caption={Number(cardListData[i].Claimed).toFixed(4) + ' ' + cardListData[i].tokenSymbol} font={{ name: 'Montserrat', size: '13px' }} class='canBreak'></i-label>
                  </i-hstack>
                </i-hstack>
              </i-vstack>
            </i-vstack>
          </i-panel>
        this.renderCardStatus(cardListData[i]);
        this.cardList.append(item)
      }
    }
  }

  render() {
    return (
      <i-panel id='MainPnl' height='100%' width='100%'>
        <i-vstack id='pageContent' horizontalAlignment='center'>
          <i-grid-layout
            templateColumns={['50%', '10%', '20%', '20%']}
            templateRows={['150px', 'auto']}
            templateAreas={
              [
                ["searchBoxArea", "LabelArea", "ComboBoxArea", "BtnArea"],
                ["CardArea", "CardArea", "CardArea", "CardArea"]
              ]
            }
            mediaQueries={
              [
                {
                  maxWidth: '925px',
                  properties: {
                    templateColumns: ['15%', '45%', '40%'],
                    templateRows: ['auto', 'auto', 'auto'],
                    templateAreas: [
                      ["searchBoxArea", "searchBoxArea", "searchBoxArea"],
                      ["LabelArea", "ComboBoxArea", "BtnArea"],
                      ["CardArea", "CardArea", "CardArea"]
                    ]
                  }
                },
                {
                  maxWidth: '500px',
                  properties: {
                    templateColumns: ['30%', '70%'],
                    templateRows: ['auto', 'auto', 'auto', 'auto'],
                    templateAreas: [
                      ["searchBoxArea", "searchBoxArea"],
                      ["LabelArea", "ComboBoxArea"],
                      ["BtnArea", "BtnArea"],
                      ["CardArea", "CardArea"]
                    ]
                  }
                },
              ]
            }
            horizontalAlignment='center'
            width='calc(100% - 3rem)' maxWidth='1400px'
            margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
            padding={{ left: '10', right: '10', top: '10', bottom: '10' }} gap={{ row: 5, column: 5 }}>
            <i-hstack grid={{ area: 'searchBoxArea' }} resizer={true} width='100%' verticalAlignment='center' horizontalAlignment='center'>
              <i-input id='searchBox' height='39px' width='100%' maxWidth='619px' onChanged={this.onSearchBoxChanged} />
            </i-hstack>
            <i-hstack grid={{ area: 'LabelArea' }} resizer={true} width='100%' verticalAlignment='center' horizontalAlignment='end' gap={5}>
              <i-label id='comboBoxLabel' font={{ color: 'white' }}></i-label>
            </i-hstack>
            <i-hstack grid={{ area: 'ComboBoxArea' }} resizer={true} verticalAlignment='center' horizontalAlignment='center' gap={5}>
              <i-combo-box id='comboBox' class="custom-combobox" height='39px' onChanged={this.onComboBoxChanged}></i-combo-box>
            </i-hstack>
            <i-hstack grid={{ area: 'BtnArea' }} resizer={true} width='100%' verticalAlignment='center' horizontalAlignment='center' gap={5}>
              <i-button id='newCampaign' width='160px' height='39px' background={{color: '#34343A'}} onClick={this.addNewCampaign}></i-button>
            </i-hstack>
            <i-card-layout id='cardList' grid={{ area: 'CardArea' }} maxWidth='1300px' cardMinWidth='250px' cardHeight='382px' width='100%'
              gap={{ column: '2rem', row: '2rem' }} margin={{ top: 30 }} horizontalAlignment='center'>
            </i-card-layout>
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
