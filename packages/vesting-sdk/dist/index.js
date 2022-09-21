define('@scom/vesting-sdk', (require, exports)=>{
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

// src/index.ts
__export(exports, {
  Claimant: () => claimant_exports,
  Contracts: () => contracts_exports,
  LockType: () => LockType,
  Locker: () => locker_exports,
  VestingTreeABI: () => VestingTreeABI,
  getCampaignInfoList: () => getCampaignInfoList
});

// src/contracts/index.ts
var contracts_exports = {};
__export(contracts_exports, {
  Authorization: () => Authorization,
  ERC721: () => ERC721,
  ValidVestingVault: () => ValidVestingVault,
  ValidVestingVaultFactory: () => ValidVestingVaultFactory
});

// src/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts
var import_eth_wallet = __toModule(require("@ijstech/eth-wallet"));

// src/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.ts
var ERC721_json_default = {
  "abi": [
    { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
  ],
  "bytecode": "60806040523480156200001157600080fd5b5060405162001a9038038062001a90833981016040819052620000349162000127565b600062000042838262000220565b50600162000051828262000220565b505050620002ec565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b838211156200011d5760008385830101525b9695505050505050565b600080604083850312156200013b57600080fd5b82516001600160401b03808211156200015357600080fd5b620001618683870162000070565b935060208501519150808211156200017857600080fd5b50620001878582860162000070565b9150509250929050565b600181811c90821680620001a657607f821691505b602082108103620001c757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021b57600081815260208120601f850160051c81016020861015620001f65750805b601f850160051c820191505b81811015620002175782815560010162000202565b5050505b505050565b81516001600160401b038111156200023c576200023c6200005a565b62000254816200024d845462000191565b84620001cd565b602080601f8311600181146200028c5760008415620002735750858301515b600019600386901b1c1916600185901b17855562000217565b600085815260208120601f198616915b82811015620002bd578886015182559484019460019091019084016200029c565b5085821015620002dc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61179480620002fc6000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101d0578063b88d4fde146101e3578063c87b56dd146101f6578063e985e9c51461020957600080fd5b80636352211e1461019457806370a08231146101a757806395d89b41146101c857600080fd5b8063095ea7b3116100bd578063095ea7b31461015957806323b872dd1461016e57806342842e0e1461018157600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004611259565b610252565b60405190151581526020015b60405180910390f35b610114610337565b60405161010391906112ec565b61013461012f3660046112ff565b6103c9565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b61016c610167366004611341565b6103fd565b005b61016c61017c36600461136b565b61058e565b61016c61018f36600461136b565b61062f565b6101346101a23660046112ff565b61064a565b6101ba6101b53660046113a7565b6106d6565b604051908152602001610103565b6101146107a4565b61016c6101de3660046113c2565b6107b3565b61016c6101f136600461142d565b6107c2565b6101146102043660046112ff565b61086a565b6100f7610217366004611527565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806102e557507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061033157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600080546103469061155a565b80601f01602080910402602001604051908101604052809291908181526020018280546103729061155a565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050905090565b60006103d4826108de565b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006104088261064a565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036104ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff821614806104f357506104f38133610217565b61057f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016104c1565b610589838361096c565b505050565b6105983382610a0c565b610624576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f76656400000000000000000000000000000000000060648201526084016104c1565b610589838383610acc565b610589838383604051806020016040528060008152506107c2565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b600073ffffffffffffffffffffffffffffffffffffffff821661077b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016104c1565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6060600180546103469061155a565b6107be338383610d33565b5050565b6107cc3383610a0c565b610858576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f76656400000000000000000000000000000000000060648201526084016104c1565b61086484848484610e60565b50505050565b6060610875826108de565b600061088c60408051602081019091526000815290565b905060008151116108ac57604051806020016040528060008152506108d7565b806108b684610f03565b6040516020016108c79291906115ad565b6040516020818303038152906040525b9392505050565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff16610969576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b50565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915581906109c68261064a565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610a188361064a565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610a86575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b80610ac457508373ffffffffffffffffffffffffffffffffffffffff16610aac846103c9565b73ffffffffffffffffffffffffffffffffffffffff16145b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610aec8261064a565b73ffffffffffffffffffffffffffffffffffffffff1614610b8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104c1565b73ffffffffffffffffffffffffffffffffffffffff8216610c31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104c1565b610c3c60008261096c565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290610c7290849061160b565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290610cad908490611622565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610dc8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104c1565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610e6b848484610acc565b610e7784848484611038565b610864576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b606081600003610f4657505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115610f705780610f5a8161163a565b9150610f699050600a836116a1565b9150610f4a565b60008167ffffffffffffffff811115610f8b57610f8b6113fe565b6040519080825280601f01601f191660200182016040528015610fb5576020820181803683370190505b5090505b8415610ac457610fca60018361160b565b9150610fd7600a866116b5565b610fe2906030611622565b60f81b818381518110610ff757610ff76116c9565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611031600a866116a1565b9450610fb9565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611220576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a02906110af9033908990889088906004016116f8565b6020604051808303816000875af1925050508015611108575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261110591810190611741565b60015b6111d5573d808015611136576040519150601f19603f3d011682016040523d82523d6000602084013e61113b565b606091505b5080516000036111cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610ac4565b506001949350505050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461096957600080fd5b60006020828403121561126b57600080fd5b81356108d78161122b565b60005b83811015611291578181015183820152602001611279565b838111156108645750506000910152565b600081518084526112ba816020860160208601611276565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006108d760208301846112a2565b60006020828403121561131157600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461133c57600080fd5b919050565b6000806040838503121561135457600080fd5b61135d83611318565b946020939093013593505050565b60008060006060848603121561138057600080fd5b61138984611318565b925061139760208501611318565b9150604084013590509250925092565b6000602082840312156113b957600080fd5b6108d782611318565b600080604083850312156113d557600080fd5b6113de83611318565b9150602083013580151581146113f357600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561144357600080fd5b61144c85611318565b935061145a60208601611318565b925060408501359150606085013567ffffffffffffffff8082111561147e57600080fd5b818701915087601f83011261149257600080fd5b8135818111156114a4576114a46113fe565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156114ea576114ea6113fe565b816040528281528a602084870101111561150357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561153a57600080fd5b61154383611318565b915061155160208401611318565b90509250929050565b600181811c9082168061156e57607f821691505b6020821081036115a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600083516115bf818460208801611276565b8351908301906115d3818360208801611276565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008282101561161d5761161d6115dc565b500390565b60008219821115611635576116356115dc565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361166b5761166b6115dc565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000826116b0576116b0611672565b500490565b6000826116c4576116c4611672565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261173760808301846112a2565b9695505050505050565b60006020828403121561175357600080fd5b81516108d78161122b56fea2646970667358221220e7e04c874040f7e432ac5c36fbe72c18b59f02bf921a723b30dff26dde7e3db564736f6c634300080f0033"
};

// src/contracts/@openzeppelin/contracts/token/ERC721/ERC721.ts
var ERC721 = class extends import_eth_wallet.Contract {
  constructor(wallet, address) {
    super(wallet, address, ERC721_json_default.abi, ERC721_json_default.bytecode);
    this.assign();
  }
  deploy(params) {
    return this.__deploy([params.name, params.symbol]);
  }
  parseApprovalEvent(receipt) {
    return this.parseEvents(receipt, "Approval").map((e) => this.decodeApprovalEvent(e));
  }
  decodeApprovalEvent(event) {
    let result = event.data;
    return {
      owner: result.owner,
      approved: result.approved,
      tokenId: new import_eth_wallet.BigNumber(result.tokenId),
      _event: event
    };
  }
  parseApprovalForAllEvent(receipt) {
    return this.parseEvents(receipt, "ApprovalForAll").map((e) => this.decodeApprovalForAllEvent(e));
  }
  decodeApprovalForAllEvent(event) {
    let result = event.data;
    return {
      owner: result.owner,
      operator: result.operator,
      approved: result.approved,
      _event: event
    };
  }
  parseTransferEvent(receipt) {
    return this.parseEvents(receipt, "Transfer").map((e) => this.decodeTransferEvent(e));
  }
  decodeTransferEvent(event) {
    let result = event.data;
    return {
      from: result.from,
      to: result.to,
      tokenId: new import_eth_wallet.BigNumber(result.tokenId),
      _event: event
    };
  }
  assign() {
    let balanceOf_call = async (owner) => {
      let result = await this.call("balanceOf", [owner]);
      return new import_eth_wallet.BigNumber(result);
    };
    this.balanceOf = balanceOf_call;
    let getApproved_call = async (tokenId) => {
      let result = await this.call("getApproved", [import_eth_wallet.Utils.toString(tokenId)]);
      return result;
    };
    this.getApproved = getApproved_call;
    let isApprovedForAllParams = (params) => [params.owner, params.operator];
    let isApprovedForAll_call = async (params) => {
      let result = await this.call("isApprovedForAll", isApprovedForAllParams(params));
      return result;
    };
    this.isApprovedForAll = isApprovedForAll_call;
    let name_call = async () => {
      let result = await this.call("name");
      return result;
    };
    this.name = name_call;
    let ownerOf_call = async (tokenId) => {
      let result = await this.call("ownerOf", [import_eth_wallet.Utils.toString(tokenId)]);
      return result;
    };
    this.ownerOf = ownerOf_call;
    let supportsInterface_call = async (interfaceId) => {
      let result = await this.call("supportsInterface", [interfaceId]);
      return result;
    };
    this.supportsInterface = supportsInterface_call;
    let symbol_call = async () => {
      let result = await this.call("symbol");
      return result;
    };
    this.symbol = symbol_call;
    let tokenURI_call = async (tokenId) => {
      let result = await this.call("tokenURI", [import_eth_wallet.Utils.toString(tokenId)]);
      return result;
    };
    this.tokenURI = tokenURI_call;
    let approveParams = (params) => [params.to, import_eth_wallet.Utils.toString(params.tokenId)];
    let approve_send = async (params) => {
      let result = await this.send("approve", approveParams(params));
      return result;
    };
    let approve_call = async (params) => {
      let result = await this.call("approve", approveParams(params));
      return;
    };
    this.approve = Object.assign(approve_send, {
      call: approve_call
    });
    let safeTransferFromParams = (params) => [params.from, params.to, import_eth_wallet.Utils.toString(params.tokenId)];
    let safeTransferFrom_send = async (params) => {
      let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
      return result;
    };
    let safeTransferFrom_call = async (params) => {
      let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
      return;
    };
    this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
      call: safeTransferFrom_call
    });
    let safeTransferFrom_1Params = (params) => [params.from, params.to, import_eth_wallet.Utils.toString(params.tokenId), import_eth_wallet.Utils.stringToBytes(params.data)];
    let safeTransferFrom_1_send = async (params) => {
      let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
      return result;
    };
    let safeTransferFrom_1_call = async (params) => {
      let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
      return;
    };
    this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
      call: safeTransferFrom_1_call
    });
    let setApprovalForAllParams = (params) => [params.operator, params.approved];
    let setApprovalForAll_send = async (params) => {
      let result = await this.send("setApprovalForAll", setApprovalForAllParams(params));
      return result;
    };
    let setApprovalForAll_call = async (params) => {
      let result = await this.call("setApprovalForAll", setApprovalForAllParams(params));
      return;
    };
    this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
      call: setApprovalForAll_call
    });
    let transferFromParams = (params) => [params.from, params.to, import_eth_wallet.Utils.toString(params.tokenId)];
    let transferFrom_send = async (params) => {
      let result = await this.send("transferFrom", transferFromParams(params));
      return result;
    };
    let transferFrom_call = async (params) => {
      let result = await this.call("transferFrom", transferFromParams(params));
      return;
    };
    this.transferFrom = Object.assign(transferFrom_send, {
      call: transferFrom_call
    });
  }
};

// src/contracts/Authorization.ts
var import_eth_wallet2 = __toModule(require("@ijstech/eth-wallet"));

// src/contracts/Authorization.json.ts
var Authorization_json_default = {
  "abi": [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
  ],
  "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e6806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f11461010b578063a2f55ae51461011e578063d4ee1d9014610131578063f2fde38b1461015157600080fd5b80633fd8cc4e1461008257806360536172146100bc5780638da5cb5b146100c6575b600080fd5b6100a5610090366004610473565b60026020526000908152604090205460ff1681565b60405160ff90911681526020015b60405180910390f35b6100c4610164565b005b6000546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b3565b6100c4610119366004610473565b610292565b6100c461012c366004610473565b610339565b6001546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b6100c461015f366004610473565b6103dc565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032e565b60005473ffffffffffffffffffffffffffffffffffffffff16331461040057600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032e565b60006020828403121561048557600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a957600080fd5b939250505056fea2646970667358221220204dfa718d2d1509da75a054da35a6893fbad4ff68b8ea7f6cd08014cb27d22564736f6c634300080f0033"
};

// src/contracts/Authorization.ts
var Authorization = class extends import_eth_wallet2.Contract {
  constructor(wallet, address) {
    super(wallet, address, Authorization_json_default.abi, Authorization_json_default.bytecode);
    this.assign();
  }
  deploy() {
    return this.__deploy();
  }
  parseAuthorizeEvent(receipt) {
    return this.parseEvents(receipt, "Authorize").map((e) => this.decodeAuthorizeEvent(e));
  }
  decodeAuthorizeEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseDeauthorizeEvent(receipt) {
    return this.parseEvents(receipt, "Deauthorize").map((e) => this.decodeDeauthorizeEvent(e));
  }
  decodeDeauthorizeEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseStartOwnershipTransferEvent(receipt) {
    return this.parseEvents(receipt, "StartOwnershipTransfer").map((e) => this.decodeStartOwnershipTransferEvent(e));
  }
  decodeStartOwnershipTransferEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseTransferOwnershipEvent(receipt) {
    return this.parseEvents(receipt, "TransferOwnership").map((e) => this.decodeTransferOwnershipEvent(e));
  }
  decodeTransferOwnershipEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  assign() {
    let isPermitted_call = async (param1) => {
      let result = await this.call("isPermitted", [param1]);
      return new import_eth_wallet2.BigNumber(result);
    };
    this.isPermitted = isPermitted_call;
    let newOwner_call = async () => {
      let result = await this.call("newOwner");
      return result;
    };
    this.newOwner = newOwner_call;
    let owner_call = async () => {
      let result = await this.call("owner");
      return result;
    };
    this.owner = owner_call;
    let deny_send = async (user) => {
      let result = await this.send("deny", [user]);
      return result;
    };
    let deny_call = async (user) => {
      let result = await this.call("deny", [user]);
      return;
    };
    this.deny = Object.assign(deny_send, {
      call: deny_call
    });
    let permit_send = async (user) => {
      let result = await this.send("permit", [user]);
      return result;
    };
    let permit_call = async (user) => {
      let result = await this.call("permit", [user]);
      return;
    };
    this.permit = Object.assign(permit_send, {
      call: permit_call
    });
    let takeOwnership_send = async () => {
      let result = await this.send("takeOwnership");
      return result;
    };
    let takeOwnership_call = async () => {
      let result = await this.call("takeOwnership");
      return;
    };
    this.takeOwnership = Object.assign(takeOwnership_send, {
      call: takeOwnership_call
    });
    let transferOwnership_send = async (newOwner) => {
      let result = await this.send("transferOwnership", [newOwner]);
      return result;
    };
    let transferOwnership_call = async (newOwner) => {
      let result = await this.call("transferOwnership", [newOwner]);
      return;
    };
    this.transferOwnership = Object.assign(transferOwnership_send, {
      call: transferOwnership_call
    });
  }
};

// src/contracts/ValidVestingVault.ts
var import_eth_wallet3 = __toModule(require("@ijstech/eth-wallet"));

// src/contracts/ValidVestingVault.json.ts
var ValidVestingVault_json_default = {
  "abi": [
    { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "nftId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalClaimed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "Claim", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endDate", "type": "uint256" }], "name": "CreateVesting", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "Lock", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "nftId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "Mint", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "NewCampaign", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "dataUri", "type": "string" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "UpdateCampaign", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignClaimed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "campaignIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignInfo", "outputs": [{ "internalType": "string", "name": "dataUri", "type": "string" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "bool", "name": "ownerFrozen", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignLocked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignLocks", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "campaignLocksLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }], "name": "directLock", "outputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "name": "getInfo", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "unclaimedFunds", "type": "uint256" }, { "internalType": "uint256", "name": "claimedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "totalAmount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "isLockIdVerified", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "locks", "outputs": [{ "internalType": "enum ValidVestingVault.LockType", "name": "lockType", "type": "uint8" }, { "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "internalType": "string", "name": "dataUri", "type": "string" }, { "internalType": "bytes32", "name": "root", "type": "bytes32" }, { "internalType": "uint64", "name": "dateCreated", "type": "uint64" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "locksLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "vestingId", "type": "uint256" }], "name": "maximumAllowedClaimedFunds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "merkleLock", "outputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "bool", "name": "ownerFrozen", "type": "bool" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "newCampaign", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "nftIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "nftVestingId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "updateCampaign", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "verifyDirectLock", "outputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "verifyMerkleLock", "outputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vestingClaimedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "vestingIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vestingInfo", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }, { "internalType": "enum ValidVestingVault.VestingStatus", "name": "status", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
  ],
  "bytecode": "60806040523480156200001157600080fd5b506040516200562638038062005626833981016040819052620000349162000150565b600080546001600160a01b031916331790558181600362000056838262000249565b50600462000065828262000249565b5050601080546001600160a01b031916331790555062000315915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000ab57600080fd5b81516001600160401b0380821115620000c857620000c862000083565b604051601f8301601f19908116603f01168101908282118183101715620000f357620000f362000083565b816040528381526020925086838588010111156200011057600080fd5b600091505b8382101562000134578582018301518183018401529082019062000115565b83821115620001465760008385830101525b9695505050505050565b600080604083850312156200016457600080fd5b82516001600160401b03808211156200017c57600080fd5b6200018a8683870162000099565b93506020850151915080821115620001a157600080fd5b50620001b08582860162000099565b9150509250929050565b600181811c90821680620001cf57607f821691505b602082108103620001f057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200024457600081815260208120601f850160051c810160208610156200021f5750805b601f850160051c820191505b8181101562000240578281556001016200022b565b5050505b505050565b81516001600160401b0381111562000265576200026562000083565b6200027d81620002768454620001ba565b84620001f6565b602080601f831160018114620002b557600084156200029c5750858301515b600019600386901b1c1916600185901b17855562000240565b600085815260208120601f198616915b82811015620002e657888601518255948401946001909101908401620002c5565b5085821015620003055787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61530180620003256000396000f3fe608060405234801561001057600080fd5b50600436106103365760003560e01c80636352211e116101b2578063ae205176116100f9578063e5bc504a116100a2578063f148550f1161007c578063f148550f1461084a578063f2fde38b1461085d578063f4dadc6114610870578063f7c8d2211461089457600080fd5b8063e5bc504a146107db578063e9217bd1146107ee578063e985e9c51461080157600080fd5b8063c45a0155116100d3578063c45a015514610788578063c87b56dd146107a8578063d4ee1d90146107bb57600080fd5b8063ae20517614610733578063b88d4fde14610753578063bb2238ec1461076657600080fd5b80639051cce91161015b5780639c52a7f1116101355780639c52a7f1146106fa578063a22cb4651461070d578063a2f55ae51461072057600080fd5b80639051cce9146106cc578063958ddc98146106df57806395d89b41146106f257600080fd5b80637c4556c11161018c5780637c4556c1146106835780638101f2bd1461068c5780638da5cb5b146106ac57600080fd5b80636352211e146105ee57806366ffcf5f1461060157806370a082311461067057600080fd5b806323b872dd116102815780634a0e835b1161022a578063511aed9911610204578063511aed99146105a75780635757afc5146105b05780635bfc5a6e146105de57806360536172146105e657600080fd5b80634a0e835b146105615780634ca14703146105815780634f6ccce71461059457600080fd5b8063379607f51161025b578063379607f5146105065780633fd8cc4e1461051957806342842e0e1461054e57600080fd5b806323b872dd146104d757806329014d2a146104ea5780632f745c59146104f357600080fd5b806312f308fa116102e357806318160ddd116102bd57806318160ddd1461044c5780631a3cd59a146104545780631c86fa90146104c457600080fd5b806312f308fa1461040657806313af403514610419578063141a93291461042c57600080fd5b8063089fd09d11610314578063089fd09d146103b0578063095ea7b3146103d15780630b651d2f146103e657600080fd5b806301ffc9a71461033b57806306fdde0314610363578063081812fc14610378575b600080fd5b61034e6103493660046145a6565b6108a7565b60405190151581526020015b60405180910390f35b61036b610903565b60405161035a9190614639565b61038b61038636600461464c565b610995565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161035a565b6103c36103be366004614687565b6109c9565b60405190815260200161035a565b6103e46103df3660046146cf565b610c63565b005b6103c36103f436600461464c565b60196020526000908152604090205481565b6103c36104143660046146fb565b610def565b6103e46104273660046147a1565b611106565b6103c361043a36600461464c565b60186020526000908152604090205481565b600b546103c3565b61046761046236600461464c565b6111ce565b60408051998a5260208a019890985273ffffffffffffffffffffffffffffffffffffffff96871697890197909752949093166060870152608086019190915260a085015260c084015260e08301526101008201526101200161035a565b6103c36104d2366004614807565b611302565b6103e46104e5366004614868565b6115fd565b6103c3600d5481565b6103c36105013660046146cf565b61169e565b6103e461051436600461464c565b61176d565b61053c6105273660046147a1565b60026020526000908152604090205460ff1681565b60405160ff909116815260200161035a565b6103e461055c366004614868565b611779565b6103c361056f36600461464c565b60126020526000908152604090205481565b6103e461058f3660046148a9565b611794565b6103c36105a236600461464c565b61190d565b6103c3600e5481565b61034e6105be3660046146cf565b601360209081526000928352604080842090915290825290205460ff1681565b6011546103c3565b6103e46119cb565b61038b6105fc36600461464c565b611af5565b61065e61060f36600461464c565b601660205260009081526040902080546001820154600283015460038401546004850154600590950154939473ffffffffffffffffffffffffffffffffffffffff909316939192909160ff1686565b60405161035a9695949392919061495b565b6103c361067e3660046147a1565b611b81565b6103c3600f5481565b6103c361069a36600461464c565b60176020526000908152604090205481565b60005461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103e46106da366004614a2c565b611c4f565b6103c36106ed36600461464c565b611c90565b61036b611db9565b6103e46107083660046147a1565b611dc8565b6103e461071b366004614ae0565b611e6f565b6103e461072e3660046147a1565b611e7e565b6103c361074136600461464c565b60009081526014602052604090205490565b6103e4610761366004614b19565b611f21565b61077961077436600461464c565b611fc9565b60405161035a93929190614bfb565b60105461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b61036b6107b636600461464c565b6120a1565b60015461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103c36107e9366004614c3b565b612115565b6103c36107fc366004614c5d565b612146565b61034e61080f366004614cc2565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260086020908152604080832093909416825291909152205460ff1690565b6103c361085836600461464c565b612387565b6103e461086b3660046147a1565b6126ae565b61088361087e36600461464c565b612745565b60405161035a959493929190614cf0565b6103e46108a23660046146cf565b61281f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806108fd57506108fd82612864565b92915050565b60606003805461091290614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461093e90614d3a565b801561098b5780601f106109605761010080835404028352916020019161098b565b820191906000526020600020905b81548152906001019060200180831161096e57829003601f168201915b5050505050905090565b60006109a082612947565b5060009081526007602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b3360009081526002602052604081205460ff16600114610a70576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff16610aa38133876129d2565b94506000610ab48888888888612b29565b6011805460008b815260146020908152604080832080546001808201835591855283852001859055815160a0810183528481528084018890528251938401835284845291820192909252606081018390524267ffffffffffffffff1660808201528454808301865594909252815160059094027f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c680180549398509495509093929183917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115610b8d57610b8d6148f5565b02179055506020820151600182015560408201516002820190610bb09082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008881526018602052604081208054889290610c1a908490614f24565b90915550506040518681523390899085907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a4505095945050505050565b6000610c6e82611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610a67565b3373ffffffffffffffffffffffffffffffffffffffff82161480610d545750610d54813361080f565b610de0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a67565b610dea8383612d5e565b505050565b6000600160118981548110610e0657610e06614f3c565b600091825260209091206005909102015460ff166001811115610e2b57610e2b6148f5565b14610e92576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b610f5e83838080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050601180549092508c91508110610ede57610ede614f3c565b6000918252602091829020600360059092020101546040517fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003360601b1692810192909252603482018b9052605482018a905260748201899052609482018890529060b40160405160208183030381529060405280519060200120612e39565b610fc4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f6d65726b6c652070726f6f66206661696c6564000000000000000000000000006044820152606401610a67565b3360009081526013602090815260408083208b845290915290205460ff1615611049576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f6d65726b6c65496420616c7265616479207665726966696564000000000000006044820152606401610a67565b60006110588833898989612b29565b600f8054935090915060019060006110708386614f24565b9091555050600082815260176020908152604080832084905533808452601383528184208d855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905551909184918b917f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a091a46110fa3383612e4f565b50979650505050505050565b60105473ffffffffffffffffffffffffffffffffffffffff163314611187576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f742066726f6d20666163746f7279000000000000000000000000000000006044820152606401610a67565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008060008060008060006111e58a611af5565b60008b81526017602090815260408083205480845260168352818420825160c0810184528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169582019590955260028201549381019390935260038101546060840152600481015460808401526005810154919d50949b5092939092909160a084019160ff1690811115611279576112796148f5565b600181111561128a5761128a6148f5565b9052508051600081815260156020526040902060010154909b5073ffffffffffffffffffffffffffffffffffffffff16975090506112c789612e69565b9550601260008a8152602001908152602001600020549450806040015193508060600151925080608001519150509193959799909294969850565b3360009081526002602052604081205460ff166001146113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161140b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b5060118054600087815260146020908152604080832080546001808201835591855283852001859055815160a081018352908152808301939093528051601f870183900483028101830182528681529394939083019187908790819084018382808284376000920182905250938552505050602080830189905267ffffffffffffffff4216604090930192909252835460018181018655948252919020825160059092020180549293909283917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009091169083818111156114ee576114ee6148f5565b021790555060208201516001820155604082015160028201906115119082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff166115908133886129d2565b9550856018600089815260200190815260200160002060008282546115b59190614f24565b90915550506040518681523390889084907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a45095945050505050565b6116073382612e8b565b611693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b610dea838383612f4a565b60006116a983611b81565b8210611737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600960209081526040808320938352929052205490565b611776816130b6565b50565b610dea83838360405180602001604052806000815250611f21565b3360009081526002602052604090205460ff16600114611836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8061189d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b60008381526015602052604090206118b6828483614f6b565b503373ffffffffffffffffffffffffffffffffffffffff16837f827c032fe6cd1eed9fd542005e6a56d0c5e80bc6e38171ab664069244da148198484604051611900929190615085565b60405180910390a3505050565b6000611918600b5490565b82106119a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610a67565b600b82815481106119b9576119b9614f3c565b90600052602060002001549050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314611a72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60008181526005602052604081205473ffffffffffffffffffffffffffffffffffffffff16806108fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b600073ffffffffffffffffffffffffffffffffffffffff8216611c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e657200000000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205490565b805160005b81811015610dea57611c7e838281518110611c7157611c71614f3c565b60200260200101516130b6565b80611c88816150d2565b915050611c54565b6000818152601660209081526040808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154849360a084019160ff1690811115611d0f57611d0f6148f5565b6001811115611d2057611d206148f5565b8152505090508060600151421015611d3b5750600092915050565b8060600151816080015103611d54576040015192915050565b80608001514210611d69576040015192915050565b6000816060015142611d7b919061510a565b9050600082606001518360800151611d93919061510a565b905080828460400151611da69190615121565b611db0919061518d565b95945050505050565b60606004805461091290614d3a565b60005473ffffffffffffffffffffffffffffffffffffffff163314611dec57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b611e7a338383613399565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611ea257600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101611e64565b611f2b3383612e8b565b611fb7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b611fc3848484846134be565b50505050565b601560205260009081526040902080548190611fe490614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461201090614d3a565b801561205d5780601f106120325761010080835404028352916020019161205d565b820191906000526020600020905b81548152906001019060200180831161204057829003601f168201915b5050506001909301549192505073ffffffffffffffffffffffffffffffffffffffff81169060ff740100000000000000000000000000000000000000009091041683565b60606120ac82612947565b60006120c360408051602081019091526000815290565b905060008151116120e3576040518060200160405280600081525061210e565b806120ed84613561565b6040516020016120fe9291906151a1565b6040516020818303038152906040525b9392505050565b6014602052816000526040600020818154811061213157600080fd5b90600052602060002001600091509150505481565b3360009081526002602052604081205460ff166001146121e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161224f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b600d6000815461225e906150d2565b91829055506040805160806020601f87018190040282018101909252606081018581529293509182918690869081908501838280828437600092018290525093855250505073ffffffffffffffffffffffffffffffffffffffff88166020808401919091528715156040938401528482526015905220815181906122e29082614ddb565b50602082015160019091018054604093840151151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff9093169290921791909117905551339082907fec43c2ba7667c935356219eb87401926de2a65b331b1867aeb9b05626677f53b90600090a3949350505050565b6000806011838154811061239d5761239d614f3c565b600091825260209091206005909102015460ff1660018111156123c2576123c26148f5565b14612429576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b33600090815260136020908152604080832085845290915290205460ff16156124ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f76657374696e67496420616c72656164792076657269666965640000000000006044820152606401610a67565b6000601183815481106124c3576124c3614f3c565b60009182526020808320600592830201600190810154808552601683526040808620815160c081018352815481528185015473ffffffffffffffffffffffffffffffffffffffff169581019590955260028101549185019190915260038101546060850152600481015460808501529384015490955091929160a084019160ff90911690811115612556576125566148f5565b6001811115612567576125676148f5565b815250509050806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612606576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f526563697069656e74206e6f74206d61746368000000000000000000000000006044820152606401610a67565b600f80549350600190600061261b8387614f24565b90915550506000838152601760209081526040808320859055338084526013835281842088855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905583519051919286927f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a09190a46126a73384612e4f565b5050919050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146126d257600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001611e64565b6011818154811061275557600080fd5b600091825260209091206005909102018054600182015460028301805460ff909316945090929161278590614d3a565b80601f01602080910402602001604051908101604052809291908181526020018280546127b190614d3a565b80156127fe5780601f106127d3576101008083540402835291602001916127fe565b820191906000526020600020905b8154815290600101906020018083116127e157829003601f168201915b50505050600383015460049093015491929167ffffffffffffffff16905085565b60005473ffffffffffffffffffffffffffffffffffffffff16331461284357600080fd5b611e7a73ffffffffffffffffffffffffffffffffffffffff83163383613696565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806128f757507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806108fd57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146108fd565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff16611776576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015612a3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6391906151d0565b9050612a8773ffffffffffffffffffffffffffffffffffffffff851684308561376a565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa158015612af3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b1791906151d0565b612b21919061510a565b949350505050565b600081831115612bbb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f537461727420646174652063616e6e6f74206265206c61746572207468616e2060448201527f656e6420646174650000000000000000000000000000000000000000000000006064820152608401610a67565b600e60008154612bca906150d2565b91905081905590506040518060c001604052808781526020018673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200160006001811115612c2457612c246148f5565b90526000828152601660209081526040918290208351815590830151600180830180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff90931692909217909155918301516002820155606083015160038201556080830151600482015560a08301516005820180549293919290917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115612cec57612cec6148f5565b02179055505060408051838152602081018790529081018590526060810184905273ffffffffffffffffffffffffffffffffffffffff8716915087907f82debb28bd576b13304dd9103c74c7b554c1de8e996c8576dc43dbfca4a1bd0f9060800160405180910390a395945050505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff84161580612dc9575060008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16155b612e2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b611fc384846137c8565b600082612e468584613868565b14949350505050565b611e7a8282604051806020016040528060008152506138b5565b600081815260126020526040812054612e8183611c90565b6108fd919061510a565b600080612e9783611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480612f05575073ffffffffffffffffffffffffffffffffffffffff80821660009081526008602090815260408083209388168352929052205460ff165b80612b2157508373ffffffffffffffffffffffffffffffffffffffff16612f2b84610995565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff80861690851603613010576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f43616e6e6f74207472616e7366657220746f207468652073616d65206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610a67565b60008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16156130a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b6130af858585613958565b5050505050565b600081815260176020526040902054336130cf83611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f43616e6e6f7420636c61696d2829206f6e206120746f6b656e2062656c6f6e6760448201527f696e6720746f20616e6f746865722061646472657373210000000000000000006064820152608401610a67565b600061317d82611c90565b600083815260126020526040902054909150810361319a57505050565b6000828152601260205260408120546131b3908361510a565b600084815260126020908152604080832086905560168252808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154949550929390929160a084019160ff1690811115613242576132426148f5565b6001811115613253576132536148f5565b905250905060008160a001516001811115613270576132706148f5565b146132d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f496e6163746976652076657374696e67000000000000000000000000000000006044820152606401610a67565b600084815260126020526040908190205482820151915187927fa21b52191f39061227a0dd21f4fc770a4a74c59b7c026fb7e3c5ba8e303d21eb9261332f928792909283526020830191909152604082015260600190565b60405180910390a2805160009081526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff1661336c813385613696565b81516000908152601960205260408120805485929061338c908490614f24565b9091555050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361342e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a67565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526008602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611900565b6134c9848484612f4a565b6134d584848484613bca565b611fc3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b6060816000036135a457505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156135ce57806135b8816150d2565b91506135c79050600a8361518d565b91506135a8565b60008167ffffffffffffffff8111156135e9576135e96149ae565b6040519080825280601f01601f191660200182016040528015613613576020820181803683370190505b5090505b8415612b215761362860018361510a565b9150613635600a866151e9565b613640906030614f24565b60f81b81838151811061365557613655614f3c565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061368f600a8661518d565b9450613617565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610dea9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613dbd565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052611fc39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016136e8565b600081815260076020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155819061382282611af5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081815b84518110156138ad576138998286838151811061388c5761388c614f3c565b6020026020010151613ec9565b9150806138a5816150d2565b91505061386d565b509392505050565b6138bf8383613ef5565b6138cc6000848484613bca565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b8273ffffffffffffffffffffffffffffffffffffffff1661397882611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613a1b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff8216613abd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610a67565b613ac88383836140c3565b613ad3600082612d5e565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600660205260408120805460019290613b0990849061510a565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290613b44908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15613db2576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290613c419033908990889088906004016151fd565b6020604051808303816000875af1925050508015613c9a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252613c9791810190615246565b60015b613d67573d808015613cc8576040519150601f19603f3d011682016040523d82523d6000602084013e613ccd565b606091505b508051600003613d5f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050612b21565b506001949350505050565b6000613e1f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166141c99092919063ffffffff16565b805190915015610dea5780806020019051810190613e3d9190615263565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610a67565b6000818310613ee557600082815260208490526040902061210e565b5060009182526020526040902090565b73ffffffffffffffffffffffffffffffffffffffff8216613f72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a67565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff1615613ffe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a67565b61400a600083836140c3565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290614040908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b73ffffffffffffffffffffffffffffffffffffffff831661412b5761412681600b80546000838152600c60205260408120829055600182018355919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90155565b614168565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146141685761416883826141d8565b73ffffffffffffffffffffffffffffffffffffffff821661418c57610dea8161428f565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610dea57610dea828261433e565b6060612b21848460008561438f565b600060016141e584611b81565b6141ef919061510a565b6000838152600a602052604090205490915080821461424f5773ffffffffffffffffffffffffffffffffffffffff841660009081526009602090815260408083208584528252808320548484528184208190558352600a90915290208190555b506000918252600a6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600981528383209183525290812055565b600b546000906142a19060019061510a565b6000838152600c6020526040812054600b80549394509092849081106142c9576142c9614f3c565b9060005260206000200154905080600b83815481106142ea576142ea614f3c565b6000918252602080832090910192909255828152600c9091526040808220849055858252812055600b80548061432257614322615280565b6001900381819060005260206000200160009055905550505050565b600061434983611b81565b73ffffffffffffffffffffffffffffffffffffffff90931660009081526009602090815260408083208684528252808320859055938252600a9052919091209190915550565b606082471015614421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff85163b61449f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a67565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516144c891906152af565b60006040518083038185875af1925050503d8060008114614505576040519150601f19603f3d011682016040523d82523d6000602084013e61450a565b606091505b509150915061451a828286614525565b979650505050505050565b6060831561453457508161210e565b8251156145445782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a679190614639565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461177657600080fd5b6000602082840312156145b857600080fd5b813561210e81614578565b60005b838110156145de5781810151838201526020016145c6565b83811115611fc35750506000910152565b600081518084526146078160208601602086016145c3565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061210e60208301846145ef565b60006020828403121561465e57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461177657600080fd5b600080600080600060a0868803121561469f57600080fd5b8535945060208601356146b181614665565b94979496505050506040830135926060810135926080909101359150565b600080604083850312156146e257600080fd5b82356146ed81614665565b946020939093013593505050565b600080600080600080600060c0888a03121561471657600080fd5b873596506020880135955060408801359450606088013593506080880135925060a088013567ffffffffffffffff8082111561475157600080fd5b818a0191508a601f83011261476557600080fd5b81358181111561477457600080fd5b8b60208260051b850101111561478957600080fd5b60208301945080935050505092959891949750929550565b6000602082840312156147b357600080fd5b813561210e81614665565b60008083601f8401126147d057600080fd5b50813567ffffffffffffffff8111156147e857600080fd5b60208301915083602082850101111561480057600080fd5b9250929050565b60008060008060006080868803121561481f57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561484b57600080fd5b614857888289016147be565b969995985093965092949392505050565b60008060006060848603121561487d57600080fd5b833561488881614665565b9250602084013561489881614665565b929592945050506040919091013590565b6000806000604084860312156148be57600080fd5b83359250602084013567ffffffffffffffff8111156148dc57600080fd5b6148e8868287016147be565b9497909650939450505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611776577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060c08201905087825273ffffffffffffffffffffffffffffffffffffffff8716602083015285604083015284606083015283608083015261499d83614924565b8260a0830152979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614a2457614a246149ae565b604052919050565b60006020808385031215614a3f57600080fd5b823567ffffffffffffffff80821115614a5757600080fd5b818501915085601f830112614a6b57600080fd5b813581811115614a7d57614a7d6149ae565b8060051b9150614a8e8483016149dd565b8181529183018401918481019088841115614aa857600080fd5b938501935b83851015614ac657843582529385019390850190614aad565b98975050505050505050565b801515811461177657600080fd5b60008060408385031215614af357600080fd5b8235614afe81614665565b91506020830135614b0e81614ad2565b809150509250929050565b60008060008060808587031215614b2f57600080fd5b8435614b3a81614665565b9350602085810135614b4b81614665565b935060408601359250606086013567ffffffffffffffff80821115614b6f57600080fd5b818801915088601f830112614b8357600080fd5b813581811115614b9557614b956149ae565b614bc5847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016149dd565b91508082528984828501011115614bdb57600080fd5b808484018584013760008482840101525080935050505092959194509250565b606081526000614c0e60608301866145ef565b73ffffffffffffffffffffffffffffffffffffffff94909416602083015250901515604090910152919050565b60008060408385031215614c4e57600080fd5b50508035926020909101359150565b60008060008060608587031215614c7357600080fd5b8435614c7e81614665565b93506020850135614c8e81614ad2565b9250604085013567ffffffffffffffff811115614caa57600080fd5b614cb6878288016147be565b95989497509550505050565b60008060408385031215614cd557600080fd5b8235614ce081614665565b91506020830135614b0e81614665565b614cf986614924565b85815284602082015260a060408201526000614d1860a08301866145ef565b905083606083015267ffffffffffffffff831660808301529695505050505050565b600181811c90821680614d4e57607f821691505b602082108103614d87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610dea57600081815260208120601f850160051c81016020861015614db45750805b601f850160051c820191505b81811015614dd357828155600101614dc0565b505050505050565b815167ffffffffffffffff811115614df557614df56149ae565b614e0981614e038454614d3a565b84614d8d565b602080601f831160018114614e5c5760008415614e265750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555614dd3565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015614ea957888601518255948401946001909101908401614e8a565b5085821015614ee557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115614f3757614f37614ef5565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b67ffffffffffffffff831115614f8357614f836149ae565b614f9783614f918354614d3a565b83614d8d565b6000601f841160018114614fe95760008515614fb35750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556130af565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156150385786850135825560209485019460019092019101615018565b5086821015615073577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b60208152816020820152818360408301376000818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361510357615103614ef5565b5060010190565b60008282101561511c5761511c614ef5565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561515957615159614ef5565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008261519c5761519c61515e565b500490565b600083516151b38184602088016145c3565b8351908301906151c78183602088016145c3565b01949350505050565b6000602082840312156151e257600080fd5b5051919050565b6000826151f8576151f861515e565b500690565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261523c60808301846145ef565b9695505050505050565b60006020828403121561525857600080fd5b815161210e81614578565b60006020828403121561527557600080fd5b815161210e81614ad2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600082516152c18184602087016145c3565b919091019291505056fea2646970667358221220c75228f6738897c83ad44edcca58555726708e1798e01724df10c8c5c904cd1f64736f6c634300080f0033"
};

// src/contracts/ValidVestingVault.ts
var ValidVestingVault = class extends import_eth_wallet3.Contract {
  constructor(wallet, address) {
    super(wallet, address, ValidVestingVault_json_default.abi, ValidVestingVault_json_default.bytecode);
    this.assign();
  }
  deploy(params) {
    return this.__deploy([params.name, params.symbol]);
  }
  parseApprovalEvent(receipt) {
    return this.parseEvents(receipt, "Approval").map((e) => this.decodeApprovalEvent(e));
  }
  decodeApprovalEvent(event) {
    let result = event.data;
    return {
      owner: result.owner,
      approved: result.approved,
      tokenId: new import_eth_wallet3.BigNumber(result.tokenId),
      _event: event
    };
  }
  parseApprovalForAllEvent(receipt) {
    return this.parseEvents(receipt, "ApprovalForAll").map((e) => this.decodeApprovalForAllEvent(e));
  }
  decodeApprovalForAllEvent(event) {
    let result = event.data;
    return {
      owner: result.owner,
      operator: result.operator,
      approved: result.approved,
      _event: event
    };
  }
  parseAuthorizeEvent(receipt) {
    return this.parseEvents(receipt, "Authorize").map((e) => this.decodeAuthorizeEvent(e));
  }
  decodeAuthorizeEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseClaimEvent(receipt) {
    return this.parseEvents(receipt, "Claim").map((e) => this.decodeClaimEvent(e));
  }
  decodeClaimEvent(event) {
    let result = event.data;
    return {
      nftId: new import_eth_wallet3.BigNumber(result.nftId),
      amount: new import_eth_wallet3.BigNumber(result.amount),
      totalClaimed: new import_eth_wallet3.BigNumber(result.totalClaimed),
      totalAmount: new import_eth_wallet3.BigNumber(result.totalAmount),
      _event: event
    };
  }
  parseCreateVestingEvent(receipt) {
    return this.parseEvents(receipt, "CreateVesting").map((e) => this.decodeCreateVestingEvent(e));
  }
  decodeCreateVestingEvent(event) {
    let result = event.data;
    return {
      campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
      vestingId: new import_eth_wallet3.BigNumber(result.vestingId),
      recipient: result.recipient,
      amount: new import_eth_wallet3.BigNumber(result.amount),
      startDate: new import_eth_wallet3.BigNumber(result.startDate),
      endDate: new import_eth_wallet3.BigNumber(result.endDate),
      _event: event
    };
  }
  parseDeauthorizeEvent(receipt) {
    return this.parseEvents(receipt, "Deauthorize").map((e) => this.decodeDeauthorizeEvent(e));
  }
  decodeDeauthorizeEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseLockEvent(receipt) {
    return this.parseEvents(receipt, "Lock").map((e) => this.decodeLockEvent(e));
  }
  decodeLockEvent(event) {
    let result = event.data;
    return {
      lockId: new import_eth_wallet3.BigNumber(result.lockId),
      campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
      amount: new import_eth_wallet3.BigNumber(result.amount),
      sender: result.sender,
      _event: event
    };
  }
  parseMintEvent(receipt) {
    return this.parseEvents(receipt, "Mint").map((e) => this.decodeMintEvent(e));
  }
  decodeMintEvent(event) {
    let result = event.data;
    return {
      campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
      nftId: new import_eth_wallet3.BigNumber(result.nftId),
      recipient: result.recipient,
      _event: event
    };
  }
  parseNewCampaignEvent(receipt) {
    return this.parseEvents(receipt, "NewCampaign").map((e) => this.decodeNewCampaignEvent(e));
  }
  decodeNewCampaignEvent(event) {
    let result = event.data;
    return {
      campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
      sender: result.sender,
      _event: event
    };
  }
  parseStartOwnershipTransferEvent(receipt) {
    return this.parseEvents(receipt, "StartOwnershipTransfer").map((e) => this.decodeStartOwnershipTransferEvent(e));
  }
  decodeStartOwnershipTransferEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseTransferEvent(receipt) {
    return this.parseEvents(receipt, "Transfer").map((e) => this.decodeTransferEvent(e));
  }
  decodeTransferEvent(event) {
    let result = event.data;
    return {
      from: result.from,
      to: result.to,
      tokenId: new import_eth_wallet3.BigNumber(result.tokenId),
      _event: event
    };
  }
  parseTransferOwnershipEvent(receipt) {
    return this.parseEvents(receipt, "TransferOwnership").map((e) => this.decodeTransferOwnershipEvent(e));
  }
  decodeTransferOwnershipEvent(event) {
    let result = event.data;
    return {
      user: result.user,
      _event: event
    };
  }
  parseUpdateCampaignEvent(receipt) {
    return this.parseEvents(receipt, "UpdateCampaign").map((e) => this.decodeUpdateCampaignEvent(e));
  }
  decodeUpdateCampaignEvent(event) {
    let result = event.data;
    return {
      campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
      dataUri: result.dataUri,
      sender: result.sender,
      _event: event
    };
  }
  assign() {
    let balanceOf_call = async (owner) => {
      let result = await this.call("balanceOf", [owner]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.balanceOf = balanceOf_call;
    let campaignClaimed_call = async (param1) => {
      let result = await this.call("campaignClaimed", [import_eth_wallet3.Utils.toString(param1)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.campaignClaimed = campaignClaimed_call;
    let campaignIdCount_call = async () => {
      let result = await this.call("campaignIdCount");
      return new import_eth_wallet3.BigNumber(result);
    };
    this.campaignIdCount = campaignIdCount_call;
    let campaignInfo_call = async (param1) => {
      let result = await this.call("campaignInfo", [import_eth_wallet3.Utils.toString(param1)]);
      return {
        dataUri: result.dataUri,
        token: result.token,
        ownerFrozen: result.ownerFrozen
      };
    };
    this.campaignInfo = campaignInfo_call;
    let campaignLocked_call = async (param1) => {
      let result = await this.call("campaignLocked", [import_eth_wallet3.Utils.toString(param1)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.campaignLocked = campaignLocked_call;
    let campaignLocksParams = (params) => [import_eth_wallet3.Utils.toString(params.param1), import_eth_wallet3.Utils.toString(params.param2)];
    let campaignLocks_call = async (params) => {
      let result = await this.call("campaignLocks", campaignLocksParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.campaignLocks = campaignLocks_call;
    let campaignLocksLength_call = async (campaignId) => {
      let result = await this.call("campaignLocksLength", [import_eth_wallet3.Utils.toString(campaignId)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.campaignLocksLength = campaignLocksLength_call;
    let factory_call = async () => {
      let result = await this.call("factory");
      return result;
    };
    this.factory = factory_call;
    let getApproved_call = async (tokenId) => {
      let result = await this.call("getApproved", [import_eth_wallet3.Utils.toString(tokenId)]);
      return result;
    };
    this.getApproved = getApproved_call;
    let getInfo_call = async (nftId) => {
      let result = await this.call("getInfo", [import_eth_wallet3.Utils.toString(nftId)]);
      return {
        campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
        vestingId: new import_eth_wallet3.BigNumber(result.vestingId),
        recipient: result.recipient,
        token: result.token,
        unclaimedFunds: new import_eth_wallet3.BigNumber(result.unclaimedFunds),
        claimedAmount: new import_eth_wallet3.BigNumber(result.claimedAmount),
        totalAmount: new import_eth_wallet3.BigNumber(result.totalAmount),
        startDate: new import_eth_wallet3.BigNumber(result.startDate),
        endDate: new import_eth_wallet3.BigNumber(result.endDate)
      };
    };
    this.getInfo = getInfo_call;
    let isApprovedForAllParams = (params) => [params.owner, params.operator];
    let isApprovedForAll_call = async (params) => {
      let result = await this.call("isApprovedForAll", isApprovedForAllParams(params));
      return result;
    };
    this.isApprovedForAll = isApprovedForAll_call;
    let isLockIdVerifiedParams = (params) => [params.param1, import_eth_wallet3.Utils.toString(params.param2)];
    let isLockIdVerified_call = async (params) => {
      let result = await this.call("isLockIdVerified", isLockIdVerifiedParams(params));
      return result;
    };
    this.isLockIdVerified = isLockIdVerified_call;
    let isPermitted_call = async (param1) => {
      let result = await this.call("isPermitted", [param1]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.isPermitted = isPermitted_call;
    let locks_call = async (param1) => {
      let result = await this.call("locks", [import_eth_wallet3.Utils.toString(param1)]);
      return {
        lockType: new import_eth_wallet3.BigNumber(result.lockType),
        vestingId: new import_eth_wallet3.BigNumber(result.vestingId),
        dataUri: result.dataUri,
        root: result.root,
        dateCreated: new import_eth_wallet3.BigNumber(result.dateCreated)
      };
    };
    this.locks = locks_call;
    let locksLength_call = async () => {
      let result = await this.call("locksLength");
      return new import_eth_wallet3.BigNumber(result);
    };
    this.locksLength = locksLength_call;
    let maximumAllowedClaimedFunds_call = async (vestingId) => {
      let result = await this.call("maximumAllowedClaimedFunds", [import_eth_wallet3.Utils.toString(vestingId)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call;
    let name_call = async () => {
      let result = await this.call("name");
      return result;
    };
    this.name = name_call;
    let newOwner_call = async () => {
      let result = await this.call("newOwner");
      return result;
    };
    this.newOwner = newOwner_call;
    let nftIdCount_call = async () => {
      let result = await this.call("nftIdCount");
      return new import_eth_wallet3.BigNumber(result);
    };
    this.nftIdCount = nftIdCount_call;
    let nftVestingId_call = async (param1) => {
      let result = await this.call("nftVestingId", [import_eth_wallet3.Utils.toString(param1)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.nftVestingId = nftVestingId_call;
    let owner_call = async () => {
      let result = await this.call("owner");
      return result;
    };
    this.owner = owner_call;
    let ownerOf_call = async (tokenId) => {
      let result = await this.call("ownerOf", [import_eth_wallet3.Utils.toString(tokenId)]);
      return result;
    };
    this.ownerOf = ownerOf_call;
    let supportsInterface_call = async (interfaceId) => {
      let result = await this.call("supportsInterface", [interfaceId]);
      return result;
    };
    this.supportsInterface = supportsInterface_call;
    let symbol_call = async () => {
      let result = await this.call("symbol");
      return result;
    };
    this.symbol = symbol_call;
    let tokenByIndex_call = async (index) => {
      let result = await this.call("tokenByIndex", [import_eth_wallet3.Utils.toString(index)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.tokenByIndex = tokenByIndex_call;
    let tokenOfOwnerByIndexParams = (params) => [params.owner, import_eth_wallet3.Utils.toString(params.index)];
    let tokenOfOwnerByIndex_call = async (params) => {
      let result = await this.call("tokenOfOwnerByIndex", tokenOfOwnerByIndexParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
    let tokenURI_call = async (tokenId) => {
      let result = await this.call("tokenURI", [import_eth_wallet3.Utils.toString(tokenId)]);
      return result;
    };
    this.tokenURI = tokenURI_call;
    let totalSupply_call = async () => {
      let result = await this.call("totalSupply");
      return new import_eth_wallet3.BigNumber(result);
    };
    this.totalSupply = totalSupply_call;
    let vestingClaimedAmount_call = async (param1) => {
      let result = await this.call("vestingClaimedAmount", [import_eth_wallet3.Utils.toString(param1)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.vestingClaimedAmount = vestingClaimedAmount_call;
    let vestingIdCount_call = async () => {
      let result = await this.call("vestingIdCount");
      return new import_eth_wallet3.BigNumber(result);
    };
    this.vestingIdCount = vestingIdCount_call;
    let vestingInfo_call = async (param1) => {
      let result = await this.call("vestingInfo", [import_eth_wallet3.Utils.toString(param1)]);
      return {
        campaignId: new import_eth_wallet3.BigNumber(result.campaignId),
        recipient: result.recipient,
        amount: new import_eth_wallet3.BigNumber(result.amount),
        startDate: new import_eth_wallet3.BigNumber(result.startDate),
        endDate: new import_eth_wallet3.BigNumber(result.endDate),
        status: new import_eth_wallet3.BigNumber(result.status)
      };
    };
    this.vestingInfo = vestingInfo_call;
    let approveParams = (params) => [params.to, import_eth_wallet3.Utils.toString(params.tokenId)];
    let approve_send = async (params) => {
      let result = await this.send("approve", approveParams(params));
      return result;
    };
    let approve_call = async (params) => {
      let result = await this.call("approve", approveParams(params));
      return;
    };
    this.approve = Object.assign(approve_send, {
      call: approve_call
    });
    let claim_send = async (id) => {
      let result = await this.send("claim", [import_eth_wallet3.Utils.toString(id)]);
      return result;
    };
    let claim_call = async (id) => {
      let result = await this.call("claim", [import_eth_wallet3.Utils.toString(id)]);
      return;
    };
    this.claim = Object.assign(claim_send, {
      call: claim_call
    });
    let claimMultiple_send = async (ids) => {
      let result = await this.send("claimMultiple", [import_eth_wallet3.Utils.toString(ids)]);
      return result;
    };
    let claimMultiple_call = async (ids) => {
      let result = await this.call("claimMultiple", [import_eth_wallet3.Utils.toString(ids)]);
      return;
    };
    this.claimMultiple = Object.assign(claimMultiple_send, {
      call: claimMultiple_call
    });
    let deny_send = async (user) => {
      let result = await this.send("deny", [user]);
      return result;
    };
    let deny_call = async (user) => {
      let result = await this.call("deny", [user]);
      return;
    };
    this.deny = Object.assign(deny_send, {
      call: deny_call
    });
    let directLockParams = (params) => [import_eth_wallet3.Utils.toString(params.campaignId), params.recipient, import_eth_wallet3.Utils.toString(params.amount), import_eth_wallet3.Utils.toString(params.startDate), import_eth_wallet3.Utils.toString(params.endDate)];
    let directLock_send = async (params) => {
      let result = await this.send("directLock", directLockParams(params));
      return result;
    };
    let directLock_call = async (params) => {
      let result = await this.call("directLock", directLockParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.directLock = Object.assign(directLock_send, {
      call: directLock_call
    });
    let merkleLockParams = (params) => [import_eth_wallet3.Utils.toString(params.campaignId), import_eth_wallet3.Utils.toString(params.amount), import_eth_wallet3.Utils.stringToBytes32(params.merkleRoot), params.dataUri];
    let merkleLock_send = async (params) => {
      let result = await this.send("merkleLock", merkleLockParams(params));
      return result;
    };
    let merkleLock_call = async (params) => {
      let result = await this.call("merkleLock", merkleLockParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.merkleLock = Object.assign(merkleLock_send, {
      call: merkleLock_call
    });
    let newCampaignParams = (params) => [params.token, params.ownerFrozen, params.dataUri];
    let newCampaign_send = async (params) => {
      let result = await this.send("newCampaign", newCampaignParams(params));
      return result;
    };
    let newCampaign_call = async (params) => {
      let result = await this.call("newCampaign", newCampaignParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.newCampaign = Object.assign(newCampaign_send, {
      call: newCampaign_call
    });
    let permit_send = async (user) => {
      let result = await this.send("permit", [user]);
      return result;
    };
    let permit_call = async (user) => {
      let result = await this.call("permit", [user]);
      return;
    };
    this.permit = Object.assign(permit_send, {
      call: permit_call
    });
    let safeTransferFromParams = (params) => [params.from, params.to, import_eth_wallet3.Utils.toString(params.tokenId)];
    let safeTransferFrom_send = async (params) => {
      let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
      return result;
    };
    let safeTransferFrom_call = async (params) => {
      let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
      return;
    };
    this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
      call: safeTransferFrom_call
    });
    let safeTransferFrom_1Params = (params) => [params.from, params.to, import_eth_wallet3.Utils.toString(params.tokenId), import_eth_wallet3.Utils.stringToBytes(params.data)];
    let safeTransferFrom_1_send = async (params) => {
      let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
      return result;
    };
    let safeTransferFrom_1_call = async (params) => {
      let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
      return;
    };
    this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
      call: safeTransferFrom_1_call
    });
    let setApprovalForAllParams = (params) => [params.operator, params.approved];
    let setApprovalForAll_send = async (params) => {
      let result = await this.send("setApprovalForAll", setApprovalForAllParams(params));
      return result;
    };
    let setApprovalForAll_call = async (params) => {
      let result = await this.call("setApprovalForAll", setApprovalForAllParams(params));
      return;
    };
    this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
      call: setApprovalForAll_call
    });
    let setOwner_send = async (owner) => {
      let result = await this.send("setOwner", [owner]);
      return result;
    };
    let setOwner_call = async (owner) => {
      let result = await this.call("setOwner", [owner]);
      return;
    };
    this.setOwner = Object.assign(setOwner_send, {
      call: setOwner_call
    });
    let takeOwnership_send = async () => {
      let result = await this.send("takeOwnership");
      return result;
    };
    let takeOwnership_call = async () => {
      let result = await this.call("takeOwnership");
      return;
    };
    this.takeOwnership = Object.assign(takeOwnership_send, {
      call: takeOwnership_call
    });
    let transferFromParams = (params) => [params.from, params.to, import_eth_wallet3.Utils.toString(params.tokenId)];
    let transferFrom_send = async (params) => {
      let result = await this.send("transferFrom", transferFromParams(params));
      return result;
    };
    let transferFrom_call = async (params) => {
      let result = await this.call("transferFrom", transferFromParams(params));
      return;
    };
    this.transferFrom = Object.assign(transferFrom_send, {
      call: transferFrom_call
    });
    let transferOwnership_send = async (newOwner) => {
      let result = await this.send("transferOwnership", [newOwner]);
      return result;
    };
    let transferOwnership_call = async (newOwner) => {
      let result = await this.call("transferOwnership", [newOwner]);
      return;
    };
    this.transferOwnership = Object.assign(transferOwnership_send, {
      call: transferOwnership_call
    });
    let updateCampaignParams = (params) => [import_eth_wallet3.Utils.toString(params.campaignId), params.dataUri];
    let updateCampaign_send = async (params) => {
      let result = await this.send("updateCampaign", updateCampaignParams(params));
      return result;
    };
    let updateCampaign_call = async (params) => {
      let result = await this.call("updateCampaign", updateCampaignParams(params));
      return;
    };
    this.updateCampaign = Object.assign(updateCampaign_send, {
      call: updateCampaign_call
    });
    let verifyDirectLock_send = async (lockId) => {
      let result = await this.send("verifyDirectLock", [import_eth_wallet3.Utils.toString(lockId)]);
      return result;
    };
    let verifyDirectLock_call = async (lockId) => {
      let result = await this.call("verifyDirectLock", [import_eth_wallet3.Utils.toString(lockId)]);
      return new import_eth_wallet3.BigNumber(result);
    };
    this.verifyDirectLock = Object.assign(verifyDirectLock_send, {
      call: verifyDirectLock_call
    });
    let verifyMerkleLockParams = (params) => [import_eth_wallet3.Utils.toString(params.lockId), import_eth_wallet3.Utils.toString(params.campaignId), import_eth_wallet3.Utils.toString(params.amount), import_eth_wallet3.Utils.toString(params.startDate), import_eth_wallet3.Utils.toString(params.endDate), import_eth_wallet3.Utils.stringToBytes32(params.proof)];
    let verifyMerkleLock_send = async (params) => {
      let result = await this.send("verifyMerkleLock", verifyMerkleLockParams(params));
      return result;
    };
    let verifyMerkleLock_call = async (params) => {
      let result = await this.call("verifyMerkleLock", verifyMerkleLockParams(params));
      return new import_eth_wallet3.BigNumber(result);
    };
    this.verifyMerkleLock = Object.assign(verifyMerkleLock_send, {
      call: verifyMerkleLock_call
    });
    let withdrawFundParams = (params) => [params.token, import_eth_wallet3.Utils.toString(params.amount)];
    let withdrawFund_send = async (params) => {
      let result = await this.send("withdrawFund", withdrawFundParams(params));
      return result;
    };
    let withdrawFund_call = async (params) => {
      let result = await this.call("withdrawFund", withdrawFundParams(params));
      return;
    };
    this.withdrawFund = Object.assign(withdrawFund_send, {
      call: withdrawFund_call
    });
  }
};

// src/contracts/ValidVestingVaultFactory.ts
var import_eth_wallet4 = __toModule(require("@ijstech/eth-wallet"));

// src/contracts/ValidVestingVaultFactory.json.ts
var ValidVestingVaultFactory_json_default = {
  "abi": [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profileId", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "NewProfile", "type": "event" },
    { "inputs": [{ "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "newProfile", "outputs": [{ "internalType": "uint256", "name": "profileId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "profileIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "profileVestingVault", "outputs": [{ "internalType": "contract ValidVestingVault", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
  ],
  "bytecode": "608060405234801561001057600080fd5b50615b99806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063525ee3fa146100465780639ac3f2e814610062578063d21b127b146100bd575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b610098610070366004610373565b60016020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610059565b61004f6100cb36600461038c565b600080600081546100db90610401565b919050819055905060006040516100f190610366565b604080825260139082018190527f56616c69642056657374696e67205661756c740000000000000000000000000060608301526080602083018190528201527f56616c69642d56657374696e672d5661756c740000000000000000000000000060a082015260c001604051809103906000f080158015610175573d6000803e3d6000fd5b50905060005b83811015610257578173ffffffffffffffffffffffffffffffffffffffff1663a2f55ae58686848181106101b1576101b1610460565b90506020020160208101906101c691906104b8565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401600060405180830381600087803b15801561022c57600080fd5b505af1158015610240573d6000803e3d6000fd5b50505050808061024f90610401565b91505061017b565b506040517f13af403500000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8216906313af403590602401600060405180830381600087803b1580156102bf57600080fd5b505af11580156102d3573d6000803e3d6000fd5b5050506000838152600160205260409081902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516179055517f7ba1d39c20b2d92d216600ca5318570e4a6c147f058fdb8c2cb03851997159ea9150610357908490879087906104da565b60405180910390a15092915050565b6156268061053e83390190565b60006020828403121561038557600080fd5b5035919050565b6000806020838503121561039f57600080fd5b823567ffffffffffffffff808211156103b757600080fd5b818501915085601f8301126103cb57600080fd5b8135818111156103da57600080fd5b8660208260051b85010111156103ef57600080fd5b60209290920196919550909350505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610459577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b803573ffffffffffffffffffffffffffffffffffffffff811681146104b357600080fd5b919050565b6000602082840312156104ca57600080fd5b6104d38261048f565b9392505050565b83815260406020808301829052908201839052600090849060608401835b868110156105315773ffffffffffffffffffffffffffffffffffffffff61051e8561048f565b16825292820192908201906001016104f8565b5097965050505050505056fe60806040523480156200001157600080fd5b506040516200562638038062005626833981016040819052620000349162000150565b600080546001600160a01b031916331790558181600362000056838262000249565b50600462000065828262000249565b5050601080546001600160a01b031916331790555062000315915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000ab57600080fd5b81516001600160401b0380821115620000c857620000c862000083565b604051601f8301601f19908116603f01168101908282118183101715620000f357620000f362000083565b816040528381526020925086838588010111156200011057600080fd5b600091505b8382101562000134578582018301518183018401529082019062000115565b83821115620001465760008385830101525b9695505050505050565b600080604083850312156200016457600080fd5b82516001600160401b03808211156200017c57600080fd5b6200018a8683870162000099565b93506020850151915080821115620001a157600080fd5b50620001b08582860162000099565b9150509250929050565b600181811c90821680620001cf57607f821691505b602082108103620001f057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200024457600081815260208120601f850160051c810160208610156200021f5750805b601f850160051c820191505b8181101562000240578281556001016200022b565b5050505b505050565b81516001600160401b0381111562000265576200026562000083565b6200027d81620002768454620001ba565b84620001f6565b602080601f831160018114620002b557600084156200029c5750858301515b600019600386901b1c1916600185901b17855562000240565b600085815260208120601f198616915b82811015620002e657888601518255948401946001909101908401620002c5565b5085821015620003055787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61530180620003256000396000f3fe608060405234801561001057600080fd5b50600436106103365760003560e01c80636352211e116101b2578063ae205176116100f9578063e5bc504a116100a2578063f148550f1161007c578063f148550f1461084a578063f2fde38b1461085d578063f4dadc6114610870578063f7c8d2211461089457600080fd5b8063e5bc504a146107db578063e9217bd1146107ee578063e985e9c51461080157600080fd5b8063c45a0155116100d3578063c45a015514610788578063c87b56dd146107a8578063d4ee1d90146107bb57600080fd5b8063ae20517614610733578063b88d4fde14610753578063bb2238ec1461076657600080fd5b80639051cce91161015b5780639c52a7f1116101355780639c52a7f1146106fa578063a22cb4651461070d578063a2f55ae51461072057600080fd5b80639051cce9146106cc578063958ddc98146106df57806395d89b41146106f257600080fd5b80637c4556c11161018c5780637c4556c1146106835780638101f2bd1461068c5780638da5cb5b146106ac57600080fd5b80636352211e146105ee57806366ffcf5f1461060157806370a082311461067057600080fd5b806323b872dd116102815780634a0e835b1161022a578063511aed9911610204578063511aed99146105a75780635757afc5146105b05780635bfc5a6e146105de57806360536172146105e657600080fd5b80634a0e835b146105615780634ca14703146105815780634f6ccce71461059457600080fd5b8063379607f51161025b578063379607f5146105065780633fd8cc4e1461051957806342842e0e1461054e57600080fd5b806323b872dd146104d757806329014d2a146104ea5780632f745c59146104f357600080fd5b806312f308fa116102e357806318160ddd116102bd57806318160ddd1461044c5780631a3cd59a146104545780631c86fa90146104c457600080fd5b806312f308fa1461040657806313af403514610419578063141a93291461042c57600080fd5b8063089fd09d11610314578063089fd09d146103b0578063095ea7b3146103d15780630b651d2f146103e657600080fd5b806301ffc9a71461033b57806306fdde0314610363578063081812fc14610378575b600080fd5b61034e6103493660046145a6565b6108a7565b60405190151581526020015b60405180910390f35b61036b610903565b60405161035a9190614639565b61038b61038636600461464c565b610995565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161035a565b6103c36103be366004614687565b6109c9565b60405190815260200161035a565b6103e46103df3660046146cf565b610c63565b005b6103c36103f436600461464c565b60196020526000908152604090205481565b6103c36104143660046146fb565b610def565b6103e46104273660046147a1565b611106565b6103c361043a36600461464c565b60186020526000908152604090205481565b600b546103c3565b61046761046236600461464c565b6111ce565b60408051998a5260208a019890985273ffffffffffffffffffffffffffffffffffffffff96871697890197909752949093166060870152608086019190915260a085015260c084015260e08301526101008201526101200161035a565b6103c36104d2366004614807565b611302565b6103e46104e5366004614868565b6115fd565b6103c3600d5481565b6103c36105013660046146cf565b61169e565b6103e461051436600461464c565b61176d565b61053c6105273660046147a1565b60026020526000908152604090205460ff1681565b60405160ff909116815260200161035a565b6103e461055c366004614868565b611779565b6103c361056f36600461464c565b60126020526000908152604090205481565b6103e461058f3660046148a9565b611794565b6103c36105a236600461464c565b61190d565b6103c3600e5481565b61034e6105be3660046146cf565b601360209081526000928352604080842090915290825290205460ff1681565b6011546103c3565b6103e46119cb565b61038b6105fc36600461464c565b611af5565b61065e61060f36600461464c565b601660205260009081526040902080546001820154600283015460038401546004850154600590950154939473ffffffffffffffffffffffffffffffffffffffff909316939192909160ff1686565b60405161035a9695949392919061495b565b6103c361067e3660046147a1565b611b81565b6103c3600f5481565b6103c361069a36600461464c565b60176020526000908152604090205481565b60005461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103e46106da366004614a2c565b611c4f565b6103c36106ed36600461464c565b611c90565b61036b611db9565b6103e46107083660046147a1565b611dc8565b6103e461071b366004614ae0565b611e6f565b6103e461072e3660046147a1565b611e7e565b6103c361074136600461464c565b60009081526014602052604090205490565b6103e4610761366004614b19565b611f21565b61077961077436600461464c565b611fc9565b60405161035a93929190614bfb565b60105461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b61036b6107b636600461464c565b6120a1565b60015461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103c36107e9366004614c3b565b612115565b6103c36107fc366004614c5d565b612146565b61034e61080f366004614cc2565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260086020908152604080832093909416825291909152205460ff1690565b6103c361085836600461464c565b612387565b6103e461086b3660046147a1565b6126ae565b61088361087e36600461464c565b612745565b60405161035a959493929190614cf0565b6103e46108a23660046146cf565b61281f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806108fd57506108fd82612864565b92915050565b60606003805461091290614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461093e90614d3a565b801561098b5780601f106109605761010080835404028352916020019161098b565b820191906000526020600020905b81548152906001019060200180831161096e57829003601f168201915b5050505050905090565b60006109a082612947565b5060009081526007602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b3360009081526002602052604081205460ff16600114610a70576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff16610aa38133876129d2565b94506000610ab48888888888612b29565b6011805460008b815260146020908152604080832080546001808201835591855283852001859055815160a0810183528481528084018890528251938401835284845291820192909252606081018390524267ffffffffffffffff1660808201528454808301865594909252815160059094027f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c680180549398509495509093929183917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115610b8d57610b8d6148f5565b02179055506020820151600182015560408201516002820190610bb09082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008881526018602052604081208054889290610c1a908490614f24565b90915550506040518681523390899085907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a4505095945050505050565b6000610c6e82611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610a67565b3373ffffffffffffffffffffffffffffffffffffffff82161480610d545750610d54813361080f565b610de0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a67565b610dea8383612d5e565b505050565b6000600160118981548110610e0657610e06614f3c565b600091825260209091206005909102015460ff166001811115610e2b57610e2b6148f5565b14610e92576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b610f5e83838080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050601180549092508c91508110610ede57610ede614f3c565b6000918252602091829020600360059092020101546040517fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003360601b1692810192909252603482018b9052605482018a905260748201899052609482018890529060b40160405160208183030381529060405280519060200120612e39565b610fc4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f6d65726b6c652070726f6f66206661696c6564000000000000000000000000006044820152606401610a67565b3360009081526013602090815260408083208b845290915290205460ff1615611049576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f6d65726b6c65496420616c7265616479207665726966696564000000000000006044820152606401610a67565b60006110588833898989612b29565b600f8054935090915060019060006110708386614f24565b9091555050600082815260176020908152604080832084905533808452601383528184208d855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905551909184918b917f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a091a46110fa3383612e4f565b50979650505050505050565b60105473ffffffffffffffffffffffffffffffffffffffff163314611187576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f742066726f6d20666163746f7279000000000000000000000000000000006044820152606401610a67565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008060008060008060006111e58a611af5565b60008b81526017602090815260408083205480845260168352818420825160c0810184528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169582019590955260028201549381019390935260038101546060840152600481015460808401526005810154919d50949b5092939092909160a084019160ff1690811115611279576112796148f5565b600181111561128a5761128a6148f5565b9052508051600081815260156020526040902060010154909b5073ffffffffffffffffffffffffffffffffffffffff16975090506112c789612e69565b9550601260008a8152602001908152602001600020549450806040015193508060600151925080608001519150509193959799909294969850565b3360009081526002602052604081205460ff166001146113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161140b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b5060118054600087815260146020908152604080832080546001808201835591855283852001859055815160a081018352908152808301939093528051601f870183900483028101830182528681529394939083019187908790819084018382808284376000920182905250938552505050602080830189905267ffffffffffffffff4216604090930192909252835460018181018655948252919020825160059092020180549293909283917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009091169083818111156114ee576114ee6148f5565b021790555060208201516001820155604082015160028201906115119082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff166115908133886129d2565b9550856018600089815260200190815260200160002060008282546115b59190614f24565b90915550506040518681523390889084907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a45095945050505050565b6116073382612e8b565b611693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b610dea838383612f4a565b60006116a983611b81565b8210611737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600960209081526040808320938352929052205490565b611776816130b6565b50565b610dea83838360405180602001604052806000815250611f21565b3360009081526002602052604090205460ff16600114611836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8061189d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b60008381526015602052604090206118b6828483614f6b565b503373ffffffffffffffffffffffffffffffffffffffff16837f827c032fe6cd1eed9fd542005e6a56d0c5e80bc6e38171ab664069244da148198484604051611900929190615085565b60405180910390a3505050565b6000611918600b5490565b82106119a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610a67565b600b82815481106119b9576119b9614f3c565b90600052602060002001549050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314611a72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60008181526005602052604081205473ffffffffffffffffffffffffffffffffffffffff16806108fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b600073ffffffffffffffffffffffffffffffffffffffff8216611c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e657200000000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205490565b805160005b81811015610dea57611c7e838281518110611c7157611c71614f3c565b60200260200101516130b6565b80611c88816150d2565b915050611c54565b6000818152601660209081526040808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154849360a084019160ff1690811115611d0f57611d0f6148f5565b6001811115611d2057611d206148f5565b8152505090508060600151421015611d3b5750600092915050565b8060600151816080015103611d54576040015192915050565b80608001514210611d69576040015192915050565b6000816060015142611d7b919061510a565b9050600082606001518360800151611d93919061510a565b905080828460400151611da69190615121565b611db0919061518d565b95945050505050565b60606004805461091290614d3a565b60005473ffffffffffffffffffffffffffffffffffffffff163314611dec57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b611e7a338383613399565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611ea257600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101611e64565b611f2b3383612e8b565b611fb7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b611fc3848484846134be565b50505050565b601560205260009081526040902080548190611fe490614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461201090614d3a565b801561205d5780601f106120325761010080835404028352916020019161205d565b820191906000526020600020905b81548152906001019060200180831161204057829003601f168201915b5050506001909301549192505073ffffffffffffffffffffffffffffffffffffffff81169060ff740100000000000000000000000000000000000000009091041683565b60606120ac82612947565b60006120c360408051602081019091526000815290565b905060008151116120e3576040518060200160405280600081525061210e565b806120ed84613561565b6040516020016120fe9291906151a1565b6040516020818303038152906040525b9392505050565b6014602052816000526040600020818154811061213157600080fd5b90600052602060002001600091509150505481565b3360009081526002602052604081205460ff166001146121e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161224f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b600d6000815461225e906150d2565b91829055506040805160806020601f87018190040282018101909252606081018581529293509182918690869081908501838280828437600092018290525093855250505073ffffffffffffffffffffffffffffffffffffffff88166020808401919091528715156040938401528482526015905220815181906122e29082614ddb565b50602082015160019091018054604093840151151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff9093169290921791909117905551339082907fec43c2ba7667c935356219eb87401926de2a65b331b1867aeb9b05626677f53b90600090a3949350505050565b6000806011838154811061239d5761239d614f3c565b600091825260209091206005909102015460ff1660018111156123c2576123c26148f5565b14612429576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b33600090815260136020908152604080832085845290915290205460ff16156124ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f76657374696e67496420616c72656164792076657269666965640000000000006044820152606401610a67565b6000601183815481106124c3576124c3614f3c565b60009182526020808320600592830201600190810154808552601683526040808620815160c081018352815481528185015473ffffffffffffffffffffffffffffffffffffffff169581019590955260028101549185019190915260038101546060850152600481015460808501529384015490955091929160a084019160ff90911690811115612556576125566148f5565b6001811115612567576125676148f5565b815250509050806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612606576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f526563697069656e74206e6f74206d61746368000000000000000000000000006044820152606401610a67565b600f80549350600190600061261b8387614f24565b90915550506000838152601760209081526040808320859055338084526013835281842088855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905583519051919286927f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a09190a46126a73384612e4f565b5050919050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146126d257600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001611e64565b6011818154811061275557600080fd5b600091825260209091206005909102018054600182015460028301805460ff909316945090929161278590614d3a565b80601f01602080910402602001604051908101604052809291908181526020018280546127b190614d3a565b80156127fe5780601f106127d3576101008083540402835291602001916127fe565b820191906000526020600020905b8154815290600101906020018083116127e157829003601f168201915b50505050600383015460049093015491929167ffffffffffffffff16905085565b60005473ffffffffffffffffffffffffffffffffffffffff16331461284357600080fd5b611e7a73ffffffffffffffffffffffffffffffffffffffff83163383613696565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806128f757507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806108fd57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146108fd565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff16611776576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015612a3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6391906151d0565b9050612a8773ffffffffffffffffffffffffffffffffffffffff851684308561376a565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa158015612af3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b1791906151d0565b612b21919061510a565b949350505050565b600081831115612bbb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f537461727420646174652063616e6e6f74206265206c61746572207468616e2060448201527f656e6420646174650000000000000000000000000000000000000000000000006064820152608401610a67565b600e60008154612bca906150d2565b91905081905590506040518060c001604052808781526020018673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200160006001811115612c2457612c246148f5565b90526000828152601660209081526040918290208351815590830151600180830180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff90931692909217909155918301516002820155606083015160038201556080830151600482015560a08301516005820180549293919290917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115612cec57612cec6148f5565b02179055505060408051838152602081018790529081018590526060810184905273ffffffffffffffffffffffffffffffffffffffff8716915087907f82debb28bd576b13304dd9103c74c7b554c1de8e996c8576dc43dbfca4a1bd0f9060800160405180910390a395945050505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff84161580612dc9575060008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16155b612e2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b611fc384846137c8565b600082612e468584613868565b14949350505050565b611e7a8282604051806020016040528060008152506138b5565b600081815260126020526040812054612e8183611c90565b6108fd919061510a565b600080612e9783611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480612f05575073ffffffffffffffffffffffffffffffffffffffff80821660009081526008602090815260408083209388168352929052205460ff165b80612b2157508373ffffffffffffffffffffffffffffffffffffffff16612f2b84610995565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff80861690851603613010576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f43616e6e6f74207472616e7366657220746f207468652073616d65206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610a67565b60008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16156130a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b6130af858585613958565b5050505050565b600081815260176020526040902054336130cf83611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f43616e6e6f7420636c61696d2829206f6e206120746f6b656e2062656c6f6e6760448201527f696e6720746f20616e6f746865722061646472657373210000000000000000006064820152608401610a67565b600061317d82611c90565b600083815260126020526040902054909150810361319a57505050565b6000828152601260205260408120546131b3908361510a565b600084815260126020908152604080832086905560168252808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154949550929390929160a084019160ff1690811115613242576132426148f5565b6001811115613253576132536148f5565b905250905060008160a001516001811115613270576132706148f5565b146132d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f496e6163746976652076657374696e67000000000000000000000000000000006044820152606401610a67565b600084815260126020526040908190205482820151915187927fa21b52191f39061227a0dd21f4fc770a4a74c59b7c026fb7e3c5ba8e303d21eb9261332f928792909283526020830191909152604082015260600190565b60405180910390a2805160009081526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff1661336c813385613696565b81516000908152601960205260408120805485929061338c908490614f24565b9091555050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361342e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a67565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526008602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611900565b6134c9848484612f4a565b6134d584848484613bca565b611fc3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b6060816000036135a457505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156135ce57806135b8816150d2565b91506135c79050600a8361518d565b91506135a8565b60008167ffffffffffffffff8111156135e9576135e96149ae565b6040519080825280601f01601f191660200182016040528015613613576020820181803683370190505b5090505b8415612b215761362860018361510a565b9150613635600a866151e9565b613640906030614f24565b60f81b81838151811061365557613655614f3c565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061368f600a8661518d565b9450613617565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610dea9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613dbd565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052611fc39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016136e8565b600081815260076020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155819061382282611af5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081815b84518110156138ad576138998286838151811061388c5761388c614f3c565b6020026020010151613ec9565b9150806138a5816150d2565b91505061386d565b509392505050565b6138bf8383613ef5565b6138cc6000848484613bca565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b8273ffffffffffffffffffffffffffffffffffffffff1661397882611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613a1b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff8216613abd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610a67565b613ac88383836140c3565b613ad3600082612d5e565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600660205260408120805460019290613b0990849061510a565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290613b44908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15613db2576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290613c419033908990889088906004016151fd565b6020604051808303816000875af1925050508015613c9a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252613c9791810190615246565b60015b613d67573d808015613cc8576040519150601f19603f3d011682016040523d82523d6000602084013e613ccd565b606091505b508051600003613d5f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050612b21565b506001949350505050565b6000613e1f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166141c99092919063ffffffff16565b805190915015610dea5780806020019051810190613e3d9190615263565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610a67565b6000818310613ee557600082815260208490526040902061210e565b5060009182526020526040902090565b73ffffffffffffffffffffffffffffffffffffffff8216613f72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a67565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff1615613ffe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a67565b61400a600083836140c3565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290614040908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b73ffffffffffffffffffffffffffffffffffffffff831661412b5761412681600b80546000838152600c60205260408120829055600182018355919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90155565b614168565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146141685761416883826141d8565b73ffffffffffffffffffffffffffffffffffffffff821661418c57610dea8161428f565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610dea57610dea828261433e565b6060612b21848460008561438f565b600060016141e584611b81565b6141ef919061510a565b6000838152600a602052604090205490915080821461424f5773ffffffffffffffffffffffffffffffffffffffff841660009081526009602090815260408083208584528252808320548484528184208190558352600a90915290208190555b506000918252600a6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600981528383209183525290812055565b600b546000906142a19060019061510a565b6000838152600c6020526040812054600b80549394509092849081106142c9576142c9614f3c565b9060005260206000200154905080600b83815481106142ea576142ea614f3c565b6000918252602080832090910192909255828152600c9091526040808220849055858252812055600b80548061432257614322615280565b6001900381819060005260206000200160009055905550505050565b600061434983611b81565b73ffffffffffffffffffffffffffffffffffffffff90931660009081526009602090815260408083208684528252808320859055938252600a9052919091209190915550565b606082471015614421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff85163b61449f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a67565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516144c891906152af565b60006040518083038185875af1925050503d8060008114614505576040519150601f19603f3d011682016040523d82523d6000602084013e61450a565b606091505b509150915061451a828286614525565b979650505050505050565b6060831561453457508161210e565b8251156145445782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a679190614639565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461177657600080fd5b6000602082840312156145b857600080fd5b813561210e81614578565b60005b838110156145de5781810151838201526020016145c6565b83811115611fc35750506000910152565b600081518084526146078160208601602086016145c3565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061210e60208301846145ef565b60006020828403121561465e57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461177657600080fd5b600080600080600060a0868803121561469f57600080fd5b8535945060208601356146b181614665565b94979496505050506040830135926060810135926080909101359150565b600080604083850312156146e257600080fd5b82356146ed81614665565b946020939093013593505050565b600080600080600080600060c0888a03121561471657600080fd5b873596506020880135955060408801359450606088013593506080880135925060a088013567ffffffffffffffff8082111561475157600080fd5b818a0191508a601f83011261476557600080fd5b81358181111561477457600080fd5b8b60208260051b850101111561478957600080fd5b60208301945080935050505092959891949750929550565b6000602082840312156147b357600080fd5b813561210e81614665565b60008083601f8401126147d057600080fd5b50813567ffffffffffffffff8111156147e857600080fd5b60208301915083602082850101111561480057600080fd5b9250929050565b60008060008060006080868803121561481f57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561484b57600080fd5b614857888289016147be565b969995985093965092949392505050565b60008060006060848603121561487d57600080fd5b833561488881614665565b9250602084013561489881614665565b929592945050506040919091013590565b6000806000604084860312156148be57600080fd5b83359250602084013567ffffffffffffffff8111156148dc57600080fd5b6148e8868287016147be565b9497909650939450505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611776577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060c08201905087825273ffffffffffffffffffffffffffffffffffffffff8716602083015285604083015284606083015283608083015261499d83614924565b8260a0830152979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614a2457614a246149ae565b604052919050565b60006020808385031215614a3f57600080fd5b823567ffffffffffffffff80821115614a5757600080fd5b818501915085601f830112614a6b57600080fd5b813581811115614a7d57614a7d6149ae565b8060051b9150614a8e8483016149dd565b8181529183018401918481019088841115614aa857600080fd5b938501935b83851015614ac657843582529385019390850190614aad565b98975050505050505050565b801515811461177657600080fd5b60008060408385031215614af357600080fd5b8235614afe81614665565b91506020830135614b0e81614ad2565b809150509250929050565b60008060008060808587031215614b2f57600080fd5b8435614b3a81614665565b9350602085810135614b4b81614665565b935060408601359250606086013567ffffffffffffffff80821115614b6f57600080fd5b818801915088601f830112614b8357600080fd5b813581811115614b9557614b956149ae565b614bc5847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016149dd565b91508082528984828501011115614bdb57600080fd5b808484018584013760008482840101525080935050505092959194509250565b606081526000614c0e60608301866145ef565b73ffffffffffffffffffffffffffffffffffffffff94909416602083015250901515604090910152919050565b60008060408385031215614c4e57600080fd5b50508035926020909101359150565b60008060008060608587031215614c7357600080fd5b8435614c7e81614665565b93506020850135614c8e81614ad2565b9250604085013567ffffffffffffffff811115614caa57600080fd5b614cb6878288016147be565b95989497509550505050565b60008060408385031215614cd557600080fd5b8235614ce081614665565b91506020830135614b0e81614665565b614cf986614924565b85815284602082015260a060408201526000614d1860a08301866145ef565b905083606083015267ffffffffffffffff831660808301529695505050505050565b600181811c90821680614d4e57607f821691505b602082108103614d87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610dea57600081815260208120601f850160051c81016020861015614db45750805b601f850160051c820191505b81811015614dd357828155600101614dc0565b505050505050565b815167ffffffffffffffff811115614df557614df56149ae565b614e0981614e038454614d3a565b84614d8d565b602080601f831160018114614e5c5760008415614e265750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555614dd3565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015614ea957888601518255948401946001909101908401614e8a565b5085821015614ee557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115614f3757614f37614ef5565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b67ffffffffffffffff831115614f8357614f836149ae565b614f9783614f918354614d3a565b83614d8d565b6000601f841160018114614fe95760008515614fb35750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556130af565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156150385786850135825560209485019460019092019101615018565b5086821015615073577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b60208152816020820152818360408301376000818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361510357615103614ef5565b5060010190565b60008282101561511c5761511c614ef5565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561515957615159614ef5565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008261519c5761519c61515e565b500490565b600083516151b38184602088016145c3565b8351908301906151c78183602088016145c3565b01949350505050565b6000602082840312156151e257600080fd5b5051919050565b6000826151f8576151f861515e565b500690565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261523c60808301846145ef565b9695505050505050565b60006020828403121561525857600080fd5b815161210e81614578565b60006020828403121561527557600080fd5b815161210e81614ad2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600082516152c18184602087016145c3565b919091019291505056fea2646970667358221220c75228f6738897c83ad44edcca58555726708e1798e01724df10c8c5c904cd1f64736f6c634300080f0033a2646970667358221220fc216deb7e4642e159312b5186985be1ccdf0eeb5e57884d6a87745e0061bb3964736f6c634300080f0033"
};

// src/contracts/ValidVestingVaultFactory.ts
var ValidVestingVaultFactory = class extends import_eth_wallet4.Contract {
  constructor(wallet, address) {
    super(wallet, address, ValidVestingVaultFactory_json_default.abi, ValidVestingVaultFactory_json_default.bytecode);
    this.assign();
  }
  deploy() {
    return this.__deploy();
  }
  parseNewProfileEvent(receipt) {
    return this.parseEvents(receipt, "NewProfile").map((e) => this.decodeNewProfileEvent(e));
  }
  decodeNewProfileEvent(event) {
    let result = event.data;
    return {
      profileId: new import_eth_wallet4.BigNumber(result.profileId),
      admins: result.admins,
      _event: event
    };
  }
  assign() {
    let profileIdCount_call = async () => {
      let result = await this.call("profileIdCount");
      return new import_eth_wallet4.BigNumber(result);
    };
    this.profileIdCount = profileIdCount_call;
    let profileVestingVault_call = async (param1) => {
      let result = await this.call("profileVestingVault", [import_eth_wallet4.Utils.toString(param1)]);
      return result;
    };
    this.profileVestingVault = profileVestingVault_call;
    let newProfile_send = async (admins) => {
      let result = await this.send("newProfile", [admins]);
      return result;
    };
    let newProfile_call = async (admins) => {
      let result = await this.call("newProfile", [admins]);
      return new import_eth_wallet4.BigNumber(result);
    };
    this.newProfile = Object.assign(newProfile_send, {
      call: newProfile_call
    });
  }
};

// src/common.ts
var VestingTreeABI = [
  {
    type: "uint256",
    name: "campaignId"
  },
  {
    type: "uint256",
    name: "amount"
  },
  {
    type: "uint256",
    name: "startDate"
  },
  {
    type: "uint256",
    name: "endDate"
  }
];
var LockType;
(function(LockType2) {
  LockType2[LockType2["Direct"] = 0] = "Direct";
  LockType2[LockType2["Merkle"] = 1] = "Merkle";
})(LockType || (LockType = {}));
async function getCampaignInfoList(wallet, contractAddress) {
  let vesting = new ValidVestingVault(wallet, contractAddress);
  let campaignInfoList = [];
  let campaignIdCount = await vesting.campaignIdCount();
  for (let i = 1; i <= campaignIdCount.toNumber(); i++) {
    let info = await vesting.campaignInfo(i);
    let campaignInfo = __spreadProps(__spreadValues({}, info), {
      id: i
    });
    campaignInfoList.push(campaignInfo);
  }
  return campaignInfoList;
}

// src/locker.ts
var locker_exports = {};
__export(locker_exports, {
  doDirectLock: () => doDirectLock,
  doMerkleLock: () => doMerkleLock,
  getMyLocks: () => getMyLocks
});
var import_eth_wallet5 = __toModule(require("@ijstech/eth-wallet"));
async function doMerkleLock(wallet, contractAddress, campaignId, lockRecords, dataUri) {
  let treeData = lockRecords.map((item) => {
    return {
      campaignId,
      account: item.account,
      amount: item.amount,
      startDate: item.startDate,
      endDate: item.endDate
    };
  });
  let totalAmount = lockRecords.reduce((prev, item) => new import_eth_wallet5.BigNumber(prev).plus(item.amount), new import_eth_wallet5.BigNumber(0));
  const vesting = new ValidVestingVault(wallet, contractAddress);
  let tree = import_eth_wallet5.Utils.generateWhitelistTree(wallet, treeData, VestingTreeABI);
  let receipt = await vesting.merkleLock({
    campaignId,
    amount: totalAmount,
    merkleRoot: tree.root,
    dataUri
  });
  return receipt;
}
async function doDirectLock(wallet, contractAddress, campaignId, lockRecord) {
  const vesting = new ValidVestingVault(wallet, contractAddress);
  let receipt = await vesting.directLock({
    campaignId,
    recipient: lockRecord.account,
    amount: new import_eth_wallet5.BigNumber(lockRecord.amount),
    startDate: lockRecord.startDate,
    endDate: lockRecord.endDate
  });
  return receipt;
}
async function getMyLocks(wallet, contractAddress, campaignId) {
  const vesting = new ValidVestingVault(wallet, contractAddress);
  let locks = [];
  let campaignLocksLength = await vesting.campaignLocksLength(campaignId);
  for (let i = 0; i < campaignLocksLength.toNumber(); i++) {
    let lockId = await vesting.campaignLocks({
      param1: campaignId,
      param2: i
    });
    let lock = await vesting.locks(lockId);
    let lockInfo = {
      id: lockId.toNumber(),
      lockType: lock.lockType.toNumber(),
      dataUri: lock.dataUri,
      root: lock.root,
      vestingId: lock.vestingId.toNumber(),
      dateCreated: lock.dateCreated.toNumber()
    };
    locks.push(lockInfo);
  }
  return locks;
}

// src/claimant.ts
var claimant_exports = {};
__export(claimant_exports, {
  doClaim: () => doClaim,
  doClaimAll: () => doClaimAll,
  doVerifyDirectLock: () => doVerifyDirectLock,
  doVerifyMerkleLock: () => doVerifyMerkleLock,
  getMyClaims: () => getMyClaims,
  getUnverifiedLockInfo: () => getUnverifiedLockInfo,
  getUnverifiedLockInfoMap: () => getUnverifiedLockInfoMap
});
var import_eth_wallet6 = __toModule(require("@ijstech/eth-wallet"));
async function doVerifyMerkleLock(wallet, contractAddress, lockId, vestingData) {
  const vesting = new ValidVestingVault(wallet, contractAddress);
  const merkleInfo = await vesting.locks(lockId);
  let proof = import_eth_wallet6.Utils.getWhitelistTreeProof(wallet, merkleInfo.root, vestingData, VestingTreeABI);
  let vestingItem = vestingData.find((v) => v.account == wallet.address);
  if (!vestingItem)
    return null;
  let receipt = await vesting.verifyMerkleLock({
    lockId,
    amount: new import_eth_wallet6.BigNumber(vestingItem.amount),
    startDate: vestingItem.startDate,
    endDate: vestingItem.endDate,
    campaignId: vestingItem.campaignId,
    proof
  });
  return receipt;
}
async function doVerifyDirectLock(wallet, contractAddress, vestingId) {
  const vesting = new ValidVestingVault(wallet, contractAddress);
  let receipt = await vesting.verifyDirectLock(vestingId);
  return receipt;
}
async function getUnverifiedLockInfo(wallet, contractAddress, campaignId) {
  let unverifiedLockInfoList = [];
  let vesting = new ValidVestingVault(wallet, contractAddress);
  let locksLength = await vesting.campaignLocksLength(campaignId);
  for (let j = 0; j < locksLength.toNumber(); j++) {
    let lockId = await vesting.campaignLocks({
      param1: campaignId,
      param2: j
    });
    let lockInfoItem = await vesting.locks(lockId);
    let isLockIdVerified = await vesting.isLockIdVerified({
      param1: wallet.address,
      param2: lockId
    });
    if (!isLockIdVerified) {
      let lockInfo = {
        id: lockId.toNumber(),
        lockType: lockInfoItem.lockType.toNumber(),
        dataUri: lockInfoItem.dataUri,
        root: lockInfoItem.root,
        vestingId: lockInfoItem.vestingId.toNumber(),
        dateCreated: lockInfoItem.dateCreated.toNumber()
      };
      unverifiedLockInfoList.push(lockInfo);
    }
  }
  return unverifiedLockInfoList;
}
async function getUnverifiedLockInfoMap(wallet, contractAddress, campaignIds) {
  let unverifiedLockInfoMap = {};
  for (let i = 0; i < campaignIds.length; i++) {
    let campaignId = campaignIds[i];
    unverifiedLockInfoMap[campaignId] = unverifiedLockInfoMap[campaignId] || [];
    let lockInfo = await getUnverifiedLockInfo(wallet, contractAddress, campaignId);
    unverifiedLockInfoMap[campaignId] = lockInfo;
  }
  return unverifiedLockInfoMap;
}
async function getMyClaims(wallet, contractAddress, campaignId) {
  let claimsArr = [];
  try {
    let vesting = new ValidVestingVault(wallet, contractAddress);
    let nftCount = await vesting.balanceOf(wallet.address);
    for (let i = 0; i < nftCount.toNumber(); i++) {
      let nftId = await vesting.tokenOfOwnerByIndex({
        owner: wallet.address,
        index: i
      });
      let info = await vesting.getInfo(nftId);
      if (campaignId && info.campaignId.toNumber() != campaignId)
        continue;
      let vestingId = info.vestingId;
      let maxClaimedFunds = await vesting.maximumAllowedClaimedFunds(vestingId);
      let claimed = await vesting.vestingClaimedAmount(vestingId);
      let claimable = new import_eth_wallet6.BigNumber(maxClaimedFunds).minus(claimed).toFixed();
      let locked = new import_eth_wallet6.BigNumber(info.totalAmount).minus(claimed).toFixed();
      let vestingStart = info.startDate.toNumber();
      let vestingEnd = info.endDate.toNumber();
      let claimInfo = {
        campaignId: info.campaignId.toNumber(),
        tokenId: nftId.toNumber(),
        vestingId: vestingId.toNumber(),
        claimed: claimed.toFixed(),
        claimable,
        locked,
        vestingStart,
        vestingEnd
      };
      claimsArr.push(claimInfo);
    }
  } catch (err) {
    console.log("err", err);
  }
  return claimsArr;
}
async function doClaim(wallet, contractAddress, id) {
  if (!contractAddress)
    return;
  let vesting = new ValidVestingVault(wallet, contractAddress);
  let receipt = await vesting.claim(id);
  return receipt;
}
async function doClaimAll(wallet, contractAddress, ids) {
  if (!contractAddress)
    return;
  let vesting = new ValidVestingVault(wallet, contractAddress);
  let receipt = await vesting.claimMultiple(ids);
  return receipt;
}

})