import { BigNumber, Utils, Wallet } from "@ijstech/eth-wallet";
import { ILockInfo, ILockRecord, VestingTreeABI } from "./common";
import { ValidVestingVault } from "./contracts";

export async function doMerkleLock(
    wallet: Wallet,
    contractAddress: string,
    campaignId: number,
    lockRecords: ILockRecord[],
    dataUri: string
) {
    let treeData = lockRecords.map(item => {
        return {
            campaignId,
            account: item.account,
            amount: item.amount,
            startDate: item.startDate,
            endDate: item.endDate
        };
    })
    let totalAmount = lockRecords.reduce((prev, item) => new BigNumber(prev).plus(item.amount), new BigNumber(0));
    const vesting = new ValidVestingVault(wallet, contractAddress);
    let tree = Utils.generateWhitelistTree(wallet, treeData, VestingTreeABI);
    let receipt = await vesting.merkleLock({
        campaignId,
        amount: totalAmount,
        merkleRoot: tree.root,
        dataUri
    });
    return receipt;
}

export async function doDirectLock(
    wallet: Wallet,
    contractAddress: string,
    campaignId: number,
    lockRecord: ILockRecord
) {
    const vesting = new ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.directLock({
        campaignId,
        recipient: lockRecord.account,
        amount: new BigNumber(lockRecord.amount),
        startDate: lockRecord.startDate,
        endDate: lockRecord.endDate
    });
    return receipt;
}

export async function getMyLocks(wallet: Wallet, contractAddress: string, campaignId: number) {
    const vesting = new ValidVestingVault(wallet, contractAddress);
    let locks: ILockInfo[] = [];
    let campaignLocksLength = await vesting.campaignLocksLength(campaignId);
    for (let i = 0; i < campaignLocksLength.toNumber(); i++) {
        let lockId = await vesting.campaignLocks({
            param1: campaignId,
            param2: i
        });
        let lock = await vesting.locks(lockId);
        let lockInfo: ILockInfo = {
            id: lockId.toNumber(),
            lockType: lock.lockType.toNumber(),
            dataUri: lock.dataUri,
            root: lock.root,
            vestingId: lock.vestingId.toNumber(),
            dateCreated: lock.dateCreated.toNumber()
        }  
        locks.push(lockInfo);
    }
    return locks;
}