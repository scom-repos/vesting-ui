import { Wallet } from "@ijstech/eth-wallet";
export interface ILockRecord {
    account: string;
    amount: string;
    startDate: number;
    endDate: number;
}
export interface IVestingItem extends ILockRecord {
    campaignId: number;
}
export declare const VestingTreeABI: {
    type: string;
    name: string;
}[];
export interface ICampaignInfo {
    id: number;
    dataUri: string;
    token: string;
    ownerFrozen: boolean;
}
export declare enum LockType {
    Direct = 0,
    Merkle = 1
}
export interface ILockInfo {
    id: number;
    lockType: LockType;
    vestingId?: number;
    dataUri?: string;
    root?: string;
    dateCreated: number;
}
export declare function getCampaignInfo(wallet: Wallet, contractAddress: string, campaignId: number): Promise<ICampaignInfo>;
export declare function getCampaignInfoList(wallet: Wallet, contractAddress: string): Promise<ICampaignInfo[]>;
