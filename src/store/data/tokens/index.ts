import { ITokenObject } from '@vesting/global';
const Tokens_BSC: ITokenObject[] = require('./mainnet/bsc.json');
const Tokens_Ethereuem: ITokenObject[] = require('./mainnet/ethereum.json');
const Tokens_Polygon: ITokenObject[] = require('./mainnet/polygon.json');
const Tokens_Avalanche: ITokenObject[] = require('./mainnet/avalanche.json');
const Tokens_Fantom: ITokenObject[] = require('./mainnet/fantom.json');
const Tokens_Cronos: ITokenObject[] = require('./mainnet/cronos.json'); //not added

const Tokens_Kovan: ITokenObject[] = require('./testnet/kovan.json');
const Tokens_BSC_Testnet: ITokenObject[] = require('./testnet/bsc-testnet.json');
const Tokens_Fuji: ITokenObject[] = require('./testnet/fuji.json');
const Tokens_Mumbai: ITokenObject[] = require('./testnet/mumbai.json');
const Tokens_Fantom_Testnet: ITokenObject[] = require('./testnet/fantom-testnet.json');
const Tokens_Amino: ITokenObject[] = require('./testnet/amino.json');
const Tokens_AminoXTestnet: ITokenObject[] = require('./testnet/aminoX-testnet.json');
const Tokens_Cronos_Testnet: ITokenObject[] = require('./testnet/cronos-testnet.json');

export const DefaultERC20Tokens: { [key: number]: ITokenObject[] } = {
  1: Tokens_Ethereuem,
  25: Tokens_Cronos,
  42: Tokens_Kovan,
  56: Tokens_BSC,
  97: Tokens_BSC_Testnet,
  137: Tokens_Polygon,
  338: Tokens_Cronos_Testnet,
  31337: Tokens_Amino,
  80001: Tokens_Mumbai,
  43113: Tokens_Fuji,
  43114: Tokens_Avalanche,
  250: Tokens_Fantom,
  4002: Tokens_Fantom_Testnet,
  13370: Tokens_AminoXTestnet
}

export const ChainNativeTokenByChainId: { [key: number]: ITokenObject } = {
  1: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true },
  25: { address: undefined, decimals: 18, symbol: "CRO", name: 'CRO', isNative: true }, //cronos
  42: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true }, // Kovan,
  56: { address: undefined, decimals: 18, symbol: "BNB", name: 'BNB', isNative: true }, // Binance Mainnet
  97: { address: undefined, decimals: 18, symbol: "BNB", name: 'BNB', isNative: true }, // Binance Test Chain
  137: { address: undefined, decimals: 18, symbol: "MATIC", name: 'MATIC', isNative: true }, //Polygon
  338: { address: undefined, decimals: 18, symbol: "TCRO", name: 'TCRO', isNative: true }, //cronos
  31337: { address: undefined, decimals: 18, symbol: "ACT", name: 'ACT', isNative: true }, //Amino Testnet
  80001: { address: undefined, decimals: 18, symbol: "MATIC", name: 'MATIC', isNative: true }, //Mumbai, Polygon testnet
  43114: { address: undefined, decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true }, //Avalanche Mainnet C-Chain
  43113: { address: undefined, decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true },  //Avalanche FUJI C-Chain
  250: { address: undefined, decimals: 18, symbol: "FTM", name: 'FTM', isNative: true }, // Fantom Opera
  4002: { address: undefined, decimals: 18, symbol: "FTM", name: 'FTM', isNative: true }, // Fantom Testnet
  13370: { address: undefined, decimals: 18, symbol: "ACT", name: 'ACT', isNative: true }, //Amino X Testnet
}

export const WETHByChainId: { [key: number]: ITokenObject } = Object.keys(DefaultERC20Tokens).reduce((result: any, key: string) => {
  result[key] = DefaultERC20Tokens[Number(key)].find(v => v.isWETH);
  return result
}, {});

export const DefaultTokens: { [key: number]: ITokenObject[] } = Object.keys(ChainNativeTokenByChainId).reduce((result: any, key: string) => {
  result[key] = [...DefaultERC20Tokens[Number(key)], ChainNativeTokenByChainId[Number(key)]]
  return result
}, {});

const TokenFolderName: { [key: number]: string } = {
  1: "ethereum",
  25: "cronos",
  42: "kovan",
  56: "bsc",
  97: "bsc-testnet",
  137: "polygon",
  338: "cronos-testnet",
  31337: "amino",
  80001: "mumbai",
  43113: "fuji",
  43114: "avalanche",
  250: "fantom",
  4002: "fantom-testnet",
  13370: "aminox-testnet"
}

export const getTokenIconPath = (tokenObj: any, chainId?: number) => {
  const tokenPath = 'img/tokens';
  if (!tokenObj || tokenObj.isCustom) {
    return `${tokenPath}/token-placeholder.svg`;
  }
  else if (chainId != null && chainId != undefined) {
    let folderName = TokenFolderName[chainId];
    let fileName = (tokenObj.address ? tokenObj.address.toLowerCase() : tokenObj.symbol) + '.png';
    return `${tokenPath}/${folderName}/${fileName}`;
  }
  else {
    return `${tokenPath}/${tokenObj.symbol}.png`;
  }
}
