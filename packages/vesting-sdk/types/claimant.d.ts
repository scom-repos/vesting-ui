import { BigNumber, Wallet } from "@ijstech/eth-wallet";
import { ILockInfo, IVestingItem } from "./common";
export interface IMyClaims {
    campaignId: number;
    tokenId: number;
    vestingId: number;
    claimed: string;
    claimable: string;
    locked: string;
    vestingStart: number;
    vestingEnd: number;
}
export interface IMerkleInfo {
    id: number;
    dataUri: string;
    root: string;
}
export interface IDirectLockInfo {
    id: number;
    campaignId: BigNumber;
    recipient: string;
    amount: BigNumber;
    startDate: BigNumber;
    endDate: BigNumber;
    status: BigNumber;
}
export declare function doVerifyMerkleLock(wallet: Wallet, contractAddress: string, lockId: number, vestingData: IVestingItem[]): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
export declare function doVerifyDirectLock(wallet: Wallet, contractAddress: string, vestingId: number): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
export declare function getUnverifiedLockInfo(wallet: Wallet, contractAddress: string, campaignId: number): Promise<ILockInfo[]>;
export declare function getUnverifiedLockInfoMap(wallet: Wallet, contractAddress: string, campaignIds: number[]): Promise<{
    [campaignId: number]: ILockInfo[];
}>;
export declare function getMyClaims(wallet: Wallet, contractAddress: string, campaignId?: number): Promise<IMyClaims[]>;
export declare function doClaim(wallet: Wallet, contractAddress: string, id: number): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
export declare function doClaimAll(wallet: Wallet, contractAddress: string, ids: number[]): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
