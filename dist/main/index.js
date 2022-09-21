define("@vesting/main",(require, exports)=>{
  var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/main/index.tsx
__export(exports, {
  Footer: () => Footer,
  MainLauncher: () => MainLauncher,
  Nav: () => Nav,
  Result: () => Result
});
var import_components9 = __toModule(require("@ijstech/components"));

// src/main/index.css.ts
var import_components = __toModule(require("@ijstech/components"));
var import_assets = __toModule(require("@vesting/assets"));
var Theme = import_components.Styles.Theme.ThemeVars;
import_components.Styles.Theme.darkTheme.background.default = "#212128";
import_components.Styles.Theme.darkTheme.background.paper = "#000000";
import_components.Styles.Theme.darkTheme.background.main = "linear-gradient(270deg, #FF9900 0%, #FC7428 100%)";
import_components.Styles.Theme.darkTheme.background.gradient = "radial-gradient(50.87% 45.87% at 88.62% 0%, rgba(255, 184, 0, 0.609) 0%, rgba(255, 205, 26, 0.168438) 57.81%, rgba(7, 8, 9, 0) 100%)";
import_components.Styles.Theme.darkTheme.colors.primary.dark = "#FF9515";
import_components.Styles.Theme.darkTheme.colors.primary.light = "#FFAE2C";
import_components.Styles.Theme.darkTheme.colors.primary.main = "#FF981F";
import_components.Styles.Theme.darkTheme.colors.secondary.dark = "#f7d063";
import_components.Styles.Theme.darkTheme.colors.secondary.light = "#f7d063b6";
import_components.Styles.Theme.darkTheme.colors.secondary.main = "#f7d063";
import_components.Styles.Theme.darkTheme.colors.error.main = "#D84C4C";
import_components.Styles.Theme.darkTheme.colors.success.dark = "#04B761";
import_components.Styles.Theme.darkTheme.colors.success.main = "#79B776";
import_components.Styles.Theme.darkTheme.text.secondary = "hsla(0, 0%, 100%, 0.55)";
import_components.Styles.Theme.darkTheme.typography.fontFamily = "Raleway";
import_components.Styles.Theme.darkTheme.colors.warning.dark = "#f57c00";
import_components.Styles.Theme.darkTheme.colors.warning.light = "#F6C958";
import_components.Styles.Theme.darkTheme.colors.warning.main = "#ffa726";
import_components.Styles.Theme.darkTheme.colors.info.light = "#6BA6FF";
import_components.Styles.Theme.darkTheme.divider = "#30363d";
import_components.Styles.Theme.darkTheme.typography.fontSize = "16px";
import_components.Styles.Theme.darkTheme.shadows[1] = "0px 4px 4px rgba(0, 0, 0, 0.25)";
import_components.Styles.Theme.darkTheme.shadows[2] = "none";
import_components.Styles.Theme.darkTheme.shadows[3] = "0px 4px 4px #000000";
var colorVar = {
  primaryButton: "transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box",
  primaryGradient: "linear-gradient(255deg,#f15e61,#b52082)",
  darkBg: "#181E3E 0% 0% no-repeat padding-box",
  primaryDisabled: "transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box"
};
var index_css_default = import_components.Styles.style({
  $nest: {
    "::selection": {
      color: "#fff",
      background: "#1890ff"
    },
    ".btn-os": {
      background: colorVar.primaryButton,
      height: "auto !important",
      color: "#fff",
      transition: "background .3s ease",
      fontSize: "1rem"
    },
    ".btn-os:not(.disabled):hover, .btn-os:not(.disabled):focus": {
      background: colorVar.primaryGradient,
      backgroundColor: "transparent",
      boxShadow: "none",
      opacity: 0.9
    },
    ".btn-os:not(.disabled):focus": {
      boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)"
    },
    ".btn-os.disabled, .btn-os.is-spinning": {
      background: colorVar.primaryDisabled,
      opacity: 1
    },
    ".dark-bg, .dark-modal > div > div": {
      background: colorVar.darkBg,
      borderRadius: 5
    },
    ".btn-transparent, .btn-transparent:not(.disabled):focus, .btn-transparent:not(.disabled):hover": {
      background: "transparent",
      boxShadow: "none",
      backgroundColor: "transparent"
    },
    ".account-dropdown": {
      $nest: {
        "> i-button": {
          height: "auto",
          minWidth: "auto",
          padding: ".5rem .75rem",
          borderRight: "none",
          border: "none",
          backgroundColor: "transparent",
          lineHeight: "1.2rem"
        },
        ".modal": {
          background: "#252a48",
          border: `2px solid ${Theme.divider}`,
          padding: "10px",
          minWidth: 200,
          $nest: {
            "i-button": {
              background: "#EB7F00",
              border: "none",
              transition: "all .2s ease-out",
              borderRadius: 5
            }
          }
        },
        ".icon": {
          backgroundColor: "transparent",
          height: "auto",
          width: "auto",
          padding: ".5rem .75rem .5rem 0"
        },
        "i-icon": {
          height: 14,
          width: 14
        }
      }
    },
    ".mr-0-5": {
      marginRight: ".5rem"
    },
    ".ml-0-5": {
      marginLeft: ".5rem"
    },
    ".mb-0-5": {
      marginBottom: ".5rem"
    },
    ".text-success *": {
      color: Theme.colors.success.main
    },
    ".text-error *": {
      color: Theme.colors.error.main
    },
    ".hidden": {
      display: "none !important"
    },
    ".no-wrap": {
      whiteSpace: "nowrap"
    },
    ".py-1": {
      paddingTop: "1rem",
      paddingBottom: "1rem"
    },
    ".px-1": {
      paddingLeft: "1rem",
      paddingRight: "1rem"
    },
    ".align-middle": {
      alignItems: "center"
    },
    ".text-secondary *": {
      color: Theme.colors.secondary.dark
    },
    ".btn-default": {
      background: "#eaecef",
      height: "auto !important",
      transition: "background .3s ease",
      fontSize: "1rem",
      color: Theme.background.default
    },
    ".os-table": {
      boxSizing: "border-box",
      borderRadius: 10,
      backdropFilter: "blur(74px)",
      $nest: {
        ".i-table--empty": {
          color: Theme.text.primary,
          textAlign: "center"
        },
        ".i-table-pagi a": {
          fontSize: "1rem",
          border: "none",
          padding: "5px 12px",
          height: "auto !important",
          transition: "background .3s ease",
          fontFamily: Theme.typography.fontFamily
        },
        ".i-table-pagi .pagination-main": {
          marginRight: 8,
          marginLeft: 8
        },
        ".i-table-pagi .pagination-main > a": {
          background: "transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box",
          color: "#fff",
          backgroundColor: "transparent"
        },
        ".i-table-pagi > .pagination > a.paginate_button": {
          color: "#F5C958",
          background: "hsla(0,0%,100%,0.03) 0% 0% no-repeat padding-box",
          borderRadius: 4,
          fontWeight: 700
        }
      }
    },
    ".os-table table tbody tr": {
      fontSize: "1rem",
      $nest: {
        "td:first-child": {
          textAlign: "left"
        }
      }
    },
    ".os-table table thead, .os-table table tbody td": {
      background: "#182045"
    },
    ".os-table table thead th": {
      fontWeight: "bold",
      textTransform: "capitalize",
      padding: "1.5rem 1rem",
      $nest: {
        "&:first-child": {
          textAlign: "left"
        }
      }
    },
    ".os-table table .i-table-cell": {
      borderTop: `1px solid ${Theme.divider}`,
      borderRight: "none"
    },
    "i-link > a": {
      textDecoration: "none"
    },
    "i-link:hover *": {
      color: Theme.colors.secondary.dark
    },
    ".breadcrumb *+ i-label a:before": {
      padding: "4px",
      color: Theme.colors.primary.contrastText,
      content: '"/\\00a0"',
      cursor: "initial"
    },
    ".breadcrumb i-link.active": {
      pointerEvents: "none"
    }
  }
});
import_components.Styles.cssRule("body", {
  fontSize: "calc(0.75vmin + 0.35em)"
});
import_components.Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${import_assets.default.fullPath("fonts/raleway/Raleway-Black.ttf")}") format("truetype")`,
  fontWeight: "900",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${import_assets.default.fullPath("fonts/raleway/Raleway-Bold.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${import_assets.default.fullPath("fonts/raleway/Raleway-Regular.ttf")}") format("truetype")`,
  fontWeight: "400",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${import_assets.default.fullPath("fonts/raleway/Raleway-Italic.ttf")}") format("truetype")`,
  fontWeight: "normal",
  fontStyle: "italic"
});
import_components.Styles.fontFace({
  fontFamily: "Russo One",
  src: `url("${import_assets.default.fullPath("fonts/russo_one/RussoOne-Regular.ttf")}") format("truetype")`,
  fontWeight: "normal",
  fontStyle: "normal"
});

// src/main/result.tsx
var import_components3 = __toModule(require("@ijstech/components"));
var import_store = __toModule(require("@vesting/store"));
var import_global = __toModule(require("@vesting/global"));

// src/main/result.css.ts
var import_components2 = __toModule(require("@ijstech/components"));
var Theme2 = import_components2.Styles.Theme.ThemeVars;
var result_css_default = import_components2.Styles.style({
  textAlign: "center",
  $nest: {
    "i-label > *": {
      fontSize: ".875rem",
      wordBreak: "normal"
    },
    ".modal": {
      minWidth: "25%",
      maxWidth: 455
    },
    ".i-modal-close svg": {
      fill: Theme2.colors.primary.dark
    },
    ".i-modal_content": {
      padding: "0 2.563rem 3rem"
    },
    ".waiting-txt > *": {
      color: Theme2.colors.warning.light,
      fontSize: "1.125rem"
    },
    ".confirm-txt > *": {
      color: "#C2C3CB"
    },
    ".red-link *": {
      color: "#FD4A4C",
      textDecoration: "none"
    },
    ".mb": {
      marginBottom: "1.875rem"
    },
    "i-button": {
      padding: "1rem 2rem",
      textAlign: "center"
    },
    ".address-txt > *": {
      lineHeight: "1.5rem"
    },
    ".btn-submit": {
      padding: ".35rem 2.438rem",
      borderRadius: 5
    },
    ".btn-cancel": {
      padding: ".35rem 2.438rem",
      borderRadius: 5,
      background: "#2B304A 0% 0% no-repeat padding-box"
    }
  }
});

// src/main/result.tsx
var import_assets2 = __toModule(require("@vesting/assets"));
var Theme3 = import_components3.Styles.Theme.ThemeVars;
var Result = class extends import_components3.Module {
  get message() {
    return this._message;
  }
  set message(value) {
    this._message = value;
    this.renderUI();
  }
  constructor(parent, options) {
    super(parent, options);
  }
  async init() {
    this.classList.add(result_css_default);
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
      const chainId = await (0, import_store.getWallet)().getChainId();
      (0, import_store.viewOnExplorerByTxHash)(chainId, this.message.txtHash);
    }
  }
  async renderUI() {
    this.mainContent.clearInnerHTML();
    const mainSection = await import_components3.VStack.create({
      horizontalAlignment: "center"
    });
    if (this.message.status === "warning") {
      mainSection.id = "warningSection";
      const loading = /* @__PURE__ */ this.$render("i-panel", {
        height: 100
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "loadingElm",
        class: "i-loading-overlay",
        height: "100%",
        background: { color: "transparent" }
      }, /* @__PURE__ */ this.$render("i-vstack", {
        class: "i-loading-spinner",
        horizontalAlignment: "center",
        verticalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-icon", {
        class: "i-loading-spinner_icon",
        image: { url: import_assets2.default.fullPath("img/loading.svg"), width: 24, height: 24 }
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: "Loading...",
        font: { color: "#FD4A4C" },
        class: "i-loading-spinner_text"
      }))));
      mainSection.appendChild(loading);
      const section = await import_components3.Panel.create({
        margin: { bottom: 20 }
      }, mainSection);
      const label = await import_components3.Label.create({
        caption: "Waiting For Confirmation",
        margin: { bottom: "1rem" },
        font: { size: "1.125rem", color: Theme3.colors.warning.light }
      });
      section.appendChild(label);
      const label2 = await import_components3.Label.create({
        caption: this.message.content || "",
        margin: { bottom: "1rem" }
      });
      section.appendChild(label2);
      const label3 = await import_components3.Label.create({
        caption: "Confirm this transaction in your wallet",
        font: { color: "#C2C3CB" }
      });
      section.appendChild(label3);
      mainSection.appendChild(section);
    } else if (this.message.status === "success") {
      const chainId = await (0, import_store.getWallet)().getChainId();
      const explorerName = (0, import_store.getNetworkExplorerName)(chainId);
      const icon = await import_components3.Icon.create({
        name: "check-circle",
        height: 50,
        fill: Theme3.colors.primary.main,
        margin: { bottom: "1.875rem" }
      }, mainSection);
      icon.classList.add("inline-block");
      mainSection.appendChild(icon);
      const label = await import_components3.Label.create({
        caption: "Transaction Submitted",
        margin: { bottom: "1.875rem" },
        font: { size: "1.125rem", color: Theme3.colors.warning.light }
      }, mainSection);
      mainSection.appendChild(label);
      const contentSection = await import_components3.Panel.create({}, mainSection);
      contentSection.id = "contentSection";
      mainSection.appendChild(contentSection);
      const contentLabel = await import_components3.Label.create({
        caption: this.message.content || ""
      });
      contentSection.appendChild(contentLabel);
      if (this.message.txtHash) {
        const section = await import_components3.VStack.create({}, contentSection);
        const label1 = await import_components3.Label.create({
          caption: this.message.txtHash.substring(0, 33),
          margin: { bottom: "1rem" }
        }, section);
        section.appendChild(label1);
        const label2 = await import_components3.Label.create({
          caption: this.message.txtHash.substring(33, this.message.txtHash.length),
          margin: { bottom: "1rem" }
        }, section);
        section.appendChild(label2);
        const link = await import_components3.Label.create({
          caption: `View on ${explorerName}`,
          margin: { top: "1rem" }
        }, section);
        link.onClick = this.buildLink.bind(this);
        link.classList.add("red-link", "block");
        section.appendChild(link);
        contentSection.appendChild(section);
      }
      const button = await import_components3.Button.create({
        width: "100%",
        caption: "Close",
        margin: { top: "1rem" },
        background: { color: Theme3.colors.primary.main }
      }, mainSection);
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    } else {
      const icon = await import_components3.Icon.create({
        name: "exclamation-triangle",
        height: 50,
        fill: Theme3.colors.primary.main,
        margin: { bottom: "1.875rem" }
      }, mainSection);
      icon.classList.add("inline-block");
      mainSection.appendChild(icon);
      const label = await import_components3.Label.create({
        caption: "Transaction Rejected.",
        margin: { bottom: "1.875rem" },
        font: { size: "1.125rem", color: Theme3.colors.warning.light }
      }, mainSection);
      mainSection.appendChild(label);
      const section = await import_components3.VStack.create({}, mainSection);
      section.id = "contentSection";
      const caption = await this.onErrMsgChanged();
      const contentLabel = await import_components3.Label.create({
        caption,
        margin: { bottom: "1rem" }
      }, section);
      section.appendChild(contentLabel);
      mainSection.appendChild(section);
      const button = await import_components3.Button.create({
        width: "100%",
        caption: "Cancel",
        margin: { top: "1rem" },
        background: { color: Theme3.colors.primary.main }
      }, mainSection);
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    }
    this.mainContent.clearInnerHTML();
    this.mainContent.appendChild(mainSection);
  }
  async onErrMsgChanged() {
    if (this.message.status !== "error")
      return this.message.content;
    if (this.message.content.message && this.message.content.message.includes("Internal JSON-RPC error.")) {
      this.message.content.message = JSON.parse(this.message.content.message.replace("Internal JSON-RPC error.\n", "")).message;
    }
    return await (0, import_global.parseContractError)(this.message.content.message, this.message.obj);
  }
  render() {
    return /* @__PURE__ */ this.$render("i-modal", {
      id: "confirmModal",
      closeIcon: { name: "times" },
      class: "dark-modal confirm-modal"
    }, /* @__PURE__ */ this.$render("i-panel", {
      id: "mainContent",
      class: "i-modal_content"
    }));
  }
};
Result = __decorateClass([
  (0, import_components3.customElements)("portal-result")
], Result);

// src/main/index.tsx
var import_global3 = __toModule(require("@vesting/global"));

// src/main/confirm.tsx
var import_components5 = __toModule(require("@ijstech/components"));
var import_assets3 = __toModule(require("@vesting/assets"));

// src/main/confirm.css.ts
var import_components4 = __toModule(require("@ijstech/components"));
var Theme4 = import_components4.Styles.Theme.ThemeVars;
var confirm_css_default = import_components4.Styles.style({
  textAlign: "center",
  $nest: {
    ".modal": {
      minWidth: "25%",
      maxWidth: "550px"
    },
    ".i-modal-close svg": {
      fill: Theme4.colors.primary.dark
    },
    ".i-modal_content": {
      padding: "0 1rem 1.5rem",
      lineHeight: "1.5rem"
    },
    "i-button": {
      textAlign: "center"
    },
    ".btn": {
      padding: ".3em 1em",
      fontSize: "14px"
    },
    ".btn-cancel": {
      background: "#2B304A 0% 0% no-repeat padding-box"
    }
  }
});

// src/main/confirm.tsx
var ConfirmModal = class extends import_components5.Module {
  get message() {
    return this._message;
  }
  set message(value) {
    this._message = value;
    this.renderUI();
  }
  constructor(parent, options) {
    super(parent, options);
  }
  async init() {
    this.classList.add(confirm_css_default);
    super.init();
  }
  closeModal() {
    this.confirmModal.visible = false;
  }
  showModal() {
    this.confirmModal.visible = true;
  }
  async renderUI() {
    this.mainContent.innerHTML = "";
    const mainSection = new import_components5.Panel();
    if (this.message.status === "warning") {
      mainSection.id = "warningSection";
      mainSection.padding = { top: 10, bottom: 10, left: 0, right: 0 };
      const section = new import_components5.HStack(this, {
        gap: "10px"
      });
      section.verticalAlignment = "center";
      const image = new import_components5.Image(mainSection, {
        width: "50px",
        height: "50px",
        url: import_assets3.default.fullPath("img/warning.svg")
      });
      image.classList.add("inline-block");
      image.classList.add("mb");
      section.appendChild(image);
      if (this.message.content) {
        const label = new import_components5.Label(section, {
          caption: this.message.content,
          font: { size: "14px" }
        });
        section.appendChild(label);
      }
      mainSection.appendChild(section);
    }
    this.mainContent.appendChild(mainSection);
    if (this.message.actions && this.message.actions.length) {
      const actionSection = new import_components5.HStack(this.mainContent, {
        gap: "10px"
      });
      actionSection.margin = { top: "3rem" };
      actionSection.horizontalAlignment = "end";
      actionSection.verticalAlignment = "center";
      this.message.actions.forEach((item) => {
        const button = new import_components5.Button(actionSection, {
          caption: item.caption,
          height: "auto"
        });
        button.classList.add("btn");
        item.className && button.classList.add(item.className);
        button.onClick = item.action || this.closeModal.bind(this);
        actionSection.appendChild(button);
      });
      this.mainContent.appendChild(actionSection);
    }
  }
  render() {
    return /* @__PURE__ */ this.$render("i-modal", {
      id: "confirmModal",
      class: "dark-modal confirm-modal",
      closeIcon: { name: "times" }
    }, /* @__PURE__ */ this.$render("i-vstack", {
      id: "mainContent",
      class: "i-modal_content"
    }));
  }
};
ConfirmModal = __decorateClass([
  (0, import_components5.customElements)("portal-confirm-modal")
], ConfirmModal);

// src/main/index.tsx
var import_store3 = __toModule(require("@vesting/store"));

// src/main/nav.tsx
var import_components7 = __toModule(require("@ijstech/components"));
var import_eth_wallet = __toModule(require("@ijstech/eth-wallet"));
var import_global2 = __toModule(require("@vesting/global"));
var import_store2 = __toModule(require("@vesting/store"));

// src/main/nav.css.ts
var import_components6 = __toModule(require("@ijstech/components"));
var Theme5 = import_components6.Styles.Theme.ThemeVars;
var nav_css_default = import_components6.Styles.style({
  background: Theme5.background.paper,
  $nest: {
    "::-webkit-scrollbar-track": {
      borderRadius: "12px",
      border: "1px solid transparent",
      backgroundColor: "unset"
    },
    "::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "unset"
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.2) 0% 0% no-repeat padding-box"
    },
    ".nav": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    ".desktop-wrap": {
      flexWrap: "nowrap"
    },
    ".os-menu": {
      display: "block",
      $nest: {
        ".heading": {
          textTransform: "capitalize",
          fontSize: "1rem",
          lineHeight: "1rem",
          fontWeight: 400,
          whiteSpace: "nowrap",
          color: Theme5.text.primary,
          maxHeight: 80,
          width: "100%",
          padding: ".75rem 1rem"
        },
        "> nav > div > i-menu-item > .desktop .title .heading": {
          borderRadius: "5px",
          padding: ".625rem 1.5rem"
        },
        ".show-dropdown > .link > .title .heading": {
          background: "#FF9515",
          color: Theme5.text.primary
        },
        "i-menu-item.menu-active > .desktop .title > .heading": {
          background: "#FF9515",
          color: Theme5.text.primary
        },
        "i-menu-item .title:hover > .heading": {
          background: "#FF9515",
          color: Theme5.text.primary
        },
        "i-menu-item > .desktop.dropdown > .link": {
          textOverflow: "ellipsis",
          borderBottom: "none",
          display: "block",
          width: "100%",
          padding: "0"
        },
        "i-menu-item > .desktop > button.link": {
          width: "100%"
        },
        "i-menu-item > .desktop.dropdown > .link .title": {
          paddingLeft: 0,
          height: "100%"
        },
        "i-menu-item > i-menu > .dropdown": {
          background: "#252a48",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)"
        },
        "i-menu-item": {
          transformOrigin: "0 0",
          width: "100%"
        },
        "i-menu-item .title .heading": {
          transition: "color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)"
        },
        "i-menu > .desktop.dropdown": {
          width: "auto",
          minWidth: 160,
          paddingTop: ".25rem",
          paddingBottom: ".25rem",
          transition: "border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)"
        },
        "> nav > div > i-menu-item i-menu i-menu-item i-menu": {
          position: "absolute",
          left: "100%",
          top: 0,
          paddingLeft: "5px",
          $nest: {
            ".desktop.dropdown": {
              position: "relative"
            }
          }
        }
      }
    },
    ".os-mobile": {
      backgroundColor: "#252a48",
      position: "absolute",
      left: -999,
      top: "100%",
      transition: "all .3s ease-out",
      minWidth: "290px",
      zIndex: "9999",
      $nest: {
        "&.show-menu": {
          left: 0,
          transition: "all .5s ease-in"
        },
        "i-menu-item": {
          color: Theme5.colors.primary.main,
          whiteSpace: "nowrap",
          width: "100%",
          $nest: {
            "> .desktop": {
              padding: ".75rem 1rem",
              borderLeft: `2px solid transparent`,
              transition: "all .2s ease-out"
            },
            ".show-dropdown .dir-icon": {
              transform: "rotate(90deg)"
            }
          }
        },
        "i-menu-item.menu-active > .desktop": {
          borderLeft: `2px solid ${Theme5.colors.primary.main}`,
          background: "#464b65"
        },
        "i-menu-item:hover > .desktop": {
          background: "#303552"
        },
        ".heading, .heading i-label *": {
          fontWeight: "normal",
          fontSize: "1rem",
          color: Theme5.colors.primary.main
        },
        "> nav > div > i-menu-item .title .heading": {
          width: "100%",
          $nest: {
            "*": {
              fontWeight: 400,
              fontSize: 20
            },
            "i-slot": {
              width: "100%"
            }
          }
        },
        "> nav > div > i-menu-item.menu-active .title .heading *": {
          fontWeight: 700
        }
      }
    },
    ".btn-hamburger": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      $nest: {
        "&:not(.disabled):hover": {
          backgroundColor: "transparent",
          background: "transparent",
          boxShadow: "none"
        }
      }
    },
    "i-menu.i-menu--horizontal > .desktop > .align": {
      alignItems: "stretch !important",
      gridGap: "5px !important"
    },
    ".ml-0-5": {
      marginLeft: ".5rem"
    },
    ".ml-0-7-5": {
      marginLeft: ".75rem"
    },
    ".mr-1-2-5": {
      marginRight: "1.25rem"
    },
    ".left-container": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      maxWidth: "calc(100% - 640px)"
    },
    ".right-container": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    ".dir-icon": {
      transition: "transform .24s"
    },
    ".menu-icon": {
      display: "inline-block"
    },
    ".btn": {
      height: "auto !important",
      cursor: "pointer",
      fontWeight: 600,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      backgroundColor: "transparent",
      $nest: {
        "&:hover": {
          transition: "all .2s ease-out"
        }
      }
    },
    ".btn-network": {
      padding: "6px 12px",
      backgroundColor: "#101026",
      border: "1px solid #101026",
      color: Theme5.text.primary,
      borderRadius: 6,
      fontWeight: 400,
      $nest: {
        "&:hover": {
          backgroundColor: "#101026",
          border: "1px solid #101026"
        }
      }
    },
    ".btn-connect": {
      padding: ".375rem .5rem",
      background: "#EB7F00",
      border: "none",
      transition: "all .2s ease-out",
      $nest: {
        "&:hover": {
          opacity: ".9",
          transition: "all .2s ease-out"
        }
      }
    },
    ".my-wallet": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#192046",
      borderRadius: 6,
      height: 36,
      textAlign: "center",
      padding: "6px 10px",
      position: "relative"
    },
    ".address-info": {
      display: "flex",
      gap: ".5rem",
      lineHeight: "30px",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: ".25rem"
    },
    ".os-modal": {
      borderRadius: 20,
      boxSizing: "border-box",
      fontSize: ".875rem",
      fontWeight: 400,
      $nest: {
        "i-icon": {
          display: "inline-block"
        },
        ".mr-2-5": {
          marginRight: "2.5rem"
        },
        "&.connect-modal > div > div": {
          width: 440,
          height: "auto"
        },
        "&.connect-modal .i-modal_content": {
          padding: "0 1.5rem"
        },
        "&.account-modal .i-modal_content": {
          padding: "1.75rem 2.75rem 1rem"
        },
        "&.account-modal > div > div": {
          height: "auto",
          minHeight: 200,
          width: 440
        },
        "> div > div": {
          backgroundColor: "#252a48",
          height: "calc(100% - 200px)",
          borderRadius: 15,
          lineHeight: 1.5,
          wordWrap: "break-word",
          padding: 0,
          minHeight: 400,
          width: 360
        },
        ".i-modal_content": {
          padding: "0 1.25rem"
        },
        ".i-modal_header": {
          color: Theme5.colors.secondary.main,
          borderRadius: "20px 20px 0 0",
          background: "unset",
          padding: "16px 24px",
          fontWeight: 500,
          fontSize: "1rem"
        },
        ".list-view": {
          $nest: {
            ".list-item:hover": {
              $nest: {
                "> *": {
                  opacity: 1
                }
              }
            },
            ".list-item:not(:first-child)": {
              marginTop: ".5rem"
            },
            ".list-item": {
              backgroundColor: Theme5.background.default,
              position: "relative",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              transition: "all .3s ease-in",
              overflow: "unset",
              $nest: {
                "&.disabled-network-selection": {
                  cursor: "default",
                  $nest: {
                    "&:hover > *": {
                      opacity: "0.5 !important"
                    }
                  }
                },
                "> *": {
                  opacity: 0.5
                }
              }
            },
            ".list-item i-image": {
              height: "auto"
            },
            ".list-item.is-actived": {
              $nest: {
                "> *": {
                  opacity: 1
                },
                "&:after": {
                  content: "''",
                  top: "50%",
                  left: 9,
                  position: "absolute",
                  background: "#20bf55",
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  transform: "translate3d(-50%,-50%,0)"
                },
                ".custom-label": {
                  paddingLeft: ".75rem"
                }
              }
            }
          }
        },
        ".networks": {
          color: "#f05e61",
          marginTop: "1.5rem",
          height: "calc(100% - 160px)",
          overflowY: "auto",
          width: "100% !important",
          $nest: {
            ".list-item": {
              padding: ".65rem .5rem"
            }
          }
        },
        ".wallets": {
          marginTop: ".5rem",
          $nest: {
            ".list-item": {
              padding: ".5rem",
              position: "relative",
              justifyContent: "space-between"
            },
            ".list-item .image-container": {
              order: 2
            }
          }
        },
        ".small-label > *": {
          fontSize: ".875rem"
        },
        ".large-label > *": {
          fontSize: "1.25rem",
          lineHeight: 1.5
        },
        ".wallet-learn": {
          padding: "1.5rem 0"
        },
        ".learn-more a": {
          color: "#f15e61",
          textDecoration: "none"
        },
        ".custom-link *": {
          color: Theme5.text.primary
        },
        ".custom-link a": {
          display: "inline-flex",
          alignItems: "center"
        }
      }
    }
  }
});

// src/main/nav.tsx
var import_assets4 = __toModule(require("@vesting/assets"));
var Theme6 = import_components7.Styles.Theme.ThemeVars;
var href = "";
var Nav = class extends import_components7.Module {
  constructor(parent, options) {
    super(parent, options);
    this.walletInfo = {
      address: "",
      balance: "",
      networkId: 0
    };
    this.updateConnectedStatus = (value) => {
      if (value) {
        this.renderNetworkButton();
        if (this.walletContainer.contains(this.walletBalanceElm)) {
          this.walletContainer.removeChild(this.walletBalanceElm);
        }
        const balanceLabel = this.walletBalanceElm.firstChild;
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
      } else {
        if (this.walletContainer.contains(this.walletBalanceElm)) {
          this.walletContainer.removeChild(this.walletBalanceElm);
        }
        if (this.walletDetailPanel.contains(this.walletDetailButton)) {
          this.walletDetailPanel.removeChild(this.walletDetailButton);
        }
        this.walletContainer.append(this.walletConnectButton);
      }
    };
    this.logout = async () => {
      await (0, import_store2.logoutWallet)();
      this.updateConnectedStatus(false);
      this.updateList(false);
    };
    this.openConnectModal = () => {
      this.showModal("connectModal", "Connect wallet");
    };
    this.backToLanding = () => {
      this.desktopMenu.setActiveItem(false);
      window.location.assign("#/");
    };
    this.$eventBus = import_components7.application.EventBus;
    this.registerEvent();
  }
  get shortlyAddress() {
    const address = this.walletInfo.address;
    if (!address)
      return "No address selected";
    return address.substr(0, 6) + "..." + address.substr(-4);
  }
  registerEvent() {
    this.$eventBus.register(this, import_global2.EventId.ConnectWallet, this.openConnectModal);
    this.$eventBus.register(this, import_global2.EventId.IsWalletConnected, async (connected) => {
      if (connected) {
        this.walletInfo.address = import_eth_wallet.Wallet.getInstance().account.address;
        this.walletInfo.balance = (0, import_global2.formatNumber)((await import_eth_wallet.Wallet.getInstance().balance).toFixed(), 2);
      }
      this.selectedNetwork = (0, import_store2.getNetworkInfo)(import_eth_wallet.Wallet.getInstance().chainId);
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    });
    this.$eventBus.register(this, import_global2.EventId.IsWalletDisconnected, async (connected) => {
      this.selectedNetwork = (0, import_store2.getNetworkInfo)(import_eth_wallet.Wallet.getInstance().chainId);
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    });
    this.$eventBus.register(this, import_global2.EventId.chainChanged, async (chainId) => {
      this.selectedNetwork = (0, import_store2.getNetworkInfo)(chainId);
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.walletInfo.balance = (0, import_global2.formatNumber)((await import_eth_wallet.Wallet.getInstance().balance).toFixed(), 2);
      this.updateConnectedStatus(true);
      this.updateList(true);
    });
  }
  async requestAccounts() {
    try {
      await this.wallet.web3.eth.requestAccounts();
    } catch (error) {
      console.error(error);
    }
  }
  async initData() {
    let accountsChangedEventHandler = async (account) => {
      (0, import_store2.setTokenMap)();
    };
    let chainChangedEventHandler = async (hexChainId) => {
      this.updateConnectedStatus(true);
      (0, import_store2.setTokenMap)();
    };
    const selectedProvider = localStorage.getItem("walletProvider");
    const isValidProvider = Object.values(import_eth_wallet.WalletPlugin).includes(selectedProvider);
    if ((0, import_store2.hasWallet)() && isValidProvider) {
      this.wallet = await (0, import_store2.connectWallet)(selectedProvider, {
        "accountsChanged": accountsChangedEventHandler,
        "chainChanged": chainChangedEventHandler
      });
    }
  }
  _getMenuData(list, mode, validMenuItemsFn) {
    const menuItems = [];
    list.filter(validMenuItemsFn).forEach((item, key) => {
      const linkTarget = item.isToExternal ? "_blank" : "_self";
      const _menuItem = {
        title: item.text,
        link: { href: item.to, target: linkTarget }
      };
      if (mode === "mobile" && item.img) {
        _menuItem.icon = { width: 24, height: 24, image: { width: 24, height: 24, url: import_assets4.default.fullPath(item.img) } };
      }
      if (item.subItems && item.subItems.length) {
        _menuItem.items = this._getMenuData(item.subItems, mode, validMenuItemsFn);
      }
      menuItems.push(_menuItem);
    });
    return menuItems;
  }
  getMenuData(list, mode) {
    var _a;
    let chainId = ((_a = this.selectedNetwork) == null ? void 0 : _a.chainId) || import_eth_wallet.Wallet.getInstance().chainId;
    let validMenuItemsFn;
    if (chainId) {
      validMenuItemsFn = (item) => !item.isDisabled && (!item.supportedChainIds || item.supportedChainIds.includes(chainId)) && (!item.env || item.env.some((v) => v === siteEnv));
    } else {
      validMenuItemsFn = (item) => !item.isDisabled && (!item.env || item.env.some((v) => v === siteEnv));
    }
    return this._getMenuData(list, mode, validMenuItemsFn);
  }
  renderMobileMenu() {
    const data = this.getMenuData(this._menuItems, "mobile");
    this.mobileMenu.data = data;
  }
  renderDesktopMenu() {
    const data = this.getMenuData(this._menuItems, "desktop");
    this.desktopMenu.data = data;
  }
  toggleMenu() {
    if (!this.enabled) {
      this.mobileMenu.classList.remove("show-menu");
      return;
    }
    const shownMenu = this.mobileMenu.classList.contains("show-menu");
    shownMenu ? this.mobileMenu.classList.remove("show-menu") : this.mobileMenu.classList.add("show-menu");
  }
  showModal(name, title = "") {
    const modalELm = this[name];
    title && (modalELm.title = title);
    modalELm.visible = true;
  }
  isLive(walletPlugin) {
    var _a;
    const provider = walletPlugin.toLowerCase();
    return import_eth_wallet.Wallet.isInstalled(walletPlugin) && ((_a = import_eth_wallet.Wallet.getInstance().clientSideProvider) == null ? void 0 : _a.walletPlugin) === provider;
  }
  isNetworkLive(chainId) {
    return import_eth_wallet.Wallet.getInstance().chainId === chainId;
  }
  async switchNetwork(chainId) {
    if (!chainId)
      return;
    await (0, import_store2.switchNetwork)(chainId);
    this.switchModal.visible = false;
  }
  openLink(link) {
    return window.open(link, "_blank");
  }
  async connectToProviderFunc(walletPlugin) {
    if (import_eth_wallet.Wallet.isInstalled(walletPlugin)) {
      await (0, import_store2.connectWallet)(walletPlugin);
    } else {
      let config = import_eth_wallet.WalletPluginConfig[walletPlugin];
      let homepage = (config == null ? void 0 : config.homepage) ? config.homepage() : "";
      this.openLink(homepage);
    }
    this.connectModal.visible = false;
  }
  getSymbol() {
    var _a;
    let symbol = "";
    if (((_a = this.selectedNetwork) == null ? void 0 : _a.chainId) && import_store2.ChainNativeTokenByChainId[this.selectedNetwork.chainId]) {
      symbol = import_store2.ChainNativeTokenByChainId[this.selectedNetwork.chainId].symbol;
    }
    return symbol;
  }
  async renderWalletBalance() {
    this.walletBalanceElm = new import_components7.Panel();
    this.walletBalanceElm.classList.add("my-wallet");
    const balanceLabel = await import_components7.Label.create();
    balanceLabel.caption = this.walletInfo.balance;
    this.walletBalanceElm.appendChild(balanceLabel);
    this.lbTokenSymbol = await import_components7.Label.create();
    this.lbTokenSymbol.id = "lbTokenSymbol";
    this.lbTokenSymbol.caption = this.getSymbol();
    this.lbTokenSymbol.style.marginLeft = "5px";
    this.walletBalanceElm.appendChild(this.lbTokenSymbol);
  }
  async renderWalletButton() {
    this.walletDetailButton = await import_components7.Button.create({
      caption: this.shortlyAddress,
      padding: { top: "0.5rem", bottom: "0.5rem", left: "0.75rem", right: "0.75rem" },
      margin: { left: 10 }
    });
    const modalElm = await import_components7.Modal.create({
      maxWidth: "200px",
      showBackdrop: false,
      height: "auto",
      popupPlacement: "bottomRight"
    });
    modalElm.classList.add("account-dropdown");
    const vstack = await import_components7.VStack.create({
      gap: "15px"
    });
    const itemCaptions = ["Account", "Switch wallet", "Logout"];
    const itemFunctions = [
      () => this.showModal("accountModal"),
      () => this.showModal("connectModal", "Switch wallet"),
      this.logout
    ];
    itemCaptions.forEach(async (caption, i) => {
      const buttonItem = await import_components7.Button.create({
        caption,
        width: "100%",
        height: "auto",
        padding: { top: "0.5rem", bottom: "0.5rem", left: "0.75rem", right: "0.75rem" }
      });
      buttonItem.onClick = (source, event) => {
        event.stopPropagation();
        modalElm.visible = false;
        itemFunctions[i]();
        return true;
      };
      vstack.appendChild(buttonItem);
      modalElm.item = vstack;
    });
    this.walletDetailPanel.appendChild(modalElm);
    this.walletDetailButton.classList.add("btn-os");
    this.walletDetailButton.onClick = () => modalElm.visible = !modalElm.visible;
    this.walletConnectButton = await import_components7.Button.create();
    this.walletConnectButton.caption = "Connect Wallet";
    this.walletConnectButton.classList.add("btn", "btn-os", "btn-connect", "ml-0-5");
    this.walletConnectButton.onClick = this.openConnectModal;
    this.walletContainer.append(this.walletConnectButton);
  }
  async renderNetworkButton() {
    var _a, _b;
    const hStack = await import_components7.HStack.create();
    hStack.verticalAlignment = "center";
    if ((_a = this.selectedNetwork) == null ? void 0 : _a.img) {
      const image = await import_components7.Image.create();
      image.url = import_assets4.default.fullPath(this.selectedNetwork.img);
      image.width = 26;
      image.classList.add("inline-block");
      hStack.appendChild(image);
    }
    const label = await import_components7.Label.create();
    label.caption = ((_b = this.selectedNetwork) == null ? void 0 : _b.name) || "Unsupported Network";
    label.classList.add("ml-0-5");
    hStack.appendChild(label);
    this.networkButton = await import_components7.Button.create();
    this.networkButton.classList.add("btn", "btn-network", "mr-1");
    this.networkButton.onClick = () => this.showModal("switchModal");
    this.networkButton.appendChild(hStack);
    this.networkButtonContainer.clearInnerHTML();
    this.networkButtonContainer.appendChild(this.networkButton);
  }
  renderNetworks() {
    this.networkGroup.clearInnerHTML();
    let networkList = (0, import_store2.getNetworkList)();
    this.networkGroup.append(...networkList.map((network) => {
      return /* @__PURE__ */ this.$render("i-hstack", {
        onClick: () => this.switchNetwork(network.chainId),
        class: this.isNetworkLive(network.chainId) ? "is-actived list-item" : "list-item",
        "data-key": network.chainId,
        verticalAlignment: "center",
        gap: 10
      }, /* @__PURE__ */ this.$render("i-image", {
        url: import_assets4.default.fullPath(network.img),
        width: 34,
        class: "ml-0-7-5 inline-block"
      }), /* @__PURE__ */ this.$render("i-label", {
        class: "custom-label",
        caption: network.name
      }));
    }));
  }
  renderWalletList() {
    this.walletListElm.clearInnerHTML();
    const list = import_store2.walletList.map((wallet) => {
      return /* @__PURE__ */ this.$render("i-hstack", {
        onClick: () => this.connectToProviderFunc(wallet.name),
        class: this.isLive(wallet.name) ? "is-actived list-item" : "list-item",
        "data-key": wallet.name,
        verticalAlignment: "center",
        gap: 10
      }, /* @__PURE__ */ this.$render("i-label", {
        class: "custom-label",
        caption: wallet.displayName
      }), /* @__PURE__ */ this.$render("i-image", {
        url: import_assets4.default.fullPath(`img/wallet/${wallet.iconFile}`),
        width: 34,
        class: "inline-block"
      }));
    });
    this.walletListElm.append(...list);
  }
  updateDot(parent, connected, type) {
    var _a;
    const acivedElm = parent.querySelector(".is-actived");
    acivedElm && acivedElm.classList.remove("is-actived");
    if (connected) {
      const wallet = import_eth_wallet.Wallet.getInstance();
      const connectingVal = type === "network" ? wallet.chainId : (_a = wallet.clientSideProvider) == null ? void 0 : _a.walletPlugin;
      const connectingElm = parent.querySelector(`[data-key="${connectingVal}"]`);
      connectingElm && connectingElm.classList.add("is-actived");
    }
  }
  updateList(connected) {
    this.updateDot(this.walletListElm, connected, "wallet");
    this.updateDot(this.networkGroup, connected, "network");
  }
  controlMenuDisplay() {
    if (window.innerWidth < 760) {
      this.mobileMenuStack.visible = true;
      this.desktopMenuStack.visible = false;
    } else {
      this.mobileMenuStack.visible = false;
      this.desktopMenuStack.visible = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", (e) => {
      this.controlMenuDisplay();
    });
  }
  getElementProperty(name) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }
    return value;
  }
  async init() {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.mobileMenu || !this.hamburger)
        return;
      if (!this.mobileMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.mobileMenu.classList.remove("show-menu");
      }
    });
    this.classList.add(nav_css_default);
    this.selectedNetwork = (0, import_store2.getNetworkInfo)((0, import_store2.getDefaultChainId)());
    super.init();
    this._menuItems = this.getElementProperty("menuItems");
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
    this.copyIcon.onClick = () => import_components7.application.copyToClipboard(this.walletInfo.address || "");
  }
  async render() {
    return /* @__PURE__ */ this.$render("i-hstack", {
      class: "nav",
      width: "100%",
      padding: { top: "0.9375rem", bottom: "0.625rem", left: "1rem", right: "1rem" }
    }, /* @__PURE__ */ this.$render("i-hstack", {
      stack: { grow: "1" },
      horizontalAlignment: "space-between",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "mobileMenuStack",
      class: "mobile",
      verticalAlignment: "center",
      visible: false
    }, /* @__PURE__ */ this.$render("i-button", {
      id: "hamburger",
      onClick: this.toggleMenu,
      class: "btn-hamburger mr-1"
    }, /* @__PURE__ */ this.$render("i-image", {
      url: import_assets4.default.fullPath("img/menu-24.png"),
      width: "20px",
      height: "20px",
      class: "inline-block"
    })), /* @__PURE__ */ this.$render("i-menu", {
      id: "mobileMenu",
      mode: "vertical",
      class: "os-mobile"
    }), /* @__PURE__ */ this.$render("i-image", {
      url: import_assets4.default.icons.logoMobile,
      onClick: this.backToLanding,
      class: "mobile-logo pointer"
    })), /* @__PURE__ */ this.$render("i-hstack", {
      id: "desktopMenuStack",
      class: "desktop-wrap",
      verticalAlignment: "center",
      maxWidth: "calc(100% - 640px)"
    }, /* @__PURE__ */ this.$render("i-image", {
      stack: { shrink: "0" },
      width: 200,
      url: import_assets4.default.icons.logo,
      onClick: this.backToLanding,
      class: "ml-0-5 mr-1-2-5 desktop-logo pointer"
    }), /* @__PURE__ */ this.$render("i-menu", {
      id: "desktopMenu",
      width: "100%",
      border: { left: { color: "#192046", width: "1px", style: "solid" } }
    })), /* @__PURE__ */ this.$render("i-hstack", {
      id: "walletContainer",
      horizontalAlignment: "end",
      verticalAlignment: "center",
      border: { left: { color: "#192046", width: "1px", style: "solid" } }
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "networkButtonContainer",
      padding: { left: "1rem" }
    }), /* @__PURE__ */ this.$render("i-panel", {
      id: "walletDetailPanel"
    }))), /* @__PURE__ */ this.$render("i-modal", {
      id: "switchModal",
      title: "Supported Network",
      class: "os-modal",
      closeIcon: { name: "times" }
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-label", {
      font: { size: ".875rem" },
      caption: "We supports the following networks, please click to connect."
    }), /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "networkGroup",
      class: "list-view networks",
      columnsPerRow: 1,
      templateRows: ["max-content"]
    }))), /* @__PURE__ */ this.$render("i-modal", {
      id: "connectModal",
      title: "Connect Wallet",
      class: "os-modal connect-modal",
      closeIcon: { name: "times" }
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-label", {
      class: "mt-1 small-label",
      caption: "Recommended wallet for Chrome"
    }), /* @__PURE__ */ this.$render("i-panel", null, /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "walletListElm",
      class: "list-view wallets",
      padding: { bottom: 30 },
      columnsPerRow: 1,
      templateRows: ["max-content"]
    })))), /* @__PURE__ */ this.$render("i-modal", {
      id: "accountModal",
      title: "Account",
      class: "os-modal account-modal",
      closeIcon: { name: "times" }
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      horizontalAlignment: "space-between"
    }, /* @__PURE__ */ this.$render("i-label", {
      class: "small-label",
      caption: "Connected with"
    }), /* @__PURE__ */ this.$render("i-button", {
      caption: "Logout",
      class: "btn btn-connect",
      onClick: this.logout
    })), /* @__PURE__ */ this.$render("i-label", {
      caption: this.walletShortlyAddress,
      class: "large-label bold"
    }), /* @__PURE__ */ this.$render("i-hstack", {
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-icon", {
      id: "copyIcon",
      name: "copy",
      width: "16px",
      height: "16px",
      fill: Theme6.text.primary,
      tooltip: { content: `The address has been copied`, trigger: "click" },
      class: "inline-flex pointer address-info"
    }), /* @__PURE__ */ this.$render("i-label", {
      caption: "Copy Address",
      class: "mr-2-5 ml-0-5 bold small-label"
    }), /* @__PURE__ */ this.$render("i-label", {
      link: { href },
      class: "custom-link"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-icon", {
      name: "external-link-alt",
      width: "16",
      height: "16",
      fill: Theme6.text.primary,
      class: "inline-block"
    }), /* @__PURE__ */ this.$render("i-label", {
      caption: "View on Etherscan",
      class: "small-label bold ml-0-5"
    })))))));
  }
};
__decorateClass([
  (0, import_components7.observable)()
], Nav.prototype, "walletShortlyAddress", 2);
__decorateClass([
  (0, import_components7.observable)()
], Nav.prototype, "walletInfo", 2);
Nav = __decorateClass([
  (0, import_components7.customElements)("portal-main-nav")
], Nav);

// src/main/footer.tsx
var import_components8 = __toModule(require("@ijstech/components"));
var import_assets5 = __toModule(require("@vesting/assets"));
var Footer = class extends import_components8.Module {
  constructor(parent, options) {
    super(parent, options);
  }
  getElementProperty(name) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }
    return value;
  }
  controlPageStackDisplay() {
    if (window.innerWidth < 564) {
      this.pagesStack.visible = false;
    } else {
      this.pagesStack.visible = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", (e) => {
      this.controlPageStackDisplay();
    });
  }
  async init() {
    super.init();
    this._params = this.getElementProperty("params") || {};
    let secureComputeInfo = this._params.secureComputeInfo;
    this.secureComputeStack.append(/* @__PURE__ */ this.$render("i-label", {
      link: { href: secureComputeInfo.link }
    }, /* @__PURE__ */ this.$render("i-image", {
      width: 40,
      height: 40,
      url: import_assets5.default.fullPath(secureComputeInfo.img)
    })));
    let socialMediaInfoList = this._params.socialMediaInfo;
    for (let info of socialMediaInfoList) {
      this.socialMediaStack.append(/* @__PURE__ */ this.$render("i-label", {
        link: { href: info.link }
      }, /* @__PURE__ */ this.$render("i-image", {
        url: import_assets5.default.fullPath(info.img),
        width: "24px"
      })));
    }
    let footerPagesInfoList = this._params.footerPagesInfo;
    for (let info of footerPagesInfoList) {
      this.pagesStack.append(/* @__PURE__ */ this.$render("i-label", {
        font: { color: "#fff" },
        link: { href: info.link, target: "_self" }
      }, /* @__PURE__ */ this.$render("i-label", {
        caption: info.caption
      })));
    }
    let projectInfoList = this._params.projectInfo;
    for (let info of projectInfoList) {
      let item;
      if (info.link) {
        item = /* @__PURE__ */ this.$render("i-label", {
          font: { color: "#fff" },
          link: { href: info.link }
        }, /* @__PURE__ */ this.$render("i-label", {
          caption: info.caption
        }));
      } else {
        item = /* @__PURE__ */ this.$render("i-label", {
          font: { color: "#fff" },
          caption: info.caption
        });
      }
      this.infoStack.append(item);
    }
    this.controlPageStackDisplay();
  }
  render() {
    return /* @__PURE__ */ this.$render("i-vstack", {
      wrap: "nowrap",
      width: "100%",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      width: "100%",
      gap: "0.8rem",
      horizontalAlignment: "space-between",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "secureComputeStack",
      verticalAlignment: "center"
    }), /* @__PURE__ */ this.$render("i-hstack", {
      gap: "2rem",
      id: "pagesStack"
    })), /* @__PURE__ */ this.$render("i-hstack", {
      id: "socialMediaStack",
      gap: "1rem",
      horizontalAlignment: "end",
      verticalAlignment: "center",
      margin: { top: "0.5rem", bottom: "0.5rem" },
      border: { bottom: { color: "#fff", width: "2px", style: "solid" } },
      padding: { bottom: "2rem" }
    }), /* @__PURE__ */ this.$render("i-hstack", {
      id: "infoStack",
      width: "100%",
      gap: "0.8rem",
      horizontalAlignment: "space-between",
      verticalAlignment: "center",
      margin: { top: 16 }
    }));
  }
};
Footer = __decorateClass([
  (0, import_components8.customElements)("portal-main-footer")
], Footer);

// src/main/index.tsx
var import_assets6 = __toModule(require("@vesting/assets"));
import_components9.Styles.Theme.applyTheme(import_components9.Styles.Theme.darkTheme);
var Theme7 = import_components9.Styles.Theme.ThemeVars;
var MainLauncher = class extends import_components9.Module {
  constructor(parent, options) {
    super(parent, options);
    this.classList.add(index_css_default);
    this.$eventBus = import_components9.application.EventBus;
  }
  bindOnHashChange() {
    window.onhashchange = this.locationHashChanged.bind(this);
  }
  initCustomData(options) {
    this.params = options.params;
    this.menuItems = options.menuItems || [];
    this.header = options.header;
    (0, import_store3.setDataFromSCConfig)(options);
  }
  async afterLocationHashChanged() {
    this.toggleLayout(true);
    this.renderBreadcrumb();
  }
  async handleLoadModuleCustom(module2) {
    if (this.pageWrap.contains(module2))
      module2.style.display = "initial";
    else
      this.pageWrap.append(module2);
  }
  toggleLayout(value) {
    this.headerElm.visible = value;
    this.footerElm.visible = value;
  }
  async init() {
    super.init();
    this.handleResultModal();
    this.handleConfirmModal();
    this.renderHeader();
    this.$eventBus.register(this, import_global3.EventId.ShowMainLayout, this.toggleLayout);
  }
  handleResultModal() {
    this.resultMain = new Result();
    this.appendChild(this.resultMain);
    this.$eventBus.register(this, import_global3.EventId.ShowResult, () => {
      this.resultMain.showModal();
    });
    this.$eventBus.register(this, import_global3.EventId.SetResultMessage, (message) => {
      this.resultMain.message = message;
    });
  }
  handleConfirmModal() {
    this.confirmModal = new ConfirmModal();
    this.appendChild(this.confirmModal);
    this.$eventBus.register(this, import_global3.EventId.ShowConfirmationModal, () => {
      this.confirmModal.showModal();
    });
    this.$eventBus.register(this, import_global3.EventId.SetConfirmationMessage, (message) => {
      this.confirmModal.message = message;
    });
  }
  async renderHeader() {
    this.subHeader.innerHTML = "";
    if (!this.header)
      return;
    if (this.header.maxWidth)
      this.subHeader.maxWidth = this.header.maxWidth;
    if (this.header.padding)
      this.subHeader.padding = this.header.padding;
    this.renderSlogan();
    this.renderBreadcrumb();
  }
  async renderSlogan() {
    if (!this.header.sloganUrl)
      return;
    const img = await import_components9.Image.create({
      url: import_assets6.default.fullPath(this.header.sloganUrl)
    });
    this.subHeader.appendChild(img);
  }
  getBreadcrumbList() {
    const url = window.location.hash.replace("#/", "");
    return url.split("/").map((v) => v.split("?")[0]);
  }
  async renderBreadcrumb() {
    if (!this.header || !this.header.breadcrumb)
      return;
    if (!this.breadcrumbStack) {
      const stackElm = { verticalAlignment: "center", gap: "8px" };
      if (this.header.padding)
        stackElm.padding = this.header.padding;
      this.breadcrumbStack = await import_components9.HStack.create(stackElm);
      this.breadcrumbStack.classList.add("breadcrumb");
      this.subHeader.appendChild(this.breadcrumbStack);
    }
    this.breadcrumbStack.innerHTML = "";
    if (typeof this.header.breadcrumb === "object" && (!this.header.breadcrumb.supportedUrl.length || !this.header.breadcrumb.supportedUrl.includes(this.currentModuleUrl))) {
      this.breadcrumbStack.visible = false;
      return;
    }
    const list = this.getBreadcrumbList();
    let url = "#";
    const breadcrumbs = list.map((path, index) => {
      url += "/" + path;
      const color = index === list.length - 1 ? Theme7.colors.primary.contrastText : Theme7.colors.primary.dark;
      const className = index === list.length - 1 ? "active inline-flex" : "inline-flex";
      return /* @__PURE__ */ this.$render("i-label", {
        link: { href: url, target: "_self" },
        class: className,
        font: { bold: true, color },
        caption: path
      });
    });
    this.breadcrumbStack.visible = true;
    this.breadcrumbStack.append(...breadcrumbs);
  }
  render() {
    return /* @__PURE__ */ this.$render("i-vstack", {
      height: "inherit"
    }, /* @__PURE__ */ this.$render("portal-main-nav", {
      id: "headerElm",
      menuItems: this.menuItems,
      height: "auto",
      width: "100%"
    }), /* @__PURE__ */ this.$render("i-vstack", {
      id: "subHeader",
      horizontalAlignment: "center",
      height: "auto",
      width: "100%",
      gap: "1rem",
      margin: { left: "auto", right: "auto", top: "1rem" }
    }), /* @__PURE__ */ this.$render("i-panel", {
      id: "pageWrap",
      stack: { grow: "1", shrink: "0" }
    }), /* @__PURE__ */ this.$render("portal-main-footer", {
      id: "footerElm",
      params: this.params,
      background: { color: import_components9.Styles.Theme.ThemeVars.background.main },
      padding: { top: "2rem", bottom: "2rem", right: "2rem", left: "2rem" },
      stack: { shrink: "0" },
      class: "footer",
      height: "auto",
      width: "100%"
    }));
  }
};
MainLauncher = __decorateClass([
  import_components9.customModule,
  (0, import_components9.customElements)("portal-main-launcher")
], MainLauncher);
  
  });