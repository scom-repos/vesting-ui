import { Wallet, BigNumber, Utils, Erc20 } from "@ijstech/eth-wallet";
import { Contracts, Locker, ILockRecord, ILockInfo, IVestingItem, LockType } from '@scom/vesting-sdk';
import { getVaultContractAddress, getTokenMap } from '@vesting/store'
import { ITokenObject } from '@vesting/global';
import { updateDataToIPFS, fetchFileJsonContentByCID } from '@vesting/common';

export interface ILockExtInfo extends ILockInfo {
  locked: string;
  recipient: string;
  startDate: number;
  endDate: number;
}

export interface ILocksDetails {
  campaignName: string;
  campaignImgUrl: string;
  lockInfoList: ILockExtInfo[];
  tokenObj: ITokenObject;
}

const getLocksDetails = async (campaignId: number) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let vault = new Contracts.ValidVestingVault(wallet, address);
  let campaignInfo = await vault.campaignInfo(campaignId);
  let tokenMap = getTokenMap();
  let tokenObj = tokenMap[campaignInfo.token.toLowerCase()];
  let myLocks = await Locker.getMyLocks(wallet, address, campaignId);
  let lockExtInfoList: ILockExtInfo[] = []; 
  for (let i = 0; i < myLocks.length; i++) {
    let lockInfoItem = myLocks[i];   
    if (lockInfoItem.lockType == LockType.Merkle) {
      if (lockInfoItem.dataUri) {
        let lockRecordList = await fetchFileJsonContentByCID(lockInfoItem.dataUri) as ILockRecord[];
        for (let j = 0; j < lockRecordList.length; j++) {
          let lockRecordItem = lockRecordList[j];
          lockExtInfoList.push({
            ...lockInfoItem,
            locked: Utils.fromDecimals(lockRecordItem.amount, tokenObj.decimals).toFixed(),
            recipient: lockRecordItem.account,
            startDate: lockRecordItem.startDate,
            endDate: lockRecordItem.endDate
          })
        }
      }
    }
  }

  let campaignIpfsData = await fetchFileJsonContentByCID(campaignInfo.dataUri);
  let locksDetailsObj: ILocksDetails = {
    campaignName: campaignIpfsData.name,
    campaignImgUrl: campaignIpfsData.imgUrl,
    lockInfoList: lockExtInfoList,
    tokenObj
  }
  return locksDetailsObj;
}

const doMerkleLock = async (campaignId: number, lockRecords: ILockRecord[]) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let fileName = `vesting-merkle-lock-${wallet.chainId}-${campaignId}-${Date.now()}.json`;
  let ipfsCid = await updateDataToIPFS(JSON.stringify(lockRecords), fileName);
  console.log('ipfsCid', ipfsCid);
  let receipt = await Locker.doMerkleLock(wallet, address, campaignId, lockRecords, ipfsCid.cid);
  return receipt;
}

export {
  getLocksDetails,
  doMerkleLock
}