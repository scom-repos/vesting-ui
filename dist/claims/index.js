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

  // src/claims/index.tsx
  var import_components2 = __toModule(__require("@ijstech/components"));
  var import_store2 = __toModule(__require("@vesting/store"));
  var import_assets = __toModule(__require("@vesting/assets"));

  // src/claims/index.css.ts
  var import_components = __toModule(__require("@ijstech/components"));
  var index_css_default = import_components.Styles.style({
    $nest: {
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

  // src/claims/claimsAPI.ts
  var import_eth_wallet = __toModule(__require("@ijstech/eth-wallet"));
  var import_vesting_sdk = __toModule(__require("@scom/vesting-sdk"));
  var import_store = __toModule(__require("@vesting/store"));
  var import_common = __toModule(__require("@vesting/common"));
  var getMyCampaigns = async () => {
    let wallet = import_eth_wallet.Wallet.getInstance();
    let address = await (0, import_store.getVaultContractAddress)();
    if (!address)
      return [];
    let campaignInfoList = await (0, import_vesting_sdk.getCampaignInfoList)(wallet, address);
    let myCampaignList = [];
    if (campaignInfoList.length > 0) {
      let tokenMap = (0, import_store.getTokenMap)();
      let myClaims = await import_vesting_sdk.Claimant.getMyClaims(wallet, address);
      let myClaimsByCampaignId = {};
      for (let i = 0; i < myClaims.length; i++) {
        let myClaim = myClaims[i];
        myClaimsByCampaignId[myClaim.campaignId] = myClaimsByCampaignId[myClaim.campaignId] || [];
        myClaimsByCampaignId[myClaim.campaignId].push(myClaim);
      }
      for (let i = 0; i < campaignInfoList.length; i++) {
        let campaignInfo = campaignInfoList[i];
        let tokenObj = tokenMap[campaignInfo.token.toLowerCase()];
        let myCampaignItem = __spreadProps(__spreadValues({}, campaignInfo), {
          campaignName: "",
          campaignImgUrl: "",
          tokenObj,
          locked: "0",
          claimed: "0",
          claimable: "0"
        });
        myCampaignItem.lockInfoList = await import_vesting_sdk.Claimant.getUnverifiedLockInfo(wallet, address, campaignInfo.id);
        myCampaignItem.claimInfoList = myClaimsByCampaignId[campaignInfo.id] || [];
        if (myCampaignItem.lockInfoList.length == 0 && myCampaignItem.claimInfoList.length == 0)
          continue;
        let lockFound = false;
        if (myCampaignItem.lockInfoList.length > 0) {
          for (let j = 0; j < myCampaignItem.lockInfoList.length; j++) {
            let lockInfoItem = myCampaignItem.lockInfoList[j];
            if (lockInfoItem.lockType == import_vesting_sdk.LockType.Merkle) {
              if (lockInfoItem.dataUri) {
                let lockRecordList = await (0, import_common.fetchFileJsonContentByCID2)(lockInfoItem.dataUri);
                let itemfound = lockRecordList.find((v) => v.account.toLowerCase() == wallet.address.toLowerCase());
                if (itemfound) {
                  lockFound = true;
                  break;
                }
              }
            }
          }
        }
        if (!lockFound && myCampaignItem.claimInfoList.length == 0)
          continue;
        let campaignIpfsData = await (0, import_common.fetchFileJsonContentByCID2)(campaignInfo.dataUri);
        myCampaignItem.campaignName = campaignIpfsData.name;
        myCampaignItem.campaignImgUrl = campaignIpfsData.imgUrl;
        if (myCampaignItem.claimInfoList.length > 0) {
          let locked = new import_eth_wallet.BigNumber(0), claimed = new import_eth_wallet.BigNumber(0), claimable = new import_eth_wallet.BigNumber(0);
          for (let j = 0; j < myCampaignItem.claimInfoList.length; j++) {
            let claimInfoItem = myCampaignItem.claimInfoList[j];
            locked = locked.plus(claimInfoItem.locked);
            claimed = claimed.plus(claimInfoItem.claimed);
            claimable = claimable.plus(claimInfoItem.claimable);
          }
          myCampaignItem.locked = import_eth_wallet.Utils.fromDecimals(locked, tokenObj.decimals).toFixed();
          myCampaignItem.claimed = import_eth_wallet.Utils.fromDecimals(claimed, tokenObj.decimals).toFixed();
          myCampaignItem.claimable = import_eth_wallet.Utils.fromDecimals(claimable, tokenObj.decimals).toFixed();
        }
        myCampaignList.push(myCampaignItem);
      }
    }
    return myCampaignList;
  };

  // src/claims/index.tsx
  var import_global = __toModule(__require("@vesting/global"));
  var import_eth_wallet2 = __toModule(__require("@ijstech/eth-wallet"));
  import_components2.Styles.Theme.applyTheme(import_components2.Styles.Theme.darkTheme);
  import_components2.Styles.fontFace({
    fontFamily: "montserrat",
    src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Regular.ttf")}") format("truetype")`,
    fontWeight: "900",
    fontStyle: "normal"
  });
  var Claims = class extends import_components2.Module {
    constructor(parent, options) {
      super(parent, options);
      this.onChainChange = () => {
        this.onSetupPage(true);
      };
      this.onWalletConnect = async (connected) => {
        let chainId = (0, import_store2.getChainId)();
        if (connected && !chainId) {
          this.onChainChange();
        } else {
          this.onSetupPage(connected);
        }
      };
      this.$eventBus = import_components2.application.EventBus;
      this.registerEvents();
    }
    registerEvents() {
      this.$eventBus.register(this, import_global.EventId.IsWalletConnected, this.onWalletConnect);
      this.$eventBus.register(this, import_global.EventId.chainChanged, this.onChainChange);
      this.$eventBus.register(this, import_global.EventId.IsWalletDisconnected, this.onWalletConnect);
    }
    async init() {
      super.init();
      this.classList.add(index_css_default);
    }
    async onLoad() {
      this.pageContent.visible = false;
      this.loadingModal.visible = true;
      await this.onSetupPage((0, import_store2.isWalletConnected)());
      this.pageContent.visible = true;
      this.loadingModal.visible = false;
    }
    async onSetupPage(isWalletConnected2) {
      if (isWalletConnected2) {
        let myCampaigns = await getMyCampaigns();
        this.setCopiedCardListValueByAPI(myCampaigns);
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
    setCopiedCardListValueByAPI(myCampaignList) {
      this.copiedCardList = [];
      for (let i = 0; i < myCampaignList.length; i++) {
        let item = {
          id: myCampaignList[i].id,
          icon: myCampaignList[i].campaignImgUrl,
          CampanyName: myCampaignList[i].campaignName,
          Locked: myCampaignList[i].locked,
          Claimable: myCampaignList[i].claimable,
          Claimed: myCampaignList[i].claimed,
          CampanyShortName: myCampaignList[i].tokenObj.symbol,
          visible: true
        };
        this.copiedCardList.push(item);
      }
    }
    setListAllVisible() {
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
          value: "Claimable",
          label: "Value Claimable"
        },
        {
          value: "Claimed",
          label: "Value Claimed"
        }
      ];
      this.comboBox.icon = /* @__PURE__ */ this.$render("i-icon", {
        name: "search"
      });
    }
    enterMyClaimDetail(id) {
      window.location.href = `#/claims/${id}`;
    }
    onComboBoxChanged() {
      let sortedCardList = [];
      const sortByDescending = (a, b) => {
        return new import_eth_wallet2.BigNumber(a).lt(b) ? 1 : new import_eth_wallet2.BigNumber(a).gt(b) ? -1 : 0;
      };
      switch (this.comboBox.value.value) {
        case "Locked":
          sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Locked, b.Locked));
          break;
        case "Claimable":
          sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Claimable, b.Claimable));
          break;
        case "Claimed":
          sortedCardList = this.copiedCardList.sort((a, b) => sortByDescending(a.Claimed, b.Claimed));
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
          if (regex.test(this.copiedCardList[i].CampanyName) == false && regex.test(this.copiedCardList[i].CampanyShortName) == false) {
            this.copiedCardList[i].visible = false;
          }
        }
      }
      this.renderCardList(this.copiedCardList);
    }
    renderCardList(cardListData) {
      this.cardList.innerHTML = "";
      for (let i = 0; i < cardListData.length; i++) {
        if (cardListData[i].visible == true) {
          let item = /* @__PURE__ */ this.$render("i-panel", {
            width: "280px"
          }, /* @__PURE__ */ this.$render("i-vstack", {
            width: "100%",
            height: "100%",
            border: { width: "2.7px", color: "#A8A8A8", style: "solid", radius: "30px" },
            onClick: () => this.enterMyClaimDetail(cardListData[i].id)
          }, /* @__PURE__ */ this.$render("i-vstack", {
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
            caption: Number(cardListData[i].Locked).toFixed(4) + " " + cardListData[i].CampanyShortName,
            font: { name: "Montserrat", size: "13px" }
          }))), /* @__PURE__ */ this.$render("i-hstack", {
            width: "100%",
            maxWidth: "250px"
          }, /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "40%" },
            horizontalAlignment: "start",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: "Claimable: ",
            font: { name: "Montserrat", size: "13px" }
          })), /* @__PURE__ */ this.$render("i-hstack", {
            stack: { basis: "60%" },
            horizontalAlignment: "end",
            verticalAlignment: "center"
          }, /* @__PURE__ */ this.$render("i-label", {
            caption: Number(cardListData[i].Claimable).toFixed(4) + " " + cardListData[i].CampanyShortName,
            font: { name: "Montserrat", size: "13px" }
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
            caption: Number(cardListData[i].Claimed).toFixed(4) + " " + cardListData[i].CampanyShortName,
            font: { name: "Montserrat", size: "13px" }
          }))))));
          this.cardList.append(item);
        }
      }
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        id: "MainPnl",
        width: "100%",
        height: "100%"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "pageContent",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-grid-layout", {
        templateColumns: ["60%", "40%"],
        templateRows: ["150px", "auto"],
        templateAreas: [
          ["searchBoxArea", "ComboBoxArea"],
          ["CardArea", "CardArea"]
        ],
        mediaQueries: [
          {
            maxWidth: "742px",
            properties: {
              templateColumns: ["100%"],
              templateRows: ["auto", "auto", "auto"],
              templateAreas: [
                ["searchBoxArea"],
                ["ComboBoxArea"],
                ["CardArea"]
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
        grid: { area: "ComboBoxArea" },
        resizer: true,
        width: "100%",
        verticalAlignment: "center",
        horizontalAlignment: "center",
        gap: 5
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "comboBoxLabel",
        font: { color: "white" }
      }), /* @__PURE__ */ this.$render("i-combo-box", {
        id: "comboBox",
        height: "39px",
        class: "custom-combobox",
        background: { color: "#34343A" },
        onChanged: this.onComboBoxChanged
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
  Claims = __decorateClass([
    import_components2.customModule
  ], Claims);
})();
