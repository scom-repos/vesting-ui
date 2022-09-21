import { customElements, Module, Control, ControlElement, Modal, Panel, Label, HStack, Image, Button, Container } from '@ijstech/components';
import assets from '@vesting/assets';
import styleClass from './confirm.css';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['portal-confirm-modal']: ControlElement;
		}
	}
};

export interface IMessage {
  status: 'warning' | 'success' | 'error',
  content?: string,
  actions: any[]
}

@customElements('portal-confirm-modal')
export class ConfirmModal extends Module {
  private confirmModal: Modal;
  private mainContent: Panel;
  private _message: IMessage;

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

  async renderUI() {
    this.mainContent.innerHTML = '';
    const mainSection = new Panel();
    if (this.message.status === 'warning') {
      mainSection.id = "warningSection";
      mainSection.padding = { top: 10, bottom: 10, left: 0, right: 0 };
      const section = new HStack(this, {
        gap: '10px'
      })
      section.verticalAlignment = 'center';
      const image = new Image(mainSection, {
        width: '50px',
        height: '50px',
        url: assets.fullPath('img/warning.svg')
      });
      image.classList.add("inline-block");
      image.classList.add("mb");
      section.appendChild(image);

      if (this.message.content) {
        const label = new Label(section, {
          caption: this.message.content,
          font: { size: '14px' }
        });
        section.appendChild(label);
      }
      mainSection.appendChild(section);
    }
    this.mainContent.appendChild(mainSection);

    if (this.message.actions && this.message.actions.length) {
      const actionSection = new HStack(this.mainContent, {
        gap: '10px'
      });
      actionSection.margin = { top: '3rem' };
      actionSection.horizontalAlignment = 'end';
      actionSection.verticalAlignment = 'center';
      this.message.actions.forEach(item => {
        const button = new Button(actionSection, {
          caption: item.caption,
          height: 'auto'
        });
        button.classList.add('btn');
        item.className && button.classList.add(item.className);
        button.onClick = item.action || this.closeModal.bind(this);
        actionSection.appendChild(button);
      })
      this.mainContent.appendChild(actionSection);
    }
  }

	render() {
		return (
      <i-modal
        id='confirmModal'
        class='dark-modal confirm-modal'
        closeIcon={{ name: 'times' }}
      >
        <i-vstack id="mainContent" class="i-modal_content"></i-vstack>
      </i-modal>
		)
	}
};
