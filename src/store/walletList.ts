import { WalletPlugin } from '@ijstech/eth-wallet';
import { getInfuraId, getNetworkList } from '.';
export const walletList = [
    {
        name: WalletPlugin.MetaMask,
        displayName: 'MetaMask',
        iconFile: 'metamask.png'
    },
    {
        name: WalletPlugin.ONTOWallet,
        displayName: 'ONTO Wallet',
        iconFile: 'ONTOWallet.jpg'
    },
    {
        name: WalletPlugin.Coin98,
        displayName: 'Coin98 Wallet',
        iconFile: 'Coin98.svg'
    },
    {
        name: WalletPlugin.TrustWallet,
        displayName: 'Trust Wallet',
        iconFile: 'trustwallet.svg'
    },
    {
        name: WalletPlugin.BinanceChainWallet,
        displayName: 'Binance Chain Wallet',
        iconFile: 'binance-chain-wallet.svg'
    },
    {
        name: WalletPlugin.WalletConnect,
        displayName: 'WalletConnect',
        iconFile: 'walletconnect.svg'
    }
]

export const getWalletOptions = (): { [key in WalletPlugin]?: any } => {
    let networkList = getNetworkList();
    const rpcs: {[chainId: number]:string} = {}
    for (const network of networkList) {
        let rpc = network.rpc
        if ( rpc ) rpcs[network.chainId] = rpc;
    }
    return {
        [WalletPlugin.WalletConnect]: {
            infuraId: getInfuraId(),
            bridge: "https://bridge.walletconnect.org",
            rpc: rpcs
        }
    }
}