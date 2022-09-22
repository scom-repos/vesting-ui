define("@vesting/common",(require, exports)=>{
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

// src/common/index.ts
__export(exports, {
  TokenSelection: () => TokenSelection,
  fetchFileJsonContentByCID: () => fetchFileJsonContentByCID,
  fetchFileJsonContentByCID2: () => fetchFileJsonContentByCID2,
  updateDataToIPFS: () => updateDataToIPFS
});

// src/common/tokenSelection.tsx
var import_components2 = __toModule(require("@ijstech/components"));
var import_store = __toModule(require("@vesting/store"));
var import_global = __toModule(require("@vesting/global"));
var import_assets = __toModule(require("@vesting/assets"));

// src/common/tokenSelection.css.ts
var import_components = __toModule(require("@ijstech/components"));
var Theme = import_components.Styles.Theme.ThemeVars;
import_components.Styles.cssRule(".token-selection", {
  $nest: {
    "#tokenSearch": {
      width: "100% !important"
    },
    ".token-agree-input": {
      $nest: {
        "&:hover input ~ .checkmark": {
          borderColor: "#e83e8c"
        },
        ".is-checked .i-checkbox_label": {
          color: "yellow"
        },
        ".i-checkbox_label": {
          fontSize: "1.5rem",
          color: "yellow",
          width: "150px !important"
        },
        ".checkmark": {
          height: "30px",
          width: "30px",
          background: "none",
          border: "3px solid #e83e8c"
        },
        ".checkmark:after": {
          border: "3px solid #e83e8c",
          height: "16px",
          left: "7.5px",
          top: "0px",
          width: "7px",
          borderLeft: 0,
          borderTop: 0
        }
      }
    },
    ".btn-source-panel": {
      padding: "5px",
      display: "inline-block",
      background: "transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box",
      borderRadius: "5px"
    },
    ".token-import-input": {
      width: "100%",
      $nest: {
        "input": {
          width: "100%",
          background: "none",
          color: "blue",
          border: "none",
          fontSize: "1rem",
          margin: "5px 0"
        }
      }
    },
    ".pnl-token-import": {
      border: "2px solid #e83e8c",
      borderRadius: "0.75rem",
      margin: "1rem 0",
      padding: "1.25rem 1rem 1rem"
    },
    ".i-modal_header > i-icon": {
      fill: "#f15e61 !important"
    },
    "i-icon": {
      display: "inline-block"
    },
    ".btn-import": {
      background: "transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box",
      borderRadius: "5px",
      color: "#fff",
      fontSize: "1rem",
      padding: "0.25rem 1.25rem"
    },
    "::-webkit-scrollbar": {
      width: "3px"
    },
    "::-webkit-scrollbar-thumb": {
      background: "var(--colors-primary-main)",
      borderRadius: "5px"
    },
    ".ml-auto": {
      marginLeft: "auto"
    },
    ".custom-btn": {
      display: "flex",
      alignItems: "center",
      width: "max-content",
      padding: "0.25rem 0.5rem",
      boxShadow: "none",
      background: Theme.background.gradient,
      $nest: {
        "&:hover": {
          background: Theme.background.gradient,
          opacity: 0.9
        },
        "&.disabled": {
          background: "transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box",
          opacity: 1
        },
        "> i-icon": {
          marginRight: "0",
          height: "18px !important"
        },
        "> i-image": {
          lineHeight: "initial",
          marginRight: "0.5rem"
        },
        "&.has-token": {
          background: "transparent",
          fontWeight: "bold",
          color: Theme.text.third,
          paddingRight: "0",
          $nest: {
            "> i-icon": {
              marginRight: "7px",
              fill: "var(--colors-primary-main)"
            }
          }
        }
      }
    },
    "#btnMax": {
      marginRight: "0.25rem"
    },
    "#btnToken": {
      whiteSpace: "nowrap"
    },
    "#btnToken i-icon": {
      marginLeft: "0.25rem"
    },
    ".bg-modal": {
      $nest: {
        ".modal": {
          background: Theme.background.modal,
          width: 500,
          maxWidth: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "1rem",
          color: Theme.text.primary,
          marginTop: 40
        }
      }
    },
    "#tokenImportModal.bg-modal .modal": {
      width: 400
    },
    "#tokenSelectionModal": {
      $nest: {
        ".i-modal_header": {
          marginBottom: "1.5rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid var(--divider)",
          color: Theme.colors.primary.main,
          fontSize: "1.25rem",
          fontWeight: 700
        },
        ".i-modal_header > i-icon": {
          fill: "var(--colors-primary-main) !important"
        },
        ".search": {
          position: "relative",
          marginBottom: "1.5rem",
          $nest: {
            "i-icon": {
              position: "absolute",
              top: "calc(50% - 8px)",
              left: "1rem",
              transform: "rotate(90deg)",
              opacity: 0.7
            },
            "i-input": {
              width: "100%"
            },
            "i-input > input": {
              width: "100%",
              height: "auto !important",
              padding: "1rem 1.5rem 1rem 2.25rem",
              borderRadius: "0.5rem",
              border: "2px solid #2a3675",
              background: "transparent",
              color: "inherit",
              fontSize: "inherit"
            }
          }
        },
        ".token-header": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBlock: "0.5rem",
          $nest: {
            "i-label *": {
              color: Theme.colors.primary.main,
              fontSize: "1rem"
            },
            ".token-section": {
              position: "relative",
              cursor: "pointer"
            },
            "i-icon": {
              width: "10px",
              height: "14px",
              display: "flex",
              fill: Theme.text.primary,
              position: "absolute",
              right: "0"
            },
            ".icon-sort-up": {
              top: "2px"
            },
            ".icon-sort-down": {
              bottom: "2px"
            },
            ".icon-sorted": {
              fill: Theme.colors.primary.main
            }
          }
        },
        ".common-token": {
          $nest: {
            "i-grid-layout": {
              margin: "0.5rem 0 0",
              alignItems: "center",
              justifyContent: "unset"
            },
            ".grid-item": {
              padding: "0.35rem 0.5rem",
              borderRadius: "1rem",
              border: "2px solid transparent",
              cursor: "pointer",
              $nest: {
                "&:hover": {
                  borderColor: Theme.colors.primary.main
                },
                "i-image": {
                  marginRight: "0.5rem"
                },
                "i-label": {
                  overflow: "hidden"
                }
              }
            }
          }
        },
        ".token-list": {
          margin: "0.5rem -0.5rem",
          maxHeight: "45vh",
          overflowY: "auto",
          $nest: {
            ".token-info": {
              display: "flex",
              flexDirection: "column",
              fontSize: "1rem",
              marginRight: "0.5rem",
              textAlign: "left"
            },
            ".token-item": {
              padding: "0.5rem",
              overflow: "unset",
              $nest: {
                "&:hover": {
                  background: "linear-gradient(254.8deg,rgba(231,91,102,.1) -8.08%,rgba(181,32,130,.1) 84.35%) !important"
                },
                "i-image": {
                  marginRight: "0.5rem"
                },
                "&:not(:first-child)": {
                  marginTop: 0
                }
              }
            },
            ".token-name i-label > *": {
              fontSize: "0.75rem",
              marginRight: "0.5rem",
              color: "rgba(255,255,255,0.55)"
            }
          }
        }
      }
    },
    "@media screen and (max-width: 425px)": {
      $nest: {
        ".common-list": {
          gridTemplateColumns: "repeat(3, 1fr) !important"
        }
      }
    }
  }
});

// src/common/tokenSelection.tsx
var Theme2 = import_components2.Styles.Theme.ThemeVars;
var TokenSelection = class extends import_components2.Module {
  constructor(parent, options) {
    super(parent, options);
    this._isSortBalanceShown = true;
    this._isBtnMaxShown = true;
    this.fallbackUrl = import_assets.default.fullPath("img/tokens/token-placeholder.svg");
    this.sortToken = (a, b, asc) => {
      if (a.balance != b.balance) {
        return asc ? a.balance - b.balance : b.balance - a.balance;
      }
      if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
        return -1;
      }
      if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
        return 1;
      }
      return 0;
    };
    this.$eventBus = import_components2.application.EventBus;
    this.registerEvent();
  }
  get token() {
    return this._token;
  }
  set token(value) {
    this._token = value;
    this.updateButton(value);
  }
  get targetChainId() {
    return this._targetChainId;
  }
  set targetChainId(value) {
    this._targetChainId = value;
    this.updateDataByChain();
  }
  get tokenDataListProp() {
    return this._tokenDataListProp;
  }
  set tokenDataListProp(value) {
    this._tokenDataListProp = value;
    this.renderTokenItems();
    this.updateButton();
  }
  get onSelectToken() {
    return this._onSelectToken;
  }
  set onSelectToken(callback) {
    this._onSelectToken = callback;
  }
  get isCommonShown() {
    return this._isCommonShown;
  }
  set isCommonShown(value) {
    this._isCommonShown = value;
    this.renderCommonItems();
  }
  get isSortBalanceShown() {
    return this._isSortBalanceShown;
  }
  set isSortBalanceShown(value) {
    this._isSortBalanceShown = value;
    if (value) {
      this.sortBalancePanel.classList.remove("hidden");
    } else {
      this.sortBalancePanel.classList.add("hidden");
    }
  }
  get isBtnMaxShown() {
    return this._isBtnMaxShown;
  }
  set isBtnMaxShown(value) {
    this._isBtnMaxShown = value;
    if (!this.btnMax)
      return;
    if (value) {
      this.btnMax.classList.remove("hidden");
    } else {
      this.btnMax.classList.add("hidden");
    }
  }
  get onSetMaxBalance() {
    return this._onSetMaxBalance;
  }
  set onSetMaxBalance(callback) {
    this._onSetMaxBalance = callback;
  }
  get chainId() {
    if (this.targetChainId) {
      return this.targetChainId;
    }
    return (0, import_store.isWalletConnected)() ? this.currentChainId : (0, import_store.getChainId)();
  }
  get disableSelect() {
    return this._disableSelect;
  }
  set disableSelect(value) {
    this._disableSelect = value;
    this.btnToken.enabled = !value;
    this.btnToken.rightIcon.visible = !value;
  }
  get disabledMaxBtn() {
    return this._disabledMaxBtn;
  }
  set disabledMaxBtn(value) {
    this._disabledMaxBtn = value;
    this.btnMax.enabled = !value;
  }
  async initData() {
    if (!this.chainId) {
      this.currentChainId = (0, import_store.getChainId)();
    }
    if ((0, import_store.isWalletConnected)()) {
      this.tokenBalancesMap = (0, import_store.getTokenBalances)();
    }
    this.renderTokenItems();
  }
  async updateDataByChain() {
    this.tokenBalancesMap = await (0, import_store.updateAllTokenBalances)();
    this.renderTokenItems();
    this.updateButton();
  }
  async updateDataByNewToken() {
    this.tokenBalancesMap = (0, import_store.getTokenBalances)();
    this.renderTokenItems();
  }
  async onChainChange() {
    if (!this.targetChainId) {
      this.currentChainId = (0, import_store.getChainId)();
      this.updateDataByChain();
    }
  }
  async onWalletConnect() {
    this.checkHasMetaMask = (0, import_store.hasMetaMask)();
    await this.initData();
    this.updateStatusButton();
  }
  async onWalletDisconnect() {
    await this.initData();
  }
  async onPaid() {
    await this.updateDataByChain();
    await this.initData();
  }
  registerEvent() {
    this.$eventBus.register(this, import_global.EventId.IsWalletConnected, this.onWalletConnect);
    this.$eventBus.register(this, import_global.EventId.IsWalletDisconnected, this.onWalletDisconnect);
    this.$eventBus.register(this, import_global.EventId.chainChanged, this.onChainChange);
    this.$eventBus.register(this, import_global.EventId.Paid, this.onPaid);
    this.$eventBus.register(this, import_global.EventId.EmitNewToken, this.updateDataByNewToken);
  }
  get tokenDataList() {
    if (this.tokenDataListProp && this.tokenDataListProp.length) {
      return this.tokenDataListProp;
    }
    const tokenList = (0, import_store.getTokenList)(this.chainId);
    return tokenList.map((token) => {
      var _a;
      const tokenObject = __spreadValues({}, token);
      const nativeToken = import_store.ChainNativeTokenByChainId[this.chainId];
      if (token.symbol === nativeToken.symbol) {
        Object.assign(tokenObject, { isNative: true });
      }
      if (!(0, import_store.isWalletConnected)()) {
        Object.assign(tokenObject, {
          balance: 0
        });
      } else if (this.tokenBalancesMap) {
        Object.assign(tokenObject, {
          balance: this.tokenBalancesMap[((_a = token.address) == null ? void 0 : _a.toLowerCase()) || token.symbol] || 0
        });
      }
      return tokenObject;
    }).sort(this.sortToken);
  }
  get commonTokenDataList() {
    const tokenList = this.tokenDataList;
    if (!tokenList)
      return [];
    return tokenList.filter((token) => token.isCommon || token.isNative);
  }
  get tokenDataListFiltered() {
    let tokenList = this.tokenDataList || [];
    if (tokenList.length) {
      if (this.filterValue) {
        tokenList = tokenList.filter((token) => {
          var _a;
          return token.symbol.toUpperCase().includes(this.filterValue) || token.name.toUpperCase().includes(this.filterValue) || ((_a = token.address) == null ? void 0 : _a.toUpperCase()) === this.filterValue;
        });
      }
      if (this.sortValue !== void 0) {
        tokenList = tokenList.sort((a, b) => {
          return this.sortToken(a, b, this.sortValue);
        });
        const allBalanceZero = !tokenList.some((token) => token.balance && token.balance !== "0");
        if (allBalanceZero && !this.sortValue) {
          tokenList = tokenList.reverse();
        }
      }
    }
    return tokenList;
  }
  sortBalance() {
    this.sortValue = !this.sortValue;
    if (this.sortValue) {
      this.iconSortUp.classList.add("icon-sorted");
      this.iconSortDown.classList.remove("icon-sorted");
    } else {
      this.iconSortUp.classList.remove("icon-sorted");
      this.iconSortDown.classList.add("icon-sorted");
    }
    this.renderTokenItems();
  }
  filterSearch(source) {
    this.filterValue = source.value.toUpperCase();
    this.renderTokenItems();
  }
  async renderCommonItems() {
    if (!this.commonTokenList)
      return;
    this.commonTokenList.innerHTML = "";
    if (this.isCommonShown && this.commonTokenDataList) {
      this.commonTokenPanel.classList.remove("hidden");
      this.commonTokenDataList.forEach((token) => {
        const logoAddress = token.address && !this.targetChainId ? (0, import_store.getTokenIcon)(token.address) : import_assets.default.fullPath((0, import_store.getTokenIconPath)(token, this.chainId));
        this.commonTokenList.appendChild(/* @__PURE__ */ this.$render("i-hstack", {
          background: { color: "var(--background-default)" },
          onClick: () => this.onSelect(token),
          tooltip: { content: token.name },
          verticalAlignment: "center",
          class: "grid-item"
        }, /* @__PURE__ */ this.$render("i-image", {
          width: 24,
          height: 24,
          url: logoAddress,
          fallbackUrl: this.fallbackUrl
        }), /* @__PURE__ */ this.$render("i-label", {
          caption: token.symbol,
          onClick: () => this.onSelect(token)
        })));
      });
    } else {
      this.commonTokenPanel.classList.add("hidden");
    }
  }
  renderToken(token) {
    const logoAddress = token.address && !this.targetChainId ? (0, import_store.getTokenIcon)(token.address) : import_assets.default.fullPath((0, import_store.getTokenIconPath)(token, this.chainId));
    return /* @__PURE__ */ this.$render("i-hstack", {
      background: { color: "none" },
      width: "100%",
      verticalAlignment: "center",
      class: "token-item",
      padding: { top: "0.5rem", bottom: "0.5rem", left: "0.5rem", right: "0.5rem" },
      onClick: () => this.onSelect(token)
    }, /* @__PURE__ */ this.$render("i-vstack", {
      width: "100%"
    }, /* @__PURE__ */ this.$render("i-hstack", null, /* @__PURE__ */ this.$render("i-hstack", null, /* @__PURE__ */ this.$render("i-image", {
      width: 36,
      height: 36,
      url: logoAddress,
      fallbackUrl: this.fallbackUrl
    }), /* @__PURE__ */ this.$render("i-panel", {
      class: "token-info"
    }, /* @__PURE__ */ this.$render("i-label", {
      caption: token.symbol,
      onClick: () => this.onSelect(token)
    }), /* @__PURE__ */ this.$render("i-hstack", {
      class: "token-name",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-label", {
      caption: token.name,
      onClick: () => this.onSelect(token)
    }), token.address && !token.isNative ? /* @__PURE__ */ this.$render("i-icon", {
      name: "copy",
      width: "14px",
      height: "14px",
      fill: Theme2.text.primary,
      margin: { right: 8 },
      tooltip: { content: `${token.symbol} has been copied`, trigger: "click" },
      onClick: () => import_components2.application.copyToClipboard(token.address || ""),
      class: "inline-flex pointer"
    }) : [], token.address && this.checkHasMetaMask ? /* @__PURE__ */ this.$render("i-image", {
      width: 16,
      height: 16,
      url: import_assets.default.fullPath("img/swap/metamask.png"),
      tooltip: { content: "Add to MetaMask" },
      onClick: (target, event) => this.addToMetamask(event, token)
    }) : []))), /* @__PURE__ */ this.$render("i-label", {
      class: "ml-auto",
      caption: (0, import_global.formatNumber)(token.balance, 4),
      onClick: () => this.onSelect(token)
    })), token.isNew ? /* @__PURE__ */ this.$render("i-hstack", {
      horizontalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-button", {
      caption: "Import",
      class: "btn-import",
      margin: { top: 10 },
      height: 34,
      onClick: (source, event) => this.showImportTokenModal(event, token)
    })) : /* @__PURE__ */ this.$render("i-hstack", null)));
  }
  async renderTokenItems() {
    if (!this.tokenList)
      return;
    this.renderCommonItems();
    this.tokenList.innerHTML = "";
    if (this.tokenDataListFiltered.length) {
      const tokenItems = this.tokenDataListFiltered.map((token) => this.renderToken(token));
      this.tokenList.append(...tokenItems);
    } else if (this.targetChainId && this.targetChainId !== (0, import_store.getChainId)()) {
      this.tokenList.innerHTML = "";
      this.tokenList.append(/* @__PURE__ */ this.$render("i-label", {
        class: "text-center mt-1 mb-1",
        caption: "No tokens found"
      }));
    } else {
      try {
        const tokenObj = await (0, import_store.getTokenObject)(this.filterValue, true);
        if (!tokenObj)
          throw new Error("Token is invalid");
        this.tokenList.innerHTML = "";
        this.tokenList.appendChild(this.renderToken(__spreadProps(__spreadValues({}, tokenObj), { isNew: true })));
      } catch (err) {
        this.tokenList.innerHTML = "";
        this.tokenList.append(/* @__PURE__ */ this.$render("i-label", {
          class: "text-center mt-1 mb-1",
          caption: "No tokens found"
        }));
      }
    }
  }
  addToMetamask(event, token) {
    event.stopPropagation();
    const img = `${window.location.origin}${(0, import_store.getTokenIconPath)(token, this.chainId).substring(1)}`;
    window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: img
        }
      }
    });
  }
  async showModal() {
    if (!this.enabled)
      return;
    this.tokenSearch.value = "";
    this.filterValue = "";
    this.sortValue = void 0;
    this.iconSortUp.classList.remove("icon-sorted");
    this.iconSortDown.classList.remove("icon-sorted");
    if (!this.tokenList.innerHTML) {
      await this.initData();
    }
    this.tokenSelectionModal.visible = true;
  }
  updateStatusButton() {
    const status = (0, import_store.isWalletConnected)();
    if (this.btnToken) {
      this.btnToken.enabled = !this.disableSelect && status;
    }
    if (this.btnMax) {
      this.btnMax.enabled = !this.disabledMaxBtn && status;
    }
  }
  updateButton(token) {
    var _a;
    const btnToken = this.btnToken;
    if (!btnToken)
      return;
    try {
      let image = btnToken.querySelector("i-image");
      if (!token) {
        token = (_a = this.tokenDataList) == null ? void 0 : _a.find((v) => {
          var _a2, _b;
          return v.address && v.address == ((_a2 = this.token) == null ? void 0 : _a2.address) || v.symbol == ((_b = this.token) == null ? void 0 : _b.symbol);
        });
      }
      if (!token) {
        btnToken.caption = "Select a token";
        btnToken.classList.remove("has-token");
        this.btnMax.classList.add("hidden");
        if (image) {
          btnToken.removeChild(image);
        }
      } else {
        btnToken.caption = token.symbol;
        btnToken.classList.add("has-token");
        if (this.isBtnMaxShown) {
          this.btnMax.classList.remove("hidden");
        }
        const logoAddress = token.address && !this.targetChainId ? (0, import_store.getTokenIcon)(token.address) : import_assets.default.fullPath((0, import_store.getTokenIconPath)(token, this.chainId));
        if (!image) {
          image = new import_components2.Image(btnToken, {
            width: 20,
            height: 20,
            fallbackUrl: this.fallbackUrl
          });
          btnToken.prepend(image);
        }
        image.url = logoAddress;
      }
    } catch (e) {
    }
  }
  async onSelect(token, isNew = false) {
    this.token = token;
    if (!isNew && token.isNew && !(0, import_store.hasUserToken)(token.address || "", this.chainId)) {
      (0, import_store.setUserTokens)(token, this.chainId);
      (0, import_store.setTokenMap)();
      await (0, import_store.setTokenBalances)();
      this.$eventBus.dispatch(import_global.EventId.EmitNewToken, token);
      isNew = true;
    }
    this.onSelectToken(__spreadProps(__spreadValues({}, token), { isNew }));
    this.tokenSelectionModal.visible = false;
  }
  async init() {
    await this.onWalletConnect();
    super.init();
    this.disableSelect = this.getAttribute("disableSelect", true);
    this.disabledMaxBtn = this.getAttribute("disabledMaxBtn", true);
    this.updateStatusButton();
    this.updateButton(this._token);
    if (!(0, import_store.isWalletConnected)())
      this.disableSelect = false;
  }
  showImportTokenModal(event, token) {
    event.stopPropagation();
    this.importTokenModal.token = token;
    this.importTokenModal.showModal();
    this.importTokenModal.onUpdate = this.onImportToken.bind(this);
  }
  onImportToken(token) {
    this.onSelect(token, true);
  }
  onCloseModal() {
    this.filterValue = "";
    this.renderTokenItems();
  }
  render() {
    return /* @__PURE__ */ this.$render("i-panel", {
      class: "token-selection"
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "flex"
    }, /* @__PURE__ */ this.$render("i-button", {
      id: "btnMax",
      enabled: false,
      class: "custom-btn hidden",
      caption: "Max",
      onClick: () => this.onSetMaxBalance()
    }), /* @__PURE__ */ this.$render("i-button", {
      id: "btnToken",
      enabled: false,
      class: "custom-btn",
      rightIcon: { name: "caret-down" },
      caption: "Select a token",
      onClick: () => this.showModal()
    })), /* @__PURE__ */ this.$render("i-modal", {
      id: "tokenSelectionModal",
      class: "bg-modal",
      title: "Select Token",
      closeIcon: { name: "times" },
      onClose: () => this.onCloseModal()
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "search"
    }, /* @__PURE__ */ this.$render("i-icon", {
      width: 16,
      height: 16,
      name: "search",
      fill: "white"
    }), /* @__PURE__ */ this.$render("i-input", {
      id: "tokenSearch",
      placeholder: "Search name or paste address",
      width: "100%",
      onKeyUp: this.filterSearch.bind(this)
    })), /* @__PURE__ */ this.$render("i-panel", {
      id: "commonTokenPanel",
      class: "common-token"
    }, /* @__PURE__ */ this.$render("i-label", {
      caption: "Common Token"
    }), /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "commonTokenList",
      columnsPerRow: 4,
      gap: { row: "1rem", column: "1rem" },
      class: "common-list",
      verticalAlignment: "center"
    })), /* @__PURE__ */ this.$render("i-panel", {
      id: "sortBalancePanel",
      class: "token-header"
    }, /* @__PURE__ */ this.$render("i-label", {
      caption: "Token"
    }), /* @__PURE__ */ this.$render("i-panel", {
      class: "token-section ml-auto",
      onClick: () => this.sortBalance()
    }, /* @__PURE__ */ this.$render("i-label", {
      class: "mr-1",
      caption: "Balance"
    }), /* @__PURE__ */ this.$render("i-icon", {
      id: "iconSortUp",
      class: "icon-sort-up",
      name: "sort-up"
    }), /* @__PURE__ */ this.$render("i-icon", {
      id: "iconSortDown",
      class: "icon-sort-down",
      name: "sort-down"
    }))), /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "tokenList",
      class: "token-list",
      columnsPerRow: 1
    })), /* @__PURE__ */ this.$render("import-token", {
      id: "importTokenModal"
    }));
  }
};
__decorateClass([
  (0, import_components2.observable)()
], TokenSelection.prototype, "sortValue", 2);
__decorateClass([
  (0, import_components2.observable)()
], TokenSelection.prototype, "filterValue", 2);
TokenSelection = __decorateClass([
  (0, import_components2.customElements)("token-selection")
], TokenSelection);

// src/common/API.ts
var SC_Node_API_URL = "https://ipfs-gateway.scom.dev/api/1.0";
var SC_Node_GET_API_URL = "https://ipfs.scom.dev/ipfs/{CID}";
var updateDataToIPFS = async (data, fileName) => {
  try {
    const response = await fetch(SC_Node_API_URL + "/sync/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data,
        fileName
      })
    });
    let jsonContent = await response.json();
    return jsonContent.data;
  } catch (err) {
    console.dir(err);
    return "";
  }
};
var _fetchFileContentByCID = async (ipfsCid) => {
  const IPFS_Gateway = "https://{CID}.ipfs.dweb.link/";
  let result = await fetch(SC_Node_GET_API_URL.replace("{CID}", ipfsCid));
  return result;
};
var fetchFileJsonContentByCID = async (ipfsCid) => {
  let result = await _fetchFileContentByCID(ipfsCid);
  let packageInfoFileContent = await result.json();
  return packageInfoFileContent;
};
var fetchFileJsonContentByCID2 = async (rootCID) => {
  try {
    let fileCID;
    if (rootCID.startsWith("bafk")) {
      fileCID = rootCID;
    } else {
      const response = await fetch(`https://dweb.link/api/v0/ls?arg=${rootCID}`);
      let jsonContent = await response.json();
      fileCID = jsonContent.Objects[0].Links[0].Hash;
    }
    let fileContent = await fetchFileJsonContentByCID(fileCID);
    return fileContent;
  } catch (err) {
    return null;
  }
};
  
  });