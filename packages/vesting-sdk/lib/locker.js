"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyLocks = exports.doDirectLock = exports.doMerkleLock = void 0;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const common_1 = require("./common");
const contracts_1 = require("./contracts");
async function doMerkleLock(wallet, contractAddress, campaignId, lockRecords, dataUri) {
    let treeData = lockRecords.map(item => {
        return {
            campaignId,
            account: item.account,
            amount: item.amount,
            startDate: item.startDate,
            endDate: item.endDate
        };
    });
    let totalAmount = lockRecords.reduce((prev, item) => new eth_wallet_1.BigNumber(prev).plus(item.amount), new eth_wallet_1.BigNumber(0));
    const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    let tree = eth_wallet_1.Utils.generateWhitelistTree(wallet, treeData, common_1.VestingTreeABI);
    let receipt = await vesting.merkleLock({
        campaignId,
        amount: totalAmount,
        merkleRoot: tree.root,
        dataUri
    });
    return receipt;
}
exports.doMerkleLock = doMerkleLock;
async function doDirectLock(wallet, contractAddress, campaignId, lockRecord) {
    const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.directLock({
        campaignId,
        recipient: lockRecord.account,
        amount: new eth_wallet_1.BigNumber(lockRecord.amount),
        startDate: lockRecord.startDate,
        endDate: lockRecord.endDate
    });
    return receipt;
}
exports.doDirectLock = doDirectLock;
async function getMyLocks(wallet, contractAddress, campaignId) {
    const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
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
exports.getMyLocks = getMyLocks;
