export interface INetwork {
    chainId: number;
    name: string;
    img: string;
    rpc?: string;
    explorerName?: string;
    explorerTxUrl?: string;
    explorerAddressUrl?: string;
};

export const enum EventId {
    Paid = 'Paid',
    ConnectWallet = 'connectWallet',
    IsWalletConnected = 'isWalletConnected',
    IsWalletDisconnected = 'IsWalletDisconnected',
    chainChanged = 'chainChanged',
    ShowResult = 'showResult',
    SetResultMessage = 'setResultMessage',
    ShowMainLayout = 'showMainLayout',
    ActiveTreeNode = 'activeTreeNode',
    GoToFile = 'goToFile',
    ShowConfirmationModal = 'showConfirmationModal',
    SetConfirmationMessage = 'setConfirmationMessage',
    ConfirmAction = 'confirmAction',
    ShowActionModal = 'showActionModal',
    SetActionModalData = 'setActionModalData',
    FetchProjectData = 'fetchProjectData',
    FetchPackageData = 'fetchPackageData',
    EmitNewToken = 'emitNewToken',
}

export interface ITokenObject {
    address?: string;
    name: string;
    decimals: number;
    symbol: string;
    status?: boolean | null;
    logoURI?: string;
    isCommon?: boolean | null;
    balance?: string | number;
    isNative?: boolean | null;
    isWETH?: boolean | null;
    isNew?: boolean | null;
};

export {
    getERC20Amount,
} from './utils/common';

export type TokenMapType = { [token: string]: ITokenObject; };

export * from './utils';