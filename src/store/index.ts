import { Erc20, Wallet, Contracts as WalletContracts } from '@ijstech/eth-wallet';
import { TokenMapType, ITokenObject, getERC20Amount, INetwork } from '@vesting/global';
import { DefaultTokens, getTokenIconPath } from './data';
import { isWalletConnected, ChainNativeTokenByChainId } from '@vesting/store';
export {isWalletConnected, hasWallet, hasMetaMask, truncateAddress, switchNetwork, connectWallet, logoutWallet} from './wallet';
export { walletList } from './walletList';
import { Contracts } from '@scom/vesting-sdk';
import Assets from '@vesting/assets';

export {
  ChainNativeTokenByChainId,
  getTokenIconPath
} from './data';

export interface TokenBalancesType { [token: string]: string }

export interface IVaultFactoryInfo {
  address: string;
}

export interface IContractInfo {
  vaultFactory: IVaultFactoryInfo;
}

export interface IDomainModuleInfo {
  profileId: number;
}

export type ContractInfoByChainType = { [key: number]: IContractInfo };
export type DomainModuleInfoByChainType = { [key: number]: IDomainModuleInfo };

export const state = {
  currentChainId: 0,
  tokenBalances: {} as TokenBalancesType,
  tokenMap: {} as TokenMapType,
  userTokens: {} as {[key: string]: ITokenObject[]},
  contractInfoByChain: {} as ContractInfoByChainType,
  domainModuleInfoByChain: {} as DomainModuleInfoByChainType,
  infuraId: "",
  networkMap: {} as { [key: number]: INetwork },
  defaultChainId: 0
}

export const setDataFromSCConfig = (options: any) => {
  if (options.contractInfo) {
    setContractInfo(options.contractInfo);
  }
  if (options.infuraId) {
    setInfuraId(options.infuraId)
  }			
  if (options.networkList) {
    setNetworkList(options.networkList, options.infuraId)
  }
  if (options.defaultChainId) {
    setDefaultChainId(options.defaultChainId)
  }
  if (options.domainModuleInfo) {
    setDomainModuleInfo(options.domainModuleInfo);
  }	
}

const setDefaultChainId = (chainId: number) => {
  state.defaultChainId = chainId;
}

export const getDefaultChainId = () => {
  return state.defaultChainId;
}

const setInfuraId = (infuraId: string) => {
  state.infuraId = infuraId;
}

export const getInfuraId = () => {
  return state.infuraId;
}

const setNetworkList = (networkList: INetwork[], infuraId?: string) => {
  state.networkMap = {};
  for (let network of networkList) {
    if (infuraId && network.rpc) {
      network.rpc = network.rpc.replace(/{InfuraId}/g, infuraId);
    }
    state.networkMap[network.chainId] = network;
  }
}

export const getNetworkInfo = (chainId: number) => {
  return state.networkMap[chainId];
}

export const getNetworkList = ()  => {
  return Object.values(state.networkMap);
}

export const getNetworkExplorerName = (chainId: number) => {
  if (getNetworkInfo(chainId)) {
    return getNetworkInfo(chainId).explorerName;
  }
  return 'Unknown';
}

const setContractInfo = (data: ContractInfoByChainType) => {
  state.contractInfoByChain = data;
}

export const getContractInfo = (chainId: number) => {
  return state.contractInfoByChain[chainId];
}

const setDomainModuleInfo = (data: DomainModuleInfoByChainType) => {
  state.domainModuleInfoByChain = data;
}

export const getDomainModuleInfo = (chainId: number) => {
  return state.domainModuleInfoByChain[chainId];
}

export const getVaultFactoryAddress = () => {
  let wallet = Wallet.getInstance();
  let chainId = wallet.chainId;
  let contractInfo = getContractInfo(chainId);
  if (!contractInfo) return null;
  let factoryAddress = contractInfo.vaultFactory.address;
  return factoryAddress;
}

export const getVaultContractAddress = async () => {
  let wallet = Wallet.getInstance();
  let chainId = wallet.chainId;
  let contractInfo = getContractInfo(chainId);
  if (!contractInfo) return null;
  let profileId = getProfileId();
  if (!profileId) return null;
  let factoryAddress = contractInfo.vaultFactory.address;
  let vaultFactory = new Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
  let vaultAddress = await vaultFactory.profileVestingVault(profileId);
  return vaultAddress;
}

export const getProfileId = () => {
  let wallet = Wallet.getInstance();
  let chainId = wallet.chainId;
  let domainModuleInfo = getDomainModuleInfo(chainId);
  if (!domainModuleInfo) return null;
  return domainModuleInfo.profileId
}

export const addUserTokens = (token: ITokenObject) => {
  const chainId = getChainId();
  let tokens = localStorage[TOKENS + chainId];
  let i = -1;
  if (tokens) {
    tokens = JSON.parse(tokens);
    i = tokens.findIndex((item: ITokenObject) => item.address == token.address);
  } else {
    tokens = [];
  }
  if (i == -1) {
    tokens.push(token);
  }
  localStorage[TOKENS + chainId] = JSON.stringify(tokens);
}

export const hasUserToken = (address: string, chainId: number) => {
  return state.userTokens[chainId]?.some((token: ITokenObject) => token.address?.toLocaleLowerCase() === address?.toLocaleLowerCase());
}

export const setTokenBalances = async (value?: TokenBalancesType) => {
  state.tokenBalances = value ? value : await updateAllTokenBalances();
}

export const setUserTokens = (token: ITokenObject, chainId: number) => {
  if (!state.userTokens[chainId]) {
    state.userTokens[chainId] = [token];
  } else {
    state.userTokens[chainId].push(token);
  }
}

const TOKENS = "oswap_user_tokens_";

export const getUserTokens = (chainId: number) => {
  let tokens = localStorage[TOKENS + chainId];
  if (tokens) {
    tokens = JSON.parse(tokens);
  } else {
    tokens = [];
  }
  const userTokens = state.userTokens[chainId];
  if (userTokens && userTokens.length) {
    tokens = tokens.concat(userTokens);
  }
  return tokens.length ? tokens : null;
}

export const getTokenList = (chainId: number) => {
  const tokenList = [...DefaultTokens[chainId]];
  const userCustomTokens: any[] = getUserTokens(chainId);
  if (userCustomTokens) {
    userCustomTokens.forEach(v => tokenList.push({...v, isNew: false, isCustom: true}));
  }
  return tokenList;
}

export async function updateAllTokenBalances(): Promise<TokenBalancesType> {
  const wallet = getWallet();
  let allTokenBalancesMap: TokenBalancesType = {};
  if (!wallet.chainId || !DefaultTokens[wallet.chainId]) return allTokenBalancesMap;
  const tokenList = getTokenList(wallet.chainId);
  let promises: Promise<void>[] = []
  promises.push(...tokenList.map(async (token, index) => {
      try {
        if (token.address) {
          let balance = (await getERC20Amount(wallet, token.address, token.decimals)).toFixed()
          allTokenBalancesMap[token.address.toLowerCase()] = balance;
        }
        else {
          let balance = (await getWallet().balance).toFixed();
          allTokenBalancesMap[token.symbol] = balance;
        }
      } catch (error) {}
  }));
  
  await Promise.all(promises);
  state.tokenBalances = allTokenBalancesMap;
  return allTokenBalancesMap;
}

export const getChainNativeToken = (chainId: number): ITokenObject => {
  return ChainNativeTokenByChainId[chainId];
};

export const getTokenIcon = (address: string) => {
  if (!address) return '';
  const tokenMap = getTokenMap();
  let ChainNativeToken;
  let tokenObject;
  if (isWalletConnected()){
    ChainNativeToken = getChainNativeToken(getChainId());
    tokenObject = address == ChainNativeToken.symbol ? ChainNativeToken : tokenMap[address.toLowerCase()];
  } else {
    tokenObject = tokenMap[address.toLowerCase()];
  }
  return Assets.fullPath(getTokenIconPath(tokenObject, getChainId()));
}

export function getChainId() {
  return Wallet.getInstance().chainId;
}

export function getWallet() {
  return Wallet.getInstance();
}

export function getWalletProvider() {
  return localStorage.getItem('walletProvider') || '';
}

export function getErc20(address: string) {
  const wallet = getWallet();
  return new Erc20(wallet, address);
}

export const getTokenBalances = (): TokenBalancesType => {
  return state.tokenBalances;
}

export const getTokenObject = async (address: string, showBalance?: boolean) => {
  const ERC20Contract = new WalletContracts.ERC20(Wallet.getInstance(), address);
  const symbol = await ERC20Contract.symbol();
  const name = await ERC20Contract.name();
  const decimals = (await ERC20Contract.decimals()).toFixed();
  let balance;
  if (showBalance && getWallet().isConnected) {
    balance =  (await (ERC20Contract.balanceOf(getWallet().account.address))).shiftedBy(-decimals).toFixed();
  }
  return {
    address: address.toLowerCase(),
    decimals: +decimals,
    name,
    symbol,
    balance
  }
}

const getTokenMapData = (): TokenMapType => {
  let allTokensMap: TokenMapType = {};
  let chainId = getChainId();
  if (DefaultTokens[chainId]) {
    let defaultTokenList = DefaultTokens[chainId].sort((a, b) => {
      if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) { return -1; }
      if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) { return 1; }
      return 0;
    })
    for (let i = 0; i < defaultTokenList.length; i++) {
      let defaultTokenItem = defaultTokenList[i];
      if (defaultTokenItem.address)
        allTokensMap[defaultTokenItem.address.toLowerCase()] = defaultTokenItem;
      else
        allTokensMap[defaultTokenItem.symbol] = defaultTokenItem;
    }
    // const userCustomTokens: any[] = getUserTokens(chainId);
    // if (userCustomTokens) {
    //   userCustomTokens.forEach(v => allTokensMap[v.address] = {...v, isCustom: true});
    // }
  }
  return allTokensMap;
}
let tokenMapChainId = 0;
export const setTokenMap = () => {
  state.tokenMap = getTokenMapData()
}
export const getTokenMap = () => {
  let chainId = getChainId();
  if (tokenMapChainId != chainId) {
    state.tokenMap = getTokenMapData()
    tokenMapChainId = chainId;
  }
  return state.tokenMap
}

export const getTokensDataList = async (tokenMapData: TokenMapType, tokenBalances: any): Promise<any[]> => {
  let dataList: any[] = [];
  for (let i = 0; i < Object.keys(tokenMapData).length; i++) {
    let tokenAddress = Object.keys(tokenMapData)[i];
    let tokenObject = tokenMapData[tokenAddress];
    if (tokenBalances) {
      dataList.push({
        ...tokenObject,
        status: false,
        value: tokenBalances[tokenAddress] ? tokenBalances[tokenAddress] : 0,
      });
    } else {
      dataList.push({
        ...tokenObject,
        status: null,
      })
    }
  }
  return dataList;
}

export const viewOnExplorerByTxHash = (chainId: number, txHash: string) => {
  let network = getNetworkInfo(chainId);
  if (network && network.explorerTxUrl) {
    let url = `${network.explorerTxUrl}${txHash}`;
    window.open(url);
  }
}

export const viewOnExplorerByAddress = (chainId: number, address: string) => {
  let network = getNetworkInfo(chainId);
  if (network && network.explorerAddressUrl) {
    let url = `${network.explorerAddressUrl}${address}`;
    window.open(url);
  }
}