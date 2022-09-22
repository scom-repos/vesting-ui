(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
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

  // src/newCampaign/index.tsx
  var import_components2 = __toModule(__require("@ijstech/components"));
  var import_store2 = __toModule(__require("@vesting/store"));
  var import_assets = __toModule(__require("@vesting/assets"));

  // src/newCampaign/index.css.ts
  var import_components = __toModule(__require("@ijstech/components"));
  var index_css_default = import_components.Styles.style({
    $nest: {}
  });

  // src/newCampaign/index.tsx
  var import_global = __toModule(__require("@vesting/global"));

  // src/newCampaign/newCampaignAPI.ts
  var import_eth_wallet = __toModule(__require("@ijstech/eth-wallet"));
  var import_vesting_sdk = __toModule(__require("@scom/vesting-sdk"));
  var import_store = __toModule(__require("@vesting/store"));
  var import_common = __toModule(__require("@vesting/common"));
  var newCampaign = async (name, imgUrl, token) => {
    let wallet = import_eth_wallet.Wallet.getInstance();
    let address = await (0, import_store.getVaultContractAddress)();
    if (!address)
      return null;
    let fileName = `vesting-new-campaign-${wallet.chainId}-${Date.now()}.json`;
    let campaignInfo = {
      name,
      imgUrl
    };
    let ipfsCid = await (0, import_common.updateDataToIPFS)(JSON.stringify(campaignInfo), fileName);
    console.log("ipfsCid", ipfsCid);
    let vault = new import_vesting_sdk.Contracts.ValidVestingVault(wallet, address);
    let receipt = await vault.newCampaign({
      token,
      ownerFrozen: true,
      dataUri: ipfsCid.cid
    });
    return receipt;
  };

  // src/newCampaign/index.tsx
  import_components2.Styles.Theme.applyTheme(import_components2.Styles.Theme.darkTheme);
  import_components2.Styles.fontFace({
    fontFamily: "montserrat",
    src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Regular.ttf")}") format("truetype")`,
    fontWeight: "900",
    fontStyle: "normal"
  });
  var newCampaign2 = class extends import_components2.Module {
    constructor(parent, options) {
      super(parent, options);
      this.onWalletConnect = async (connected) => {
        let chainId = (0, import_store2.getChainId)();
        if (connected && !chainId) {
          this.onChainChange();
        } else {
          this.onSetupPage(connected);
        }
      };
      this.onChainChange = () => {
        this.onSetupPage(true);
      };
      this.$eventBus = import_components2.application.EventBus;
      this.registerEvents();
    }
    async onLoad() {
      this.pageContent.visible = false;
      this.loadingModal.visible = true;
      await this.onSetupPage((0, import_store2.isWalletConnected)());
      this.pageContent.visible = true;
      this.loadingModal.visible = false;
    }
    async init() {
      super.init();
      this.classList.add(index_css_default);
    }
    registerEvents() {
      this.$eventBus.register(this, import_global.EventId.IsWalletConnected, this.onWalletConnect);
      this.$eventBus.register(this, import_global.EventId.chainChanged, this.onChainChange);
      this.$eventBus.register(this, import_global.EventId.IsWalletDisconnected, this.onWalletConnect);
    }
    onSetupPage(isWalletConnected2) {
      if (isWalletConnected2) {
        this.renderPage();
        this.renderButtons();
        this.initTokenSelection();
      } else {
        this.renderNotConnected();
      }
    }
    renderNotConnected() {
      this.MainPnl.innerHTML = "";
      const elm = /* @__PURE__ */ this.$render("i-vstack", {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        width: "100%",
        height: "100%"
      }, /* @__PURE__ */ this.$render("i-label", {
        caption: "Please connect with your wallet"
      }));
      this.MainPnl.append(elm);
    }
    initTokenSelection() {
      this.tokenSelect.onSelectToken = (token) => this.onSelectToken(token, false);
      this.tokenSelect.isBtnMaxShown = false;
      this.tokenSelect.isCommonShown = true;
    }
    async onSelectToken(token, isFrom) {
      this.selectedToken = token;
    }
    backToMyCampaign() {
      window.location.href = "#/locks";
    }
    renderButtons() {
      this.back.caption = "BACK";
      this.confirm.caption = "Confirm";
    }
    renderPage() {
      this.campaignNameLabel.caption = "New campaign name: ";
      this.campaignIconLabel.caption = "New campaign Icon: ";
      this.campaignIconInput.caption = "Drag the picture to here";
      this.TokenLabel.caption = "Token: ";
      this.confirm_spin.caption = "Confirming";
      this.confirm_spin.rightIcon = /* @__PURE__ */ this.$render("i-icon", {
        name: "spinner",
        spin: true,
        margin: { left: 10 },
        width: "20px",
        height: "20px",
        fill: "white"
      });
      this.confirm.visible = true;
      this.confirm_spin.visible = false;
    }
    async confirmAddNewCampaign() {
      const txHashCallback = (err, receipt) => {
        if (err) {
          this.openswapResult.message = {
            status: "error",
            content: err
          };
          this.openswapResult.showModal();
          this.onSetupPage((0, import_store2.isWalletConnected)());
        } else if (receipt) {
          this.openswapResult.message = {
            status: "success",
            txtHash: receipt
          };
          this.openswapResult.showModal();
          this.onSetupPage((0, import_store2.isWalletConnected)());
        }
      };
      const confirmationCallback = async (receipt) => {
        await this.onSetupPage((0, import_store2.isWalletConnected)());
      };
      (0, import_global.registerSendTxEvents)({
        transactionHash: txHashCallback,
        confirmation: confirmationCallback
      });
      let item = {
        name: this.campaignNameInput.value,
        imgUrl: this.uploadedImgUrl,
        token: this.selectedToken.address
      };
      this.confirm.visible = false;
      this.confirm_spin.visible = true;
      await newCampaign(item.name, item.imgUrl, item.token);
      await this.onSetupPage((0, import_store2.isWalletConnected)());
    }
    async onChangeFile(source, files) {
      if (!files.length)
        return;
      const data = await this.campaignIconInput.toBase64(files[0]);
      this.uploadedImgUrl = data || "";
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        id: "MainPnl",
        width: "100%",
        height: "100%"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "pageContent",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        horizontalAlignment: "start",
        width: "calc(100% - 3rem)",
        maxWidth: "1400px",
        gap: 5,
        margin: { left: "1.5rem", right: "1.5rem", top: "1rem", bottom: "1rem" },
        padding: { left: "10", right: "10", top: "10", bottom: "10" }
      }, /* @__PURE__ */ this.$render("i-hstack", {
        horizontalAlignment: "start",
        minHeight: 150
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "pageTitle",
        font: { size: "40px", bold: true }
      })), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "30%" }
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "campaignNameLabel"
      })), /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "70%" }
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "campaignNameInput",
        captionWidth: "0px",
        width: "100%"
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        verticalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "30%" }
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "campaignIconLabel"
      })), /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "70%" }
      }, /* @__PURE__ */ this.$render("i-upload", {
        id: "campaignIconInput",
        draggable: true,
        multiple: false,
        onChanged: this.onChangeFile.bind(this)
      }))), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        verticalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "30%" }
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "TokenLabel"
      })), /* @__PURE__ */ this.$render("i-hstack", {
        stack: { basis: "70%" }
      }, /* @__PURE__ */ this.$render("token-selection", {
        id: "tokenSelect",
        background: { color: "#929292" }
      })))), /* @__PURE__ */ this.$render("i-hstack", {
        horizontalAlignment: "end",
        gap: 5,
        width: "calc(100% - 3rem)",
        maxWidth: "1400px",
        margin: { left: "1.5rem", right: "1.5rem", top: "1rem", bottom: "1rem" },
        padding: { left: "10", right: "10", top: "10", bottom: "10" }
      }, /* @__PURE__ */ this.$render("i-button", {
        id: "back",
        width: "200px",
        height: "55px",
        background: { color: "#929292" },
        onClick: this.backToMyCampaign
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "confirm",
        width: "200px",
        height: "55px",
        background: { color: "#929292" },
        onClick: (target) => this.confirmAddNewCampaign(target)
      }), /* @__PURE__ */ this.$render("i-button", {
        id: "confirm_spin",
        width: "200px",
        height: "55px",
        background: { color: "#929292" },
        visible: false
      })), /* @__PURE__ */ this.$render("portal-result", {
        id: "openswapResult",
        maxWidth: "500px"
      })), /* @__PURE__ */ this.$render("i-modal", {
        id: "loadingModal",
        width: 500,
        minHeight: 300,
        closeOnBackdropClick: false
      }, /* @__PURE__ */ this.$render("i-hstack", {
        horizontalAlignment: "center",
        verticalAlignment: "center",
        width: "100%",
        height: 300
      }, /* @__PURE__ */ this.$render("i-label", {
        caption: "Loading"
      }), /* @__PURE__ */ this.$render("i-icon", {
        name: "spinner",
        spin: true,
        margin: { left: 10 },
        width: "50px",
        height: "50px",
        fill: "white"
      }))));
    }
  };
  newCampaign2 = __decorateClass([
    import_components2.customModule
  ], newCampaign2);
})();
