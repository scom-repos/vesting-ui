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
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
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

  // src/scconfig.json
  var require_scconfig = __commonJS({
    "src/scconfig.json"(exports, module) {
      module.exports = {
        name: "@vesting/main",
        version: "0.1.0",
        main: "{root}/main/index.js",
        env: "mainnet",
        init: "{root}/config/index.js",
        routes: [
          {
            url: "#/claims",
            module: "{root}/claims/index.js",
            default: true
          },
          {
            url: "#/claims/:campaignId",
            module: "{root}/claimDetail/index.js"
          },
          {
            url: "#/locks",
            module: "{root}/locks/index.js"
          },
          {
            url: "#/locks/:campaignId",
            module: "{root}/lockDetail/index.js"
          },
          {
            url: "#/newCampaign",
            module: "{root}/newCampaign/index.js"
          },
          {
            url: "#/locks/:campaignId/addLock",
            module: "{root}/newLock/index.js"
          },
          {
            url: "#/config",
            module: "{root}/config/index.js"
          },
          {
            url: "#/admin",
            module: "{root}/admin/index.js"
          }
        ],
        dependencies: {
          moment: "{LIB}/lib/moment/2.29.1/moment.js",
          "@ijstech/eth-wallet-web3modal": "{LIB}/lib/eth-wallet-web3modal/index.js",
          "@scom/sdks": "{root}/sdks/index.js",
          "@vesting/assets": "{root}/assets/index.js",
          "@vesting/global": "{root}/global/index.js",
          "@vesting/store": "{root}/store/index.js",
          "@vesting/common": "{root}/common/index.js"
        },
        menuItems: [
          {
            to: "#/claims",
            text: "Claims",
            img: "img/menu/Swap-Icon.svg"
          },
          {
            to: "#/locks",
            text: "Locks",
            img: "img/menu/Swap-Icon.svg"
          }
        ],
        params: {
          secureComputeInfo: {
            link: "#/",
            img: "img/sc-logo.svg"
          },
          footerPagesInfo: [],
          socialMediaInfo: [],
          projectInfo: [
            {
              caption: "@ 2022 IJS Technologies"
            },
            {
              caption: "Privacy Policy",
              link: "#/"
            }
          ]
        },
        defaultChainId: 43113,
        infuraId: "adc596bf88b648e2a8902bc9093930c5",
        networkList: [
          {
            name: "BSC Testnet",
            chainId: 97,
            img: "img/network/bscMainnet.svg",
            rpc: "https://data-seed-prebsc-2-s2.binance.org:8545/",
            explorerName: "BSCScan",
            explorerTxUrl: "https://testnet.bscscan.com/tx/",
            explorerAddressUrl: "https://testnet.bscscan.com/address/"
          },
          {
            name: "Avalanche FUJI C-Chain",
            chainId: 43113,
            img: "img/network/avax.svg",
            rpc: "https://api.avax-test.network/ext/bc/C/rpc",
            explorerName: "SnowTrace",
            explorerTxUrl: "https://testnet.snowtrace.io/tx/",
            explorerAddressUrl: "https://testnet.snowtrace.io/address/"
          }
        ],
        header: {
          sloganUrl: "img/banner.svg",
          breadcrumb: {
            supportedUrl: [
              "#/claims/:campaignId",
              "#/locks/:campaignId",
              "#/locks/:campaignId/addLock"
            ]
          },
          padding: { top: 16, bottom: 16, left: 15, right: 15 }
        },
        contractInfo: {
          "97": {
            vaultFactory: {
              address: "0x0F4AcB7f01a74a9cbe807ec6Ee707b5731fbF1bC"
            }
          },
          "43113": {
            vaultFactory: {
              address: "0x6Cc5b54e29b690AF42E096843B35c8a1C6A6Bd7d"
            }
          }
        }
      };
    }
  });

  // src/admin/index.tsx
  var import_components = __toModule(__require("@ijstech/components"));
  var import_store2 = __toModule(__require("@vesting/store"));
  var import_assets = __toModule(__require("@vesting/assets"));
  var import_global = __toModule(__require("@vesting/global"));

  // src/admin/API.ts
  var import_eth_wallet = __toModule(__require("@ijstech/eth-wallet"));
  var import_store = __toModule(__require("@vesting/store"));
  var import_vesting_sdk = __toModule(__require("@scom/vesting-sdk"));
  var newProfile = async (admins) => {
    let wallet = import_eth_wallet.Wallet.getInstance();
    let factoryAddress = (0, import_store.getVaultFactoryAddress)();
    if (!factoryAddress)
      return null;
    let factory = new import_vesting_sdk.Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
    let receipt = await factory.newProfile(admins);
    return receipt;
  };
  var getNewProfileId = (receipt) => {
    let wallet = import_eth_wallet.Wallet.getInstance();
    let factoryAddress = (0, import_store.getVaultFactoryAddress)();
    if (!factoryAddress)
      return null;
    let factory = new import_vesting_sdk.Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
    let event = factory.parseNewProfileEvent(receipt)[0];
    return event.profileId.toNumber();
  };

  // src/admin/index.tsx
  import_components.Styles.Theme.applyTheme(import_components.Styles.Theme.darkTheme);
  import_components.Styles.fontFace({
    fontFamily: "montserrat",
    src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Regular.ttf")}") format("truetype")`,
    fontWeight: "900",
    fontStyle: "normal"
  });
  var Admin = class extends import_components.Module {
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
      this.$eventBus = import_components.application.EventBus;
      let scconfig = require_scconfig();
      if (scconfig) {
        (0, import_store2.setDataFromSCConfig)(scconfig);
      }
      this.registerEvents();
    }
    registerEvents() {
      this.$eventBus.register(this, import_global.EventId.IsWalletConnected, this.onWalletConnect);
      this.$eventBus.register(this, import_global.EventId.chainChanged, this.onChainChange);
      this.$eventBus.register(this, import_global.EventId.IsWalletDisconnected, this.onWalletConnect);
    }
    async init() {
      super.init();
      this.adminInfoList = [];
      this.adminRowList = [];
      this.adminRowCount = 0;
      this.addAdmin();
      this.onSetupPage((0, import_store2.isWalletConnected)());
    }
    async onSetupPage(isWalletConnected2) {
      if (isWalletConnected2) {
        let factory = await (0, import_store2.getVaultFactoryAddress)();
        if (factory) {
          this.pnlErrorMsg.visible = false;
          this.pnlMain.visible = true;
        } else {
          this.lbErrorMsg.caption = "No Vault Factory is found on this chain";
          this.pnlErrorMsg.visible = true;
          this.pnlMain.visible = false;
        }
      } else {
        this.lbErrorMsg.caption = "Please connect your wallet";
        this.pnlErrorMsg.visible = true;
        this.pnlMain.visible = false;
      }
    }
    clickRemoveAdmin(target, idx) {
      if (this.adminInfoList.length > 0) {
        const adminInfoIdx = this.adminInfoList.findIndex((v) => v.index == idx);
        if (adminInfoIdx != -1)
          this.adminInfoList.splice(adminInfoIdx, 1);
      }
      if (this.adminRowList.length > idx) {
        this.vstackAdmins.removeChild(this.adminRowList[idx]);
      }
    }
    changeAdminAddress(target, idx) {
      const address = target.value;
      const adminInfoIdx = this.adminInfoList.findIndex((v) => v.index == idx);
      if (adminInfoIdx != -1) {
        this.adminInfoList[adminInfoIdx].address = address;
      } else {
        this.adminInfoList.push({
          address,
          index: idx
        });
      }
    }
    addAdmin() {
      let idx = this.adminRowCount;
      let adminRow;
      if (idx == 0) {
        adminRow = /* @__PURE__ */ this.$render("i-hstack", {
          width: "100%"
        }, /* @__PURE__ */ this.$render("i-input", {
          width: "90%",
          onChanged: (target) => this.changeAdminAddress(target, idx)
        }));
      } else {
        adminRow = /* @__PURE__ */ this.$render("i-hstack", {
          width: "100%"
        }, /* @__PURE__ */ this.$render("i-input", {
          width: "90%",
          onChanged: (target) => this.changeAdminAddress(target, idx)
        }), /* @__PURE__ */ this.$render("i-icon", {
          name: "times",
          fill: "#f7d063",
          height: 18,
          width: 18,
          onClick: (target) => this.clickRemoveAdmin(target, idx)
        }));
      }
      this.vstackAdmins.append(adminRow);
      this.adminRowList.push(adminRow);
      this.adminRowCount++;
    }
    async clickConfirm() {
      const adminAddresses = this.adminInfoList.map((v) => v.address);
      const confirmationCallback = (receipt2) => {
        let profileId = getNewProfileId(receipt2);
        console.log("profileId", profileId);
        this.$eventBus.dispatch("txConfirmed", {
          profileId
        });
      };
      (0, import_global.registerSendTxEvents)({
        confirmation: confirmationCallback
      });
      let receipt = await newProfile(adminAddresses);
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        height: "100%",
        width: "100%"
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "pnlMain",
        width: "100%",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        width: "80%",
        padding: { top: "1rem", bottom: "1rem" }
      }, /* @__PURE__ */ this.$render("i-label", {
        width: "50%",
        caption: "Admins"
      }), /* @__PURE__ */ this.$render("i-vstack", {
        width: "50%",
        id: "vstackAdmins"
      })), /* @__PURE__ */ this.$render("i-hstack", {
        width: "100%",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-button", {
        caption: "Add",
        onClick: this.addAdmin
      })), /* @__PURE__ */ this.$render("i-vstack", {
        width: "100%",
        maxWidth: "1400px",
        horizontalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        width: "calc(100% - 3rem)",
        horizontalAlignment: "end",
        gap: 10,
        margin: { left: "1.5rem", right: "1.5rem", bottom: "1rem" },
        padding: { left: "10", right: "10", bottom: "10", top: "10" }
      }, /* @__PURE__ */ this.$render("i-button", {
        id: "confirmBtn",
        caption: "Confirm",
        width: "200px",
        height: "50",
        onClick: this.clickConfirm
      })))), /* @__PURE__ */ this.$render("i-vstack", {
        id: "pnlErrorMsg",
        visible: false,
        horizontalAlignment: "center",
        verticalAlignment: "center",
        width: "100%",
        height: "100%"
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "lbErrorMsg"
      })));
    }
  };
  Admin = __decorateClass([
    import_components.customModule
  ], Admin);
})();
