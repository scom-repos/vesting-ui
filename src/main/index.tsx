import {
	application,
	customElements,
	Control,
	Module,
	Styles,
	Panel,
	customModule,
	IEventBus,
	IModuleMenuItem,
	IHasDependencies,
	Container,
	Image,
	HStack,
	VStack
} from '@ijstech/components';
import styleClass from './index.css';
import { Result } from './result';
import { EventId } from '@vesting/global';
import { Nav } from './nav';
import { Footer } from './footer';
import { ConfirmModal } from './confirm';
import { setDataFromSCConfig } from '@vesting/store';
export { Nav } from './nav';
export { Footer } from './footer';
import Assets from '@vesting/assets';

Styles.Theme.applyTheme(Styles.Theme.darkTheme);
const Theme = Styles.Theme.ThemeVars;

interface IModuleHeader {
	sloganUrl?: string;
	breadcrumb?: boolean | IModuleBreadcrumb;
	maxWidth?: string;
	padding?: any;
}

interface IModuleBreadcrumb {
	supportedUrl: string[];
}

@customModule
@customElements('portal-main-launcher')
export class MainLauncher extends Module {
  private headerElm: Nav
  private footerElm: Footer
  private pageWrap: Panel
  private resultMain: Result
  private $eventBus: IEventBus
  private params: any
  private menuItems: IModuleMenuItem[]
  private confirmModal: ConfirmModal
  private subHeader: VStack
  private header: IModuleHeader
  private breadcrumbStack: HStack

  constructor(parent?: Container, options?: any) {
    super(parent, options)
    this.classList.add(styleClass)
    this.$eventBus = application.EventBus
  }

  override bindOnHashChange() {
    window.onhashchange = this.locationHashChanged.bind(this)
  }

  override initCustomData(options: any) {
    this.params = options.params
    this.menuItems = options.menuItems || []
    this.header = options.header
    setDataFromSCConfig(options)
  }

  override async afterLocationHashChanged() {
    this.toggleLayout(true)
    this.renderBreadcrumb()
  }
  override async handleLoadModuleCustom(module: Module) {
    if (this.pageWrap.contains(module)) module.style.display = 'initial'
    else this.pageWrap.append(module)
  }
	
	toggleLayout(value: boolean) {
		this.headerElm.visible = value;
		this.footerElm.visible = value;
	}

  async init() {
    super.init()

    this.handleResultModal()
    this.handleConfirmModal()
    this.renderHeader()
    this.$eventBus.register(this, EventId.ShowMainLayout, this.toggleLayout)
  }

  handleResultModal() {
    this.resultMain = new Result()
    this.appendChild(this.resultMain)

    this.$eventBus.register(this, EventId.ShowResult, () => {
      this.resultMain.showModal()
    })

    this.$eventBus.register(this, EventId.SetResultMessage, (message: any) => {
      this.resultMain.message = message
    })
  }

  handleConfirmModal() {
    this.confirmModal = new ConfirmModal()
    this.appendChild(this.confirmModal)

    this.$eventBus.register(this, EventId.ShowConfirmationModal, () => {
      this.confirmModal.showModal()
    })

    this.$eventBus.register(
      this,
      EventId.SetConfirmationMessage,
      (message: any) => {
        this.confirmModal.message = message
      }
    )
  }

  async renderHeader() {
    this.subHeader.innerHTML = ''
    if (!this.header) return
    if (this.header.maxWidth) this.subHeader.maxWidth = this.header.maxWidth
    if (this.header.padding) this.subHeader.padding = this.header.padding
    this.renderSlogan()
    this.renderBreadcrumb()
  }

  async renderSlogan() {
    if (!this.header.sloganUrl) return
    const img = await Image.create({
      url: Assets.fullPath(this.header.sloganUrl),
    })
    this.subHeader.appendChild(img)
  }

  getBreadcrumbList(): string[] {
    const url = window.location.hash.replace('#/', '')
    return url.split('/').map((v) => v.split('?')[0])
  }

  async renderBreadcrumb() {
    if (!this.header || !this.header.breadcrumb) return
    if (!this.breadcrumbStack) {
      const stackElm: any = { verticalAlignment: 'center', gap: '8px' }
      if (this.header.padding) stackElm.padding = this.header.padding
      this.breadcrumbStack = await HStack.create(stackElm)
      this.breadcrumbStack.classList.add('breadcrumb')
      this.subHeader.appendChild(this.breadcrumbStack)
    }
    this.breadcrumbStack.innerHTML = ''
    if (
      typeof this.header.breadcrumb === 'object' &&
      (!this.header.breadcrumb.supportedUrl.length ||
        !this.header.breadcrumb.supportedUrl.includes(this.currentModuleUrl))
    ) {
      this.breadcrumbStack.visible = false
      return
    }
    const list = this.getBreadcrumbList()
    let url = '#'
    const breadcrumbs = list.map((path: string, index) => {
      url += '/' + path
      const color =
        index === list.length - 1
          ? Theme.colors.primary.contrastText
          : Theme.colors.primary.dark
      const className =
        index === list.length - 1 ? 'active inline-flex' : 'inline-flex'
      return (
        <i-label
          link={{ href: url, target: '_self' }}
          class={className}
          font={{ bold: true, color: color }}
          caption={path}
        ></i-label>
      )
    })
    this.breadcrumbStack.visible = true
    this.breadcrumbStack.append(...breadcrumbs)
  }

  render() {
    return (
      <i-vstack height='inherit'>
        <portal-main-nav
          id='headerElm'
          menuItems={this.menuItems}
          height='auto'
          width='100%'
        ></portal-main-nav>
        <i-vstack
          id='subHeader'
          horizontalAlignment='center'
          height='auto'
          width='100%'
          gap='1rem'
          margin={{ left: 'auto', right: 'auto', top: '1rem' }}
        ></i-vstack>
        <i-panel id='pageWrap' stack={{ grow: '1', shrink: '0' }}></i-panel>
        <portal-main-footer
          id='footerElm'
          params={this.params}
          background={{ color: Styles.Theme.ThemeVars.background.main }}
          padding={{ top: '2rem', bottom: '2rem', right: '2rem', left: '2rem' }}
          stack={{ shrink: '0' }}
          class='footer'
          height='auto'
          width='100%'
        ></portal-main-footer>
      </i-vstack>
    )
  }
}


export { Result } from './result';