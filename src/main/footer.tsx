import { application, customElements, Module, Control, ControlElement, HStack, Label, VStack, Container } from '@ijstech/components';
import Assets from '@vesting/assets';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["portal-main-footer"]: FooterElement;
    }
  }
};

export interface FooterElement extends ControlElement {
  menuItems?: any;
  params?: any;
}

@customElements('portal-main-footer')
export class Footer extends Module {
  private _params: any;
  private secureComputeStack: HStack;
  private socialMediaStack: HStack;
  private pagesStack: HStack;
  private infoStack: HStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  };

  getElementProperty(name: string) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }
    return value;
  }

  controlPageStackDisplay() {
    if (window.innerWidth < 564) {
      this.pagesStack.visible = false;
    }
    else {
      this.pagesStack.visible = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', (e) => {
      this.controlPageStackDisplay();
    });
  }

  async init() {
    super.init();
    this._params = this.getElementProperty('params') || {};
    let secureComputeInfo = this._params.secureComputeInfo;
    this.secureComputeStack.append(<i-label link={{ href: secureComputeInfo.link }}>
      <i-image width={40} height={40} url={Assets.fullPath(secureComputeInfo.img)} />
    </i-label>)
    let socialMediaInfoList: any[] = this._params.socialMediaInfo;
    for (let info of socialMediaInfoList) {
      this.socialMediaStack.append(<i-label link={{ href: info.link }}>
        <i-image url={Assets.fullPath(info.img)} width="24px" />
      </i-label>)
    }
    let footerPagesInfoList: any[] = this._params.footerPagesInfo;
    for (let info of footerPagesInfoList) {
      this.pagesStack.append(<i-label font={{ color: "#fff" }} link={{ href: info.link, target: "_self" }}>
        <i-label caption={info.caption} />
      </i-label>)
    }
    let projectInfoList = this._params.projectInfo;
    for (let info of projectInfoList) {
      let item: any;
      if (info.link) {
        item = (<i-label font={{ color: "#fff" }} link={{ href: info.link }}>
          <i-label caption={info.caption} />
        </i-label>)
      } else {
        item = <i-label font={{ color: "#fff" }} caption={info.caption} />
      }
      this.infoStack.append(item)
    }
    this.controlPageStackDisplay();
  }
  render() {
    return (
      <i-vstack wrap='nowrap' width="100%" verticalAlignment="center">
        <i-hstack width="100%" gap="0.8rem" horizontalAlignment="space-between" verticalAlignment="center">
          <i-hstack id="secureComputeStack" verticalAlignment="center">
          </i-hstack>
          <i-hstack gap="2rem" id="pagesStack">
          </i-hstack>
        </i-hstack>
        <i-hstack
          id="socialMediaStack" gap="1rem" horizontalAlignment="end" verticalAlignment="center"
          margin={{ top: "0.5rem", bottom: "0.5rem" }}
          border={{ bottom: { color: '#fff', width: '2px', style: 'solid' }}}
          padding={{ bottom: '2rem' }}
        >
        </i-hstack>
        <i-hstack id="infoStack" width="100%" gap="0.8rem" horizontalAlignment="space-between" verticalAlignment="center" margin={{ top: 16 }}>
        </i-hstack>
      </i-vstack>
    )
  }
};