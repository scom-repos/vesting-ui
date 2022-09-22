import { Wallet, BigNumber, Utils, Erc20 } from "@ijstech/eth-wallet";
import { Contracts, Claimant, IVestingItem, LockType, ILockRecord, ILockInfo } from '@scom/vesting-sdk';
import { getVaultContractAddress, getTokenMap } from '@vesting/store'
import { ITokenObject } from '@vesting/global';
import { fetchFileJsonContentByCID } from '@vesting/common';

interface ILockExtInfo extends ILockInfo {
  merkleTreeData: IVestingItem[];
  locked: string;
  vestingStart: number;
  vestingEnd: number;
}

interface IClaimsDetails {
  lockInfoList: ILockExtInfo[];
  claimInfoList: Claimant.IMyClaims[],
  claimable: string;
  tokenObj: ITokenObject;
}

const getClaimsDetails = async (campaignId: number) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let vault = new Contracts.ValidVestingVault(wallet, address);
  // console.log(Contracts)
  let campaignInfo = await vault.campaignInfo(campaignId);
  let tokenMap = getTokenMap();
  let tokenObj = tokenMap[campaignInfo.token.toLowerCase()];
  let lockInfoList = await Claimant.getUnverifiedLockInfo(wallet, address, campaignId);
  let claimInfoList = await Claimant.getMyClaims(wallet, address, campaignId);
  let lockExtInfoList: ILockExtInfo[] = []; 
  for (let i = 0; i < lockInfoList.length; i++) {
    let lockInfoItem = lockInfoList[i];   
    if (lockInfoItem.lockType == LockType.Merkle) {
      if (lockInfoItem.dataUri) {
        let lockRecordList = await fetchFileJsonContentByCID(lockInfoItem.dataUri) as ILockRecord[];
        let vestingList = lockRecordList.map(v => {return {...v, campaignId}});
        for (let j = 0; j < vestingList.length; j++) {
          let vestingItem = vestingList[j];
          if (vestingItem.account == wallet.address) {
            let lockExtInfo: ILockExtInfo = {
              ...lockInfoItem,
              merkleTreeData: vestingList,
              locked: Utils.fromDecimals(vestingItem.amount, tokenObj.decimals).toFixed(),
              vestingStart: vestingItem.startDate,
              vestingEnd: vestingItem.endDate,
            }
            lockExtInfoList.push(lockExtInfo);
            break;
          }
        }
      }
    }
  }

  let claimExtInfoList: Claimant.IMyClaims[] = [];
  let claimable = new BigNumber(0);
  for (let i = 0; i < claimInfoList.length; i++) {
    let claimInfoItem = claimInfoList[i];   
    claimable = claimable.plus(claimInfoItem.claimable);
    claimExtInfoList.push({
      ...claimInfoItem,
      claimed: Utils.fromDecimals(claimInfoItem.claimed, tokenObj.decimals).toFixed(),
      claimable: Utils.fromDecimals(claimInfoItem.claimable, tokenObj.decimals).toFixed(),
      locked: Utils.fromDecimals(claimInfoItem.locked, tokenObj.decimals).toFixed()
    })
  }
  let claimsDetailsObj: IClaimsDetails = {
    lockInfoList: lockExtInfoList,
    claimInfoList: claimExtInfoList,
    claimable: Utils.fromDecimals(claimable, tokenObj.decimals).toFixed(),
    tokenObj
  };
  return claimsDetailsObj;
}

const verifyMerkleLock = async (lockId: number, vestingData: IVestingItem[]) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let receipt = await Claimant.doVerifyMerkleLock(
      wallet, 
      address, 
      lockId,
      vestingData
  );
  return receipt;
}

const getMyLatestClaimInfo = async (lockId: number) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let vault = new Contracts.ValidVestingVault(wallet, address);
  let info = await vault.getInfo(lockId);
  let maxClaimedFundsInWei = await vault.maximumAllowedClaimedFunds(lockId);
  let claimedAmountInWei = await vault.vestingClaimedAmount(lockId);
  let claimableInWei = new BigNumber(maxClaimedFundsInWei).minus(claimedAmountInWei).toFixed();
  let claimable = Utils.fromDecimals(claimableInWei).toFixed();
  let lockedAmountInWei = new BigNumber(info.totalAmount).minus(claimedAmountInWei).toFixed();
  let lockedAmount = Utils.fromDecimals(lockedAmountInWei).toFixed();

  return {
    claimable,
    lockedAmount
  };
}

const claim = async (id: number, callback: any, confirmationCallback: any) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let receipt = await Claimant.doClaim(wallet, address, id);
  return receipt;
}

const claimAll = async (ids: number[], callback: any, confirmationCallback: any) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let receipt = await Claimant.doClaimAll(wallet, address, ids);
  return receipt;
}

export {
  IClaimsDetails,
  getClaimsDetails,
  verifyMerkleLock,
  getMyLatestClaimInfo,
  claim, 
  claimAll
}