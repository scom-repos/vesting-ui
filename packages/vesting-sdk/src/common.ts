import { BigNumber, Wallet } from "@ijstech/eth-wallet";
import { ValidVestingVault } from "./contracts";

export interface ILockRecord {
    account: string;
    amount: string;
    startDate: number;
    endDate: number;
}

export interface IVestingItem extends ILockRecord {
    campaignId: number;
}

export const VestingTreeABI = [
    {
        type: 'uint256',
        name: 'campaignId'
    },
    {
        type: 'uint256',
        name: 'amount'
    },
    {
        type: 'uint256',
        name: 'startDate'
    },
    {
        type: 'uint256',
        name: 'endDate'
    }
];

export interface ICampaignInfo {
    id: number;
    dataUri: string;
    token: string;
    ownerFrozen: boolean;
}

export enum LockType { Direct, Merkle }

export interface ILockInfo {
    id: number;
    lockType: LockType;
    vestingId?: number;
    dataUri?: string;
    root?: string;
    dateCreated: number;
}

export async function getCampaignInfo(wallet: Wallet, contractAddress: string, campaignId: number) {
    let vesting = new ValidVestingVault(wallet, contractAddress);
    let info = await vesting.campaignInfo(campaignId);
    let campaignInfo: ICampaignInfo = {
        ...info,
        id: campaignId
    }
    return campaignInfo;
}

export async function getCampaignInfoList(wallet: Wallet, contractAddress: string) {
    let vesting = new ValidVestingVault(wallet, contractAddress);
    let campaignInfoList: ICampaignInfo[] = [];
    let campaignIdCount = await vesting.campaignIdCount();
    for (let i = 1; i <= campaignIdCount.toNumber(); i++) {
        let info = await vesting.campaignInfo(i);
        let campaignInfo: ICampaignInfo = {
            ...info,
            id: i
        }
        campaignInfoList.push(campaignInfo);
    }

    return campaignInfoList;
}