"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doClaimAll = exports.doClaim = exports.getMyClaims = exports.getUnverifiedLockInfoMap = exports.getUnverifiedLockInfo = exports.doVerifyDirectLock = exports.doVerifyMerkleLock = void 0;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const common_1 = require("./common");
const contracts_1 = require("./contracts");
async function doVerifyMerkleLock(wallet, contractAddress, lockId, vestingData) {
    const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    const merkleInfo = await vesting.locks(lockId);
    let proof = eth_wallet_1.Utils.getWhitelistTreeProof(wallet, merkleInfo.root, vestingData, common_1.VestingTreeABI);
    let vestingItem = vestingData.find(v => v.account == wallet.address);
    if (!vestingItem)
        return null;
    let receipt = await vesting.verifyMerkleLock({
        lockId: lockId,
        amount: new eth_wallet_1.BigNumber(vestingItem.amount),
        startDate: vestingItem.startDate,
        endDate: vestingItem.endDate,
        campaignId: vestingItem.campaignId,
        proof
    });
    return receipt;
}
exports.doVerifyMerkleLock = doVerifyMerkleLock;
async function doVerifyDirectLock(wallet, contractAddress, vestingId) {
    const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.verifyDirectLock(vestingId);
    return receipt;
}
exports.doVerifyDirectLock = doVerifyDirectLock;
async function getUnverifiedLockInfo(wallet, contractAddress, campaignId) {
    let unverifiedLockInfoList = [];
    let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
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
        });
        if (!isLockIdVerified) {
            let lockInfo = {
                id: lockId.toNumber(),
                lockType: lockInfoItem.lockType.toNumber(),
                dataUri: lockInfoItem.dataUri,
                root: lockInfoItem.root,
                vestingId: lockInfoItem.vestingId.toNumber(),
                dateCreated: lockInfoItem.dateCreated.toNumber()
            };
            unverifiedLockInfoList.push(lockInfo);
        }
    }
    return unverifiedLockInfoList;
}
exports.getUnverifiedLockInfo = getUnverifiedLockInfo;
async function getUnverifiedLockInfoMap(wallet, contractAddress, campaignIds) {
    let unverifiedLockInfoMap = {};
    for (let i = 0; i < campaignIds.length; i++) {
        let campaignId = campaignIds[i];
        unverifiedLockInfoMap[campaignId] = unverifiedLockInfoMap[campaignId] || [];
        let lockInfo = await getUnverifiedLockInfo(wallet, contractAddress, campaignId);
        unverifiedLockInfoMap[campaignId] = lockInfo;
    }
    return unverifiedLockInfoMap;
}
exports.getUnverifiedLockInfoMap = getUnverifiedLockInfoMap;
async function getMyClaims(wallet, contractAddress, campaignId) {
    let claimsArr = [];
    try {
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let nftCount = await vesting.balanceOf(wallet.address);
        for (let i = 0; i < nftCount.toNumber(); i++) {
            let nftId = await vesting.tokenOfOwnerByIndex({
                owner: wallet.address,
                index: i
            });
            let info = await vesting.getInfo(nftId);
            if (campaignId && info.campaignId.toNumber() != campaignId)
                continue;
            let vestingId = info.vestingId;
            let maxClaimedFunds = await vesting.maximumAllowedClaimedFunds(vestingId);
            let claimed = await vesting.vestingClaimedAmount(vestingId);
            let claimable = new eth_wallet_1.BigNumber(maxClaimedFunds).minus(claimed).toFixed();
            let locked = new eth_wallet_1.BigNumber(info.totalAmount).minus(claimed).toFixed();
            let vestingStart = info.startDate.toNumber();
            let vestingEnd = info.endDate.toNumber();
            let claimInfo = {
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
exports.getMyClaims = getMyClaims;
async function doClaim(wallet, contractAddress, id) {
    if (!contractAddress)
        return;
    let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.claim(id);
    return receipt;
}
exports.doClaim = doClaim;
async function doClaimAll(wallet, contractAddress, ids) {
    if (!contractAddress)
        return;
    let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
    let receipt = await vesting.claimMultiple(ids);
    return receipt;
}
exports.doClaimAll = doClaimAll;
