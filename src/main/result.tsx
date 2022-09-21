import { customElements, Module, ControlElement, Modal, Panel, Label, Icon, Button, VStack, Container, Styles } from '@ijstech/components';
import { getWallet, getNetworkExplorerName, viewOnExplorerByTxHash } from '@vesting/store';
import { parseContractError } from '@vesting/global';
import styleClass from './result.css';
import Assets from '@vesting/assets';
const Theme = Styles.Theme.ThemeVars;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['portal-result']: ControlElement;
		}
	}
};

export interface IMessage {
  status: 'warning' | 'success' | 'error',
  content?: any,
  txtHash?: string,
  obj?: any
}

@customElements('portal-result')
export class Result extends Module {
  private confirmModal: Modal;
  private mainContent: Panel;
  private _message: any;

  get message(): IMessage {
    return this._message;
  }

  set message(value: IMessage) {
    this._message = value;
    this.renderUI();
  }

	constructor(parent?: Container, options?: any) {
		super(parent, options);
	};

	async init(){
		this.classList.add(styleClass);
		super.init();
  }

  closeModal() {
    this.confirmModal.visible = false;
  }

  showModal() {
    this.confirmModal.visible = true;
  }

  async buildLink() {
    if (this.message.txtHash) {
      const chainId: number = await getWallet().getChainId();
      viewOnExplorerByTxHash(chainId, this.message.txtHash);
    }
  }

  async renderUI() {
    this.mainContent.clearInnerHTML();
    const mainSection = await VStack.create({
      horizontalAlignment: 'center'
    });
    if (this.message.status === 'warning') {
      mainSection.id = "warningSection";
      const loading = (
        <i-panel height={100}>
          <i-vstack id="loadingElm" class="i-loading-overlay" height="100%" background={{ color: 'transparent' }} >
            <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
              <i-icon 
                class="i-loading-spinner_icon"
                image={{ url: Assets.fullPath('img/loading.svg'), width: 24, height: 24 }}
              ></i-icon>
              <i-label caption="Loading..." font={{ color: '#FD4A4C' }} class="i-loading-spinner_text"></i-label>
            </i-vstack>
          </i-vstack>
        </i-panel>
      )
      mainSection.appendChild(loading);
      const section = await Panel.create({
        margin: { bottom: 20 }
      }, mainSection);

      const label = await Label.create({
        caption: 'Waiting For Confirmation',
        margin: { bottom: '1rem' },
        font: { size: '1.125rem', color: Theme.colors.warning.light }
      });
      section.appendChild(label);

      const label2 = await Label.create({
        caption: this.message.content || '',
        margin: { bottom: '1rem' }
      });
      section.appendChild(label2);

      const label3 = await Label.create({
        caption: 'Confirm this transaction in your wallet',
        font: { color: '#C2C3CB' }
      });
      section.appendChild(label3);

      mainSection.appendChild(section);
    } else if (this.message.status === 'success') {
      const chainId: number = await getWallet().getChainId();
      const explorerName = getNetworkExplorerName(chainId);
      
      const icon = await Icon.create({
        name: 'check-circle',
        height: 50,
        fill: Theme.colors.primary.main,
        margin: { bottom: '1.875rem' },
      }, mainSection)
      icon.classList.add("inline-block");
      mainSection.appendChild(icon);
      
      const label = await Label.create({
        caption: 'Transaction Submitted',
        margin: { bottom: '1.875rem' },
        font: { size: '1.125rem', color: Theme.colors.warning.light }
      }, mainSection);
      mainSection.appendChild(label);

      const contentSection = await Panel.create({}, mainSection);
      contentSection.id = "contentSection";
      mainSection.appendChild(contentSection);

      const contentLabel = await Label.create({
        caption: this.message.content || '',
      });
      contentSection.appendChild(contentLabel);

      if (this.message.txtHash) {
        const section = await VStack.create({}, contentSection);

        const label1 = await Label.create({
          caption: this.message.txtHash.substring(0, 33),
          margin: { bottom: '1rem' }
        }, section);
        section.appendChild(label1);

        const label2 = await Label.create({
          caption: this.message.txtHash.substring(33, this.message.txtHash.length),
          margin: { bottom: '1rem' }
        }, section);
        section.appendChild(label2);

        const link = await Label.create({
          caption: `View on ${explorerName}`,
          margin: { top: '1rem' },
          // link: { href: '#' }
        }, section);
        link.onClick = this.buildLink.bind(this);
        link.classList.add("red-link", "block");
        section.appendChild(link);
        contentSection.appendChild(section);
      }

      const button = await Button.create({
        width: '100%',
        caption: 'Close',
        margin: { top: '1rem' },
        background: { color: Theme.colors.primary.main },
      }, mainSection);
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    } else {
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

      const section = await VStack.create({}, mainSection);
      section.id = "contentSection";
      const caption = await this.onErrMsgChanged();
      const contentLabel = await Label.create({
        caption: caption,
        margin: { bottom: '1rem' },
      }, section);
      section.appendChild(contentLabel);
      mainSection.appendChild(section);

      const button = await Button.create({
        width: '100%',
        caption: 'Cancel',
        margin: { top: '1rem' },
        background: { color: Theme.colors.primary.main },
      }, mainSection);
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    }

    this.mainContent.clearInnerHTML();
    this.mainContent.appendChild(mainSection);
  }

  async onErrMsgChanged() {
    if (this.message.status !== 'error') return this.message.content;

    if (this.message.content.message && this.message.content.message.includes('Internal JSON-RPC error.')) {
      this.message.content.message = JSON.parse(this.message.content.message.replace('Internal JSON-RPC error.\n', '')).message;
    }
    
    return await parseContractError(this.message.content.message, this.message.obj);
  }

	render() {
		return (
      <i-modal
        id='confirmModal'
        closeIcon={{ name: 'times' }}
        class='dark-modal confirm-modal'
      >
        <i-panel id="mainContent" class="i-modal_content"></i-panel>
      </i-modal>
		)
	}
};