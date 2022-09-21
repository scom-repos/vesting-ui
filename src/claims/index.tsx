import { customModule, Module, Styles, Control, Label, Input, ComboBox, CardLayout, IEventBus, Panel, application, Modal, VStack, Container } from '@ijstech/components';
import { isWalletConnected, getChainId, getTokenIconPath } from '@vesting/store';
import Assets from '@vesting/assets';
import styleClass from './index.css';
import * as api from './claimsAPI';
import { EventId } from '@vesting/global';
import { ICampaignExtInfo } from './claimsAPI';
import { BigNumber } from '@ijstech/eth-wallet';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);

Styles.fontFace({
  fontFamily: "montserrat",
  src: `url("${Assets.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

interface CardListData {
  id: number;
  icon: string;
  CampanyName: string;
  Locked: string;
  Claimable: string;
  Claimed: string;
  CampanyShortName: string;
  visible: boolean
}

@customModule
export class Claims extends Module {

  private searchBox: Input;
  private comboBox: ComboBox;
  private comboBoxLabel: Label;
  private cardList: CardLayout;
  private copiedCardList: CardListData[];
  private $eventBus: IEventBus;
  private MainPnl: Panel;
  private loadingModal: Modal;
  private pageContent: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvents();
  }

  onChainChange = () => {
    this.onSetupPage(true);
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

  onWalletConnect = async (connected: boolean) => {
    let chainId = getChainId();
    if (connected && !chainId) {
      this.onChainChange();
    } else {
      this.onSetupPage(connected);
    }
  }

  async onLoad() {
    this.pageContent.visible = false;
    this.loadingModal.visible = true
    await this.onSetupPage(isWalletConnected());
    this.pageContent.visible = true;
    this.loadingModal.visible = false
  }

  private async onSetupPage(isWalletConnected: boolean) {
    if (isWalletConnected) {
      let myCampaigns = await api.getMyCampaigns()
      this.setCopiedCardListValueByAPI(myCampaigns);
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

  private setCopiedCardListValueByAPI(myCampaignList: ICampaignExtInfo[]) {
    this.copiedCardList = [];
    for (let i = 0; i < myCampaignList.length; i++) {
      let item: CardListData = {
        id: myCampaignList[i].id,
        icon: myCampaignList[i].campaignImgUrl,
        CampanyName: myCampaignList[i].campaignName,
        Locked: myCampaignList[i].locked,
        Claimable: myCampaignList[i].claimable,
        Claimed: myCampaignList[i].claimed,
        CampanyShortName: myCampaignList[i].tokenObj.symbol,
        visible: true
      }
      this.copiedCardList.push(item)
    }
  }

  private setListAllVisible() {
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
        value: 'Claimable',
        label: 'Value Claimable'
      },
      {
        value: 'Claimed',
        label: 'Value Claimed'
      },
    ];
    this.comboBox.icon = <i-icon name='search'></i-icon>
  }

  private enterMyClaimDetail(id: number) {
    window.location.href = `#/claims/${id}`;
  }

  private onComboBoxChanged() { //sorting
    let sortedCardList: CardListData[] = [];
    const sortByDescending = (a: string, b: string) => {
      return new BigNumber(a).lt(b) ? 1 : new BigNumber(a).gt(b) ? -1 : 0;
    }
    switch (((this.comboBox.value) as any).value) {
      case 'Locked':
        sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Locked, b.Locked)); break;
      case 'Claimable':
        sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Claimable, b.Claimable)); break;
      case 'Claimed':
        sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Claimed, b.Claimed)); break;
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
          && regex.test(this.copiedCardList[i].CampanyShortName) == false) {
          this.copiedCardList[i].visible = false;
        }
      }
    }
    this.renderCardList(this.copiedCardList);
  }

  private renderCardList(cardListData: CardListData[]) {
    this.cardList.innerHTML = '';
    for (let i = 0; i < cardListData.length; i++) {
      if (cardListData[i].visible == true) {
        let item =
          <i-panel width='280px'>
            <i-vstack width='100%' height='100%' border={{ width: '2.7px', color: '#A8A8A8', style: 'solid', radius: '30px' }} onClick={() => this.enterMyClaimDetail(cardListData[i].id)}>
              <i-vstack stack={{ basis: '65%' }} background={{ color: '#000000' }} verticalAlignment='center' horizontalAlignment='center'
                border={{ radius: "30px 30px 0 0" }}>
                <i-image url={cardListData[i].icon} height='100px' margin={{ bottom: 20 }} />
                <i-label caption={cardListData[i].CampanyName} font={{ name: 'Montserrat', size: '20px' }}></i-label>
              </i-vstack>
              <i-vstack stack={{ basis: '35%' }} background={{ color: '#212128' }} verticalAlignment='center' horizontalAlignment='center'
                padding={{ top: 10, bottom: 10, left: 20, right: 20 }} border={{ radius: "0 0 30px 30px" }}>
                <i-hstack width='100%' maxWidth='250px'>
                  <i-hstack stack={{ basis: '40%' }} horizontalAlignment='start' verticalAlignment='center'>
                    <i-label caption={"Locked: "} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                  <i-hstack stack={{ basis: '60%' }} horizontalAlignment='end' verticalAlignment='center'>
                    <i-label caption={Number(cardListData[i].Locked).toFixed(4) + ' ' + cardListData[i].CampanyShortName} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                </i-hstack>
                <i-hstack width='100%' maxWidth='250px'>
                  <i-hstack stack={{ basis: '40%' }} horizontalAlignment='start' verticalAlignment='center'>
                    <i-label caption={"Claimable: "} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                  <i-hstack stack={{ basis: '60%' }} horizontalAlignment='end' verticalAlignment='center'>
                    <i-label caption={Number(cardListData[i].Claimable).toFixed(4) + ' ' + cardListData[i].CampanyShortName} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                </i-hstack>
                <i-hstack width='100%' maxWidth='250px'>
                  <i-hstack stack={{ basis: '40%' }} horizontalAlignment='start' verticalAlignment='center'>
                    <i-label caption={"Claimed: "} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                  <i-hstack stack={{ basis: '60%' }} horizontalAlignment='end' verticalAlignment='center'>
                    <i-label caption={Number(cardListData[i].Claimed).toFixed(4) + ' ' + cardListData[i].CampanyShortName} font={{ name: 'Montserrat', size: '13px' }}></i-label>
                  </i-hstack>
                </i-hstack>
              </i-vstack>
            </i-vstack>
          </i-panel>
        this.cardList.append(item)
      }
    }
  }

  render() {
    return (
      <i-panel id='MainPnl' width='100%' height='100%'>
        <i-vstack id='pageContent' horizontalAlignment='center'>
          <i-grid-layout
            templateColumns={['60%', '40%']}
            templateRows={['150px', 'auto']}
            templateAreas={
              [
                ["searchBoxArea", "ComboBoxArea"],
                ["CardArea", "CardArea"]
              ]
            }
            mediaQueries={
              [
                {
                  maxWidth: '742px',
                  properties: {
                    templateColumns: ['100%'],
                    templateRows: ['auto', 'auto', 'auto'],
                    templateAreas: [
                      ["searchBoxArea"],
                      ["ComboBoxArea"],
                      ["CardArea"]
                    ]
                  }
                }
              ]
            }
            horizontalAlignment='center'
            width='calc(100% - 3rem)' maxWidth='1400px'
            margin={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
            padding={{ left: '10', right: '10', top: '10', bottom: '10' }} gap={{ row: 5, column: 5 }}>
            <i-hstack grid={{ area: 'searchBoxArea' }} resizer={true} width='100%' verticalAlignment='center' horizontalAlignment='center'>
              <i-input id='searchBox' height='39px' width='100%' maxWidth='619px' onChanged={this.onSearchBoxChanged} />
            </i-hstack>
            <i-hstack grid={{ area: 'ComboBoxArea' }} resizer={true} width='100%' verticalAlignment='center' horizontalAlignment='center' gap={5}>
              <i-label id='comboBoxLabel' font={{ color: 'white' }}></i-label>
              <i-combo-box id='comboBox' height='39px' class="custom-combobox" background={{ color: '#34343A' }} onChanged={this.onComboBoxChanged}></i-combo-box>
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
