import { BigNumber, Utils, Wallet } from "@ijstech/eth-wallet";
import { ILockInfo, IVestingItem, VestingTreeABI } from "./common";
import { ValidVestingVault } from "./contracts";

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

export async function doVerifyMerkleLock(
    wallet: Wallet,
    contractAddress: string,
    lockId: number,
    vestingData: IVestingItem[]
) {
    const vesting = new ValidVestingVault(wallet, contractAddress);
    const merkleInfo = await vesting.locks(lockId);
    let proof = Utils.getWhitelistTreeProof(wallet, merkleInfo.root, vestingData, VestingTreeABI);
    let vestingItem = vestingData.find(v => v.account == wallet.address);
    if (!vestingItem) return null;
    let receipt = await vesting.verifyMerkleLock({
        lockId: lockId,
        amount: new BigNumber(vestingItem.amount),
        startDate: vestingItem.startDate,
        endDate: vestingItem.endDate,
        campaignId: vestingItem.campaignId,
        proof
    })
    return receipt;
}

export async function doVerifyDirectLock(
    wallet: Wallet,
    contractAddress: string,
    vestingId: number
) {
    const vesting = new ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.verifyDirectLock(vestingId)
    return receipt;
}

export async function getUnverifiedLockInfo(wallet: Wallet, contractAddress: string, campaignId: number) {
    let unverifiedLockInfoList: ILockInfo[] = [];
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
        })
        if (!isLockIdVerified) {
            let lockInfo: ILockInfo = {
                id: lockId.toNumber(),
                lockType: lockInfoItem.lockType.toNumber(),
                dataUri: lockInfoItem.dataUri,
                root: lockInfoItem.root,
                vestingId: lockInfoItem.vestingId.toNumber(),
                dateCreated: lockInfoItem.dateCreated.toNumber()
            }   
            unverifiedLockInfoList.push(lockInfo);  
        }    
    }
    return unverifiedLockInfoList;
}

export async function getUnverifiedLockInfoMap(wallet: Wallet, contractAddress: string, campaignIds: number[]) {
    let unverifiedLockInfoMap: {[campaignId: number]: ILockInfo[]} = {};
    for (let i = 0; i < campaignIds.length; i++) {
        let campaignId = campaignIds[i];
        unverifiedLockInfoMap[campaignId] = unverifiedLockInfoMap[campaignId] || [];
        let lockInfo = await getUnverifiedLockInfo(wallet, contractAddress, campaignId);
        unverifiedLockInfoMap[campaignId] = lockInfo;
    }
    return unverifiedLockInfoMap;
}

export async function getMyClaims(wallet: Wallet, contractAddress: string, campaignId?: number) {
    let claimsArr: IMyClaims[] = [];
    try {
        let vesting = new ValidVestingVault(wallet, contractAddress);
        let nftCount = await vesting.balanceOf(wallet.address);
        for (let i = 0; i < nftCount.toNumber(); i++) {
            let nftId = await vesting.tokenOfOwnerByIndex({
                owner: wallet.address,
                index: i
            });
            let info = await vesting.getInfo(nftId);
            if (campaignId && info.campaignId.toNumber() != campaignId) continue;
            let vestingId = info.vestingId;
            let maxClaimedFunds = await vesting.maximumAllowedClaimedFunds(vestingId);
            let claimed = await vesting.vestingClaimedAmount(vestingId);
            let claimable = new BigNumber(maxClaimedFunds).minus(claimed).toFixed();
            let locked = new BigNumber(info.totalAmount).minus(claimed).toFixed();
            let vestingStart = info.startDate.toNumber();
            let vestingEnd = info.endDate.toNumber();

            let claimInfo: IMyClaims = {
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
    }
    catch (err) {
        console.log('err', err);
    }
    return claimsArr;
}

export async function doClaim(wallet: Wallet, contractAddress: string, id: number) {
    if (!contractAddress) return;
    let vesting = new ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.claim(id);
    return receipt;
}

export async function doClaimAll(wallet: Wallet, contractAddress: string, ids: number[]) {
    if (!contractAddress) return;
    let vesting = new ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.claimMultiple(ids);
    return receipt;
}