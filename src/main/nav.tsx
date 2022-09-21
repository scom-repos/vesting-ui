import {
  customElements,
  Module,
  Control,
  ControlElement,
  Menu,
  Styles,
  Button,
  Modal,
  observable,
  Label,
  Panel,
  application,
  IEventBus,
  Image,
  HStack,
  IModuleMenuItem,
  Icon,
  GridLayout,
  VStack,
  Container,
  IMenuItem
} from '@ijstech/components';
import { Wallet, WalletPlugin, WalletPluginConfig } from "@ijstech/eth-wallet";
import { INetwork, EventId, formatNumber } from '@vesting/global';
import { 
  walletList, 
  connectWallet, 
  logoutWallet, 
  switchNetwork, 
  getChainId, 
  hasWallet, 
  getNetworkInfo,
  getNetworkList,
  ChainNativeTokenByChainId,
  setTokenMap,
  getDefaultChainId
} from '@vesting/store';
import styleClass from './nav.css';
import Assets from '@vesting/assets';

const Theme = Styles.Theme.ThemeVars;
let href = '';

@customElements('portal-main-nav')
export class Nav extends Module {
  private _menuItems: IModuleMenuItem[];
  private mobileMenuStack: HStack;
  private desktopMenuStack: HStack;
  private mobileMenu: Menu;
  private desktopMenu: Menu;
  private hamburger: Button;
  private switchModal: Modal;
  private connectModal: Modal;
  private accountModal: Modal;
  private wallet: Wallet;
  private lbTokenSymbol: Label;
  private walletContainer: Control;
  private networkButtonContainer: Panel;
  private walletBalanceElm: Panel;
  private walletDetailPanel: Panel;
  private walletDetailButton: Button;
  private walletConnectButton: Button;
  private networkButton: Button;
  private networkGroup: GridLayout;
  private walletListElm: GridLayout;
  private $eventBus: IEventBus;
  private selectedNetwork: INetwork;
  private copyIcon: Icon;

  @observable()
  private walletShortlyAddress: string;
  @observable()
  private walletInfo = {
    address: '',
    balance: '',
    networkId: 0
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvent();
  };
  get shortlyAddress(): string {
    const address = this.walletInfo.address;
    if (!address) return 'No address selected';
    return address.substr(0, 6) + '...' + address.substr(-4);
  }

  registerEvent() {
    this.$eventBus.register(this, EventId.ConnectWallet, this.openConnectModal)
    this.$eventBus.register(this, EventId.IsWalletConnected, async (connected: boolean) => {
      if (connected) {
        this.walletInfo.address = Wallet.getInstance().account.address;
        this.walletInfo.balance = formatNumber((await Wallet.getInstance().balance).toFixed(), 2);
      }
      this.selectedNetwork = getNetworkInfo(Wallet.getInstance().chainId);
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    })
    this.$eventBus.register(this, EventId.IsWalletDisconnected, async (connected: boolean) => {
      this.selectedNetwork = getNetworkInfo(Wallet.getInstance().chainId);
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    })
    this.$eventBus.register(this, EventId.chainChanged, async (chainId: number) => {
      this.selectedNetwork = getNetworkInfo(chainId);
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.walletInfo.balance = formatNumber((await Wallet.getInstance().balance).toFixed(), 2);
      this.updateConnectedStatus(true);
      this.updateList(true);
    })
  }

  updateConnectedStatus = (value: boolean) => {
    if (value) {
      this.renderNetworkButton();
      if (this.walletContainer.contains(this.walletBalanceElm)) {
        this.walletContainer.removeChild(this.walletBalanceElm);
      }
      const balanceLabel = this.walletBalanceElm.firstChild as Label;
      balanceLabel.caption = this.walletInfo.balance;
      this.lbTokenSymbol.caption = this.getSymbol();
      this.walletContainer.appendChild(this.walletBalanceElm);
      this.walletContainer.insertBefore(this.walletBalanceElm, this.walletDetailPanel);
      if (this.walletContainer.contains(this.walletConnectButton)) {
        this.walletContainer.removeChild(this.walletConnectButton);
      }
      this.walletDetailButton.caption = this.shortlyAddress;
      this.walletShortlyAddress = this.shortlyAddress;
      this.walletDetailPanel.append(this.walletDetailButton);
    }
    else {
      if (this.walletContainer.contains(this.walletBalanceElm)) {
        this.walletContainer.removeChild(this.walletBalanceElm)
      }
      if (this.walletDetailPanel.contains(this.walletDetailButton)) {
        this.walletDetailPanel.removeChild(this.walletDetailButton);
      }
      this.walletContainer.append(this.walletConnectButton);
    }
  }

  async requestAccounts() {
    try {
      await this.wallet.web3.eth.requestAccounts();
    } catch (error) {
      console.error(error);
    }
  }

  async initData() {
    let accountsChangedEventHandler = async (account: string) => {
      setTokenMap();
    }
    let chainChangedEventHandler = async (hexChainId: number) => {
      this.updateConnectedStatus(true);
      setTokenMap();
    }
    const selectedProvider = localStorage.getItem('walletProvider') as WalletPlugin;
    const isValidProvider = Object.values(WalletPlugin).includes(selectedProvider);
    if (hasWallet() && isValidProvider) {
      this.wallet = await connectWallet(selectedProvider, {
        'accountsChanged': accountsChangedEventHandler,
        'chainChanged': chainChangedEventHandler
      });
    }
  }

  _getMenuData(list: IModuleMenuItem[], mode: string, validMenuItemsFn: (item: IModuleMenuItem) => boolean): IMenuItem[] {
    const menuItems: IMenuItem[] = [];
    list.filter(validMenuItemsFn).forEach((item: IModuleMenuItem, key: number) => {
      const linkTarget = item.isToExternal ? '_blank': '_self';
      const _menuItem: IMenuItem = {
        title: item.text,
        link: { href: item.to, target: linkTarget },
      };
      if (mode === 'mobile' && item.img) {
        _menuItem.icon = { width: 24, height: 24, image: { width: 24, height: 24, url: Assets.fullPath(item.img) } }
      }
      if (item.subItems && item.subItems.length) {
        _menuItem.items = this._getMenuData(item.subItems, mode, validMenuItemsFn);
      }
      menuItems.push(_menuItem);
    })
    return menuItems;
  }

  getMenuData(list: IModuleMenuItem[], mode: string): any {
    let chainId = this.selectedNetwork?.chainId || Wallet.getInstance().chainId;
    let validMenuItemsFn: (item: IModuleMenuItem) => boolean;
    if (chainId) {
      validMenuItemsFn = (item: IModuleMenuItem) => !item.isDisabled && (!item.supportedChainIds || item.supportedChainIds.includes(chainId)) && (!item.env || item.env.some((v) => v === siteEnv));
    }
    else {
      validMenuItemsFn = (item: IModuleMenuItem) => !item.isDisabled && (!item.env || item.env.some((v) => v === siteEnv));
    }
    return this._getMenuData(list, mode, validMenuItemsFn);
  }

  renderMobileMenu() {
    const data = this.getMenuData(this._menuItems, 'mobile');
    this.mobileMenu.data = data;
  }

  renderDesktopMenu() {
    const data = this.getMenuData(this._menuItems, 'desktop');
    this.desktopMenu.data = data;
  }

  toggleMenu() {
    if (!this.enabled) {
      this.mobileMenu.classList.remove('show-menu');
      return;
    }
    const shownMenu = this.mobileMenu.classList.contains('show-menu');
    shownMenu ? this.mobileMenu.classList.remove('show-menu') : this.mobileMenu.classList.add('show-menu');
  }

  showModal(name: string, title: string = '') {
    const modalELm = this[name as 'switchModal' | 'connectModal' | 'accountModal'];
    title && (modalELm.title = title);
    modalELm.visible = true;
  }

  isLive(walletPlugin: WalletPlugin) {
    const provider = walletPlugin.toLowerCase();
    return Wallet.isInstalled(walletPlugin) && Wallet.getInstance().clientSideProvider?.walletPlugin === provider;
  }

  isNetworkLive(chainId: number) {
    return Wallet.getInstance().chainId === chainId;
  }

  async switchNetwork(chainId: number) {
    if (!chainId) return;
    await switchNetwork(chainId);
    this.switchModal.visible = false;
  }

  openLink(link: any) {
    return window.open(link, '_blank');
  };
  async connectToProviderFunc(walletPlugin: WalletPlugin) {
    if (Wallet.isInstalled(walletPlugin)) {
      await connectWallet(walletPlugin);
    }
    else {
      let config = WalletPluginConfig[walletPlugin];
      let homepage = config?.homepage ? config.homepage() : '';
      this.openLink(homepage);
    }
    this.connectModal.visible = false;
  };

  logout = async () => {
    await logoutWallet();
    this.updateConnectedStatus(false);
    this.updateList(false);
  }

  private getSymbol() {
    let symbol = '';
    if (this.selectedNetwork?.chainId && ChainNativeTokenByChainId[this.selectedNetwork.chainId]) {
      symbol = ChainNativeTokenByChainId[this.selectedNetwork.chainId].symbol;
    }
    return symbol;
  }

  async renderWalletBalance() {
    this.walletBalanceElm = new Panel();
    this.walletBalanceElm.classList.add('my-wallet');

    const balanceLabel = await Label.create();
    balanceLabel.caption = this.walletInfo.balance;
    this.walletBalanceElm.appendChild(balanceLabel);

    this.lbTokenSymbol = await Label.create();
    this.lbTokenSymbol.id = "lbTokenSymbol";
    this.lbTokenSymbol.caption = this.getSymbol();
    this.lbTokenSymbol.style.marginLeft = "5px";
    this.walletBalanceElm.appendChild(this.lbTokenSymbol);
  }

  async renderWalletButton() {
    this.walletDetailButton = await Button.create({
      caption: this.shortlyAddress,
      padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
      margin: { left: 10 }
    })
    
    const modalElm = await Modal.create({
      maxWidth: '200px',
      showBackdrop: false,
      height: 'auto',
      popupPlacement: 'bottomRight'
    })
    modalElm.classList.add("account-dropdown");

    const vstack = await VStack.create({
      gap: '15px'
    });
    const itemCaptions = ["Account", "Switch wallet", "Logout"];
    const itemFunctions = [
      () => this.showModal('accountModal'),
      () => this.showModal('connectModal', 'Switch wallet'),
      this.logout
    ];

    itemCaptions.forEach(async (caption, i) => {
      const buttonItem = await Button.create({
        caption,
        width: '100%',
        height: 'auto',
        padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }
      });
      buttonItem.onClick = (source: Control, event: Event): boolean => {
        event.stopPropagation();
        modalElm.visible = false;
        itemFunctions[i]();
        return true;
      }
      vstack.appendChild(buttonItem);
      modalElm.item = vstack;
    })
    this.walletDetailPanel.appendChild(modalElm);
    this.walletDetailButton.classList.add("btn-os");
    this.walletDetailButton.onClick = () => modalElm.visible = !modalElm.visible;

    this.walletConnectButton = await Button.create();
    this.walletConnectButton.caption = "Connect Wallet";
    this.walletConnectButton.classList.add('btn', 'btn-os', 'btn-connect', 'ml-0-5');
    this.walletConnectButton.onClick = this.openConnectModal;
    this.walletContainer.append(this.walletConnectButton);
  }

  async renderNetworkButton() {
    const hStack = await HStack.create();
    hStack.verticalAlignment = "center";
    if (this.selectedNetwork?.img) {
      const image = await Image.create();
      image.url = Assets.fullPath(this.selectedNetwork.img);
      image.width = 26;
      image.classList.add('inline-block');
      hStack.appendChild(image);
    }
    const label = await Label.create();
    label.caption = this.selectedNetwork?.name || 'Unsupported Network';
    label.classList.add('ml-0-5');
    hStack.appendChild(label);
    this.networkButton = await Button.create();
    this.networkButton.classList.add('btn', 'btn-network', 'mr-1');
    this.networkButton.onClick = () => this.showModal('switchModal');
    this.networkButton.appendChild(hStack);
    this.networkButtonContainer.clearInnerHTML();
    this.networkButtonContainer.appendChild(this.networkButton);
  }

  renderNetworks() {
    this.networkGroup.clearInnerHTML();
    let networkList = getNetworkList();
    this.networkGroup.append(...networkList.map((network) => {
      return (
        <i-hstack
          onClick={() => this.switchNetwork(network.chainId)}
          class={this.isNetworkLive(network.chainId) ? 'is-actived list-item' : 'list-item'}
          data-key={network.chainId}
          verticalAlignment="center"
          gap={10}
        >
          <i-image url={Assets.fullPath(network.img)} width={34} class="ml-0-7-5 inline-block" />
          <i-label class="custom-label" caption={network.name} />
        </i-hstack>
      )
    }));
  }

  openConnectModal = () => {
    this.showModal('connectModal', 'Connect wallet');
  }

  renderWalletList() {
    this.walletListElm.clearInnerHTML();
    const list = walletList.map(wallet => {
      return (
        <i-hstack
          onClick={() => this.connectToProviderFunc(wallet.name)}
          class={this.isLive(wallet.name) ? 'is-actived list-item' : 'list-item'}
          data-key={wallet.name}
          verticalAlignment="center"
          gap={10}
        >
          <i-label class="custom-label" caption={wallet.displayName} />
          <i-image url={Assets.fullPath(`img/wallet/${wallet.iconFile}`)} width={34} class="inline-block" />
        </i-hstack>
      );
    });
    this.walletListElm.append(...list);
  }

  backToLanding = () => {
    this.desktopMenu.setActiveItem(false);
    window.location.assign('#/');
  }

  updateDot(parent: HTMLElement, connected: boolean, type: 'network' | 'wallet') {
    const acivedElm = parent.querySelector('.is-actived');
    acivedElm && acivedElm.classList.remove('is-actived');

    if (connected) {
      const wallet = Wallet.getInstance();
      const connectingVal = type === 'network' ? wallet.chainId : wallet.clientSideProvider?.walletPlugin;
      const connectingElm = parent.querySelector(`[data-key="${connectingVal}"]`);
      connectingElm && connectingElm.classList.add('is-actived');
    }
  }

  updateList(connected: boolean) {
    this.updateDot(this.walletListElm, connected, 'wallet');
    this.updateDot(this.networkGroup, connected, 'network');
  }
  controlMenuDisplay() {
    if (window.innerWidth < 760) {
      this.mobileMenuStack.visible = true;
      this.desktopMenuStack.visible = false;
    }
    else {
      this.mobileMenuStack.visible = false;
      this.desktopMenuStack.visible = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', (e) => {
      this.controlMenuDisplay();
    });
  }
  getElementProperty(name: string) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }   
    return value; 
  }
  async init() {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.mobileMenu || !this.hamburger) return;
      if (!this.mobileMenu.contains(e.target as HTMLElement) && (!this.hamburger.contains(e.target as HTMLElement))) {
        this.mobileMenu.classList.remove('show-menu')
      }
    });
    this.classList.add(styleClass);
    this.selectedNetwork = getNetworkInfo(getDefaultChainId());
    super.init();
    this._menuItems = this.getElementProperty('menuItems');
    this.renderMobileMenu();
    this.renderDesktopMenu();
    this.controlMenuDisplay();
    await this.renderWalletBalance();
    await this.renderWalletButton();
    await this.renderNetworkButton();
    this.renderNetworks();
    this.renderWalletList();
    this.walletShortlyAddress = this.shortlyAddress;
    await this.initData();
    this.getSymbol();
    this.copyIcon.onClick = () => application.copyToClipboard(this.walletInfo.address || '')
  }
  async render() {
    return (
      <i-hstack class="nav" width="100%" padding={{ top: "0.9375rem", bottom: "0.625rem", left: "1rem", right: "1rem" }}>
        <i-hstack stack={{grow:"1"}} horizontalAlignment="space-between" verticalAlignment="center">
          <i-hstack id="mobileMenuStack" class="mobile" verticalAlignment="center" visible={false}>
            <i-button id="hamburger" onClick={this.toggleMenu} class="btn-hamburger mr-1">
              <i-image url={Assets.fullPath("img/menu-24.png")} width="20px" height="20px" class="inline-block" />
            </i-button>
            <i-menu id="mobileMenu" mode="vertical" class="os-mobile"></i-menu>
            <i-image
              url={Assets.icons.logoMobile}
              onClick={this.backToLanding}
              class="mobile-logo pointer"
            />
          </i-hstack>
          <i-hstack id="desktopMenuStack" class="desktop-wrap" verticalAlignment="center" maxWidth="calc(100% - 640px)">
            <i-image
              stack={{ shrink: '0' }}
              width={200}
              url={Assets.icons.logo}
              onClick={this.backToLanding}
              class="ml-0-5 mr-1-2-5 desktop-logo pointer"
            />
            <i-menu id="desktopMenu" width="100%" border={{ left: { color: '#192046', width: '1px', style: 'solid' }}}></i-menu>
          </i-hstack>
          <i-hstack
            id="walletContainer" horizontalAlignment="end" verticalAlignment="center"
            border={{ left: { color: '#192046', width: '1px', style: 'solid' }}}
          >
            <i-hstack id="networkButtonContainer" padding={{ left: '1rem' }}></i-hstack>
            <i-panel id="walletDetailPanel"></i-panel>
          </i-hstack>
        </i-hstack>
        <i-modal id="switchModal" title="Supported Network" class="os-modal" closeIcon={{ name: 'times' }}>
          <i-panel class="i-modal_content">
            <i-label font={{size: '.875rem'}} caption="We supports the following networks, please click to connect."></i-label>
            <i-grid-layout id="networkGroup" class="list-view networks" columnsPerRow={1} templateRows={['max-content']}></i-grid-layout>
          </i-panel>
        </i-modal>
        <i-modal id="connectModal" title="Connect Wallet" class="os-modal connect-modal" closeIcon={{ name: 'times' }}>
          <i-panel class="i-modal_content">
            <i-label class="mt-1 small-label" caption="Recommended wallet for Chrome"></i-label>
            <i-panel>
              <i-grid-layout id="walletListElm"
                class="list-view wallets" padding={{ bottom: 30 }}
                columnsPerRow={1} templateRows={['max-content']}
              ></i-grid-layout>
            </i-panel>
          </i-panel>
        </i-modal>
        <i-modal id="accountModal" title="Account" class="os-modal account-modal" closeIcon={{ name: 'times' }}>
          <i-panel class="i-modal_content">
            <i-hstack horizontalAlignment="space-between">
              <i-label class="small-label" caption="Connected with" />
              <i-button caption="Logout" class="btn btn-connect" onClick={this.logout} />
            </i-hstack>
            <i-label caption={this.walletShortlyAddress} class="large-label bold" />
            <i-hstack verticalAlignment="center">
              <i-icon
                id="copyIcon"
                name="copy"
                width="16px"
                height="16px"
                fill={Theme.text.primary}
                tooltip={{ content: `The address has been copied`, trigger: 'click' }}
                class="inline-flex pointer address-info"
              ></i-icon>
              <i-label caption="Copy Address" class="mr-2-5 ml-0-5 bold small-label" />
              <i-label link={{ href }} class="custom-link">
                <i-hstack verticalAlignment="center">
                  <i-icon name="external-link-alt" width="16" height="16" fill={Theme.text.primary} class="inline-block" />
                  <i-label caption="View on Etherscan" class="small-label bold ml-0-5" />
                </i-hstack>
              </i-label>
            </i-hstack>
          </i-panel>
        </i-modal>
      </i-hstack>
    )
  }
};
export interface NavElement extends ControlElement {
  menuItems?: IModuleMenuItem[];
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["portal-main-nav"]: NavElement;
    }
  }
};