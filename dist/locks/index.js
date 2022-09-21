(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // src/locks/index.tsx
  var import_components2 = __toModule(__require("@ijstech/components"));
  var import_store2 = __toModule(__require("@vesting/store"));
  var import_global = __toModule(__require("@vesting/global"));
  var import_assets = __toModule(__require("@vesting/assets"));

  // src/locks/index.css.ts
  var import_components = __toModule(__require("@ijstech/components"));
  var index_css_default = import_components.Styles.style({
    $nest: {
      ".canBreak": {
        wordBreak: "break-all"
      },
      ".custom-combobox": {
        $nest: {
          "> .icon-btn": {
            width: 32,
            justifyContent: "center"
          }
        }
      },
      "i-input > input": {
        paddingLeft: 10
      }
    }
  });

  // src/locks/locksAPI.ts
  var import_eth_wallet = __toModule(__require("@ijstech/eth-wallet"));
  var import_vesting_sdk = __toModule(__require("@scom/vesting-sdk"));
  var import_store = __toModule(__require("@vesting/store"));
  var getMyCampaigns = async () => {
    let wallet = import_eth_wallet.Wallet.getInstance();
    let address = await (0, import_store.getVaultContractAddress)();
    if (!address)
      return [];
    let vault = new import_vesting_sdk.Contracts.ValidVestingVault(wallet, address);
    let myCampaigns = [];
    let isPermitted = await vault.isPermitted(wallet.address);
    if (isPermitted.toNumber() == 0)
      return [];
    let tokenMap = (0, import_store.getTokenMap)();
    let campaignInfoList = await (0, import_vesting_sdk.getCampaignInfoList)(wallet, address);
    for (let i = 0; i < campaignInfoList.length; i++) {
      let campaignInfoItem = campaignInfoList[i];
      let tokenObj = tokenMap[campaignInfoItem.token.toLowerCase()];
      let locked = await vault.campaignLocked(campaignInfoItem.id);
      let claimed = await vault.campaignClaimed(campaignInfoItem.id);
      let campaignInfo = __spreadProps(__spreadValues({}, campaignInfoItem), {
        tokenObj,
        locked: import_eth_wallet.Utils.fromDecimals(locked, tokenObj.decimals).toFixed(),
        claimed: import_eth_wallet.Utils.fromDecimals(claimed, tokenObj.decimals).toFixed()
      });
      myCampaigns.push(campaignInfo);
    }
    console.log("myCampaigns", myCampaigns);
    return myCampaigns;
  };

  // src/locks/index.tsx
  var api_common = __toModule(__require("@vesting/common"));
  import_components2.Styles.Theme.applyTheme(import_components2.Styles.Theme.darkTheme);
  import_components2.Styles.fontFace({
    fontFamily: "montserrat",
    src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Regular.ttf")}") format("truetype")`,
    fontWeight: "900",
    fontStyle: "normal"
  });
  var locks = class extends import_components2.Module {
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
      let myCampaigns = await getMyCampaigns();
      await this.setCopiedCardListValueByAPI(myCampaigns);
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
    async onSetupPage(isWalletConnected2) {
      if (isWalletConnected2) {
        this.setListAllVisible();
        this.renderFirstPanel();
        this.renderCardList(this.copiedCardList);
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
    async setCopiedCardListValueByAPI(myCampaignList) {
      this.copiedCardList = [];
      for (let i = 0; i < myCampaignList.length; i++) {
        if (myCampaignList[i].dataUri) {
          let data = await api_common.fetchFileJsonContentByCID2(myCampaignList[i].dataUri);
          let item = {
            id: myCampaignList[i].id,
            icon: data.imgUrl,
            CampanyName: data.name,
            Locked: myCampaignList[i].locked,
            Claimed: myCampaignList[i].claimed,
            tokenSymbol: myCampaignList[i].tokenObj.symbol
          };
          this.copiedCardList.push(item);
        }
      }
    }
    setListAllVisible() {
      if (!this.copiedCardList) {
        return;
      }
      for (let i = 0; i < this.copiedCardList.length; i++) {
        this.copiedCardList[i].visible = true;
      }
    }
    renderFirstPanel() {
      this.searchBox.placeholder = "Search campaign by campaign name/token/token address";
      this.comboBoxLabel.caption = "Sort By: ";
      this.comboBox.items = [
        {
          value: "Locked",
          label: "Value Locked"
        },
        {
          value: "Claimed",
          label: "Value Claimed"
        }
      ];
      this.comboBox.icon = /* @__PURE__ */ this.$render("i-icon", {
        name: "search"
      });
      this.newCampaign.caption = "New Campaign";
    }
    enterMyCampaignDetail(id) {
      window.location.href = `#/locks/${id}`;
    }
    addNewCampaign() {
      window.location.href = "#/newCampaign";
    }
    renderCardStatus(cardObj) {
      if (cardObj.status == "LIVE") {
        this.statusLabel.caption = "LIVE";
        this.statusPanel.background.color = "#3D8C58";
      } else if (cardObj.status == "CLOSED") {
        this.statusLabel.caption = "CLOSED";
        this.statusPanel.background.color = "#A8A8A8";
      }
    }
    onComboBoxChanged() {
      let sortedCardList;
      switch (this.comboBox.value.value) {
        case "Locked":
          sortedCardList = this.copiedCardList.sort((a, b) => a.Locked < b.Locked ? 1 : a.Locked > b.Locked ? -1 : 0);
          break;
        case "Claimed":
          sortedCardList = this.copiedCardList.sort((a, b) => a.Claimed < b.Claimed ? 1 : a.Claimed > b.Claimed ? -1 : 0);
          break;
      }
      this.copiedCardList = sortedCardList;
      this.renderCardList(this.copiedCardList);
    }
    onSearchBoxChanged() {
      this.setListAllVisible();
      if (this.searchBox.value != null) {
        let pattern = this.searchBox.value;
        let regex = new RegExp(pattern, "i");
        for (let i = 0; i < this.copiedCardList.length; i++) {
          if (regex.test(this.copiedCardList[i].CampanyName) == false && regex.test(this.copiedCardList[i].tokenSymbol) == false) {
            this.copiedCardList[i].visible = false;
          }
        }
      }
      this.renderCardList(this.copiedCardList);
    }
    renderCardList(cardListData) {
      this.cardList.innerHTML = "";
      if (!cardListData) {
        return;
      }
      for (let i = 0; i < cardListData.length; i++) {
        if (cardListData[i].visible == true) {
          let item = /* @__PURE__ */ this.$render("i-panel", {
            width: "280px"
          }, /* @__PURE__ */ this.$render("i-vstack", {
            width: "100%",
            height: "100%",
            border: { width: "2.7px", color: "#A8A8A8", style: "solid", radius: "30px" },
            onClick: () => this.enterMyCampaignDetail(cardListData[i].id)
          }, /* @__PURE__ */ this.$render("i-hstack", {
            id: "statusPanel",
            width: "66px",
            height: "30px",
            border: { radius: "9.33px" },
            position: "absolute",
            verticalAlignment: "center",
            horizontalAlignment: "center",
            margin: { top: 20, bottom: 20, left: 20, right: 20 }
          }, /* @__PURE__ */ this.$render("i-label", {
            id: "statusLabel"
          })), /* @__PURE__ */ this.$render("i-vstack", {
            stack: { basis: "65%" },
            background: { color: "#000000" },
            verticalAlignment: "center",
            horizontalAlignment: "center",
            border: { radius: "30px 30px 0 0" }
          }, /* @__PURE__ */ this.$render("i-image", {
            url: cardListData[i].icon,
            height: "100px",
            margin: { bottom: 20 }
          }), /* @__PURE__ */ this.$render("i-label", {
            caption: cardListData[i].CampanyName,
            font: { name: "Montserrat", size: "20px" }
          })), /* @__PURE__ */ this.$render("i-vstack", {
            stack: { basis: "35%" },
            background: { color: "#212128" },
            verticalAlignment: "center",
            horizontalAlignment: "center",
            padding: { top: 10, bottom: 10, left: 20, right: 20 },
            border: { radius: "0 0 30px 30px" }
          }, /* @__PURE__ */ this.$render("i-hstack", {
            width: "100%",
            maxWidth: "250px"
          }, /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "40%" },
            horizontalAlignment: "start",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: "Locked: ",
            font: { name: "Montserrat", size: "13px" }
          })), /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "60%" },
            horizontalAlignment: "end",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: Number(cardListData[i].Locked).toFixed(4) + " " + cardListData[i].tokenSymbol,
            font: { name: "Montserrat", size: "13px" },
            class: "canBreak"
          }))), /* @__PURE__ */ this.$render("i-hstack", {
            width: "100%",
            maxWidth: "250px"
          }, /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "40%" },
            horizontalAlignment: "start",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: "Claimed: ",
            font: { name: "Montserrat", size: "13px" }
          })), /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "60%" },
            horizontalAlignment: "end",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: Number(cardListData[i].Claimed).toFixed(4) + " " + cardListData[i].tokenSymbol,
            font: { name: "Montserrat", size: "13px" },
            class: "canBreak"
          }))))));
          this.renderCardStatus(cardListData[i]);
          this.cardList.append(item);
        }
      }
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        id: "MainPnl",
        height: "100%",
        width: "100%"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "pageContent",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-grid-layout", {
        templateColumns: ["50%", "10%", "20%", "20%"],
        templateRows: ["150px", "auto"],
        templateAreas: [
          ["searchBoxArea", "LabelArea", "ComboBoxArea", "BtnArea"],
          ["CardArea", "CardArea", "CardArea", "CardArea"]
        ],
        mediaQueries: [
          {
            maxWidth: "925px",
            properties: {
              templateColumns: ["15%", "45%", "40%"],
              templateRows: ["auto", "auto", "auto"],
              templateAreas: [
                ["searchBoxArea", "searchBoxArea", "searchBoxArea"],
                ["LabelArea", "ComboBoxArea", "BtnArea"],
                ["CardArea", "CardArea", "CardArea"]
              ]
            }
          },
          {
            maxWidth: "500px",
            properties: {
              templateColumns: ["30%", "70%"],
              templateRows: ["auto", "auto", "auto", "auto"],
              templateAreas: [
                ["searchBoxArea", "searchBoxArea"],
                ["LabelArea", "ComboBoxArea"],
                ["BtnArea", "BtnArea"],
                ["CardArea", "CardArea"]
              ]
            }
          }
        ],
        horizontalAlignment: "center",
        width: "calc(100% - 3rem)",
        maxWidth: "1400px",
        margin: { left: "1.5rem", right: "1.5rem", top: "1rem", bottom: "1rem" },
        padding: { left: "10", right: "10", top: "10", bottom: "10" },
        gap: { row: 5, column: 5 }
      }, /* @__PURE__ */ this.$render("i-hstack", {
        grid: { area: "searchBoxArea" },
        resizer: true,
        width: "100%",
        verticalAlignment: "center",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-input", {
        id: "searchBox",
        height: "39px",
        width: "100%",
        maxWidth: "619px",
        onChanged: this.onSearchBoxChanged
      })), /* @__PURE__ */ this.$render("i-hstack", {
        grid: { area: "LabelArea" },
        resizer: true,
        width: "100%",
        verticalAlignment: "center",
        horizontalAlignment: "end",
        gap: 5
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "comboBoxLabel",
        font: { color: "white" }
      })), /* @__PURE__ */ this.$render("i-hstack", {
        grid: { area: "ComboBoxArea" },
        resizer: true,
        verticalAlignment: "center",
        horizontalAlignment: "center",
        gap: 5
      }, /* @__PURE__ */ this.$render("i-combo-box", {
        id: "comboBox",
        class: "custom-combobox",
        height: "39px",
        onChanged: this.onComboBoxChanged
      })), /* @__PURE__ */ this.$render("i-hstack", {
        grid: { area: "BtnArea" },
        resizer: true,
        width: "100%",
        verticalAlignment: "center",
        horizontalAlignment: "center",
        gap: 5
      }, /* @__PURE__ */ this.$render("i-button", {
        id: "newCampaign",
        width: "160px",
        height: "39px",
        background: { color: "#34343A" },
        onClick: this.addNewCampaign
      })), /* @__PURE__ */ this.$render("i-card-layout", {
        id: "cardList",
        grid: { area: "CardArea" },
        maxWidth: "1300px",
        cardMinWidth: "250px",
        cardHeight: "382px",
        width: "100%",
        gap: { column: "2rem", row: "2rem" },
        margin: { top: 30 },
        horizontalAlignment: "center"
      }))), /* @__PURE__ */ this.$render("i-modal", {
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
  locks = __decorateClass([
    import_components2.customModule
  ], locks);
})();
