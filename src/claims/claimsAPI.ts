import { Wallet, BigNumber, Utils, Erc20 } from "@ijstech/eth-wallet";
import { Contracts, Claimant, IVestingItem, getCampaignInfoList, ICampaignInfo, ILockInfo, LockType, ILockRecord } from '@scom/vesting-sdk';
import { getVaultContractAddress, getTokenMap } from '@vesting/store'
import { ITokenObject } from '@vesting/global';
import { fetchFileJsonContentByCID, fetchFileJsonContentByCID2 } from '@vesting/common';

interface ICampaignExtInfo extends ICampaignInfo {
  campaignName: string;
  campaignImgUrl: string;
  tokenObj: ITokenObject;
  locked: string;
  claimed: string;
  claimable: string;
  lockInfoList?: ILockInfo[];
  claimInfoList?: Claimant.IMyClaims[];
}

const getMyCampaigns = async () => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return [];
  let campaignInfoList = await getCampaignInfoList(wallet, address);
  let myCampaignList: ICampaignExtInfo[] = [];
  if (campaignInfoList.length > 0) {
    let tokenMap = getTokenMap();
    let myClaims = await Claimant.getMyClaims(wallet, address);
    let myClaimsByCampaignId: {[campaignId: number]: Claimant.IMyClaims[]} = {};
    for (let i = 0; i < myClaims.length; i++) {
      let myClaim = myClaims[i];
      myClaimsByCampaignId[myClaim.campaignId] = myClaimsByCampaignId[myClaim.campaignId] || [];
      myClaimsByCampaignId[myClaim.campaignId].push(myClaim);
    }
    for (let i = 0; i < campaignInfoList.length; i++) {
      let campaignInfo = campaignInfoList[i];
      let tokenObj = tokenMap[campaignInfo.token.toLowerCase()];
      let myCampaignItem: ICampaignExtInfo = {
        ...campaignInfo,
        campaignName: '',
        campaignImgUrl: '',
        tokenObj,
        locked: '0',
        claimed: '0',
        claimable: '0'
      }
      myCampaignItem.lockInfoList = await Claimant.getUnverifiedLockInfo(wallet, address, campaignInfo.id);
      myCampaignItem.claimInfoList = myClaimsByCampaignId[campaignInfo.id] || [];
      if (myCampaignItem.lockInfoList.length == 0 && myCampaignItem.claimInfoList.length == 0) continue;

      let lockFound = false;
      if (myCampaignItem.lockInfoList.length > 0) {
        for (let j = 0; j < myCampaignItem.lockInfoList.length; j++) {
          let lockInfoItem = myCampaignItem.lockInfoList[j];
          if (lockInfoItem.lockType == LockType.Merkle) {
            if (lockInfoItem.dataUri) {
              let lockRecordList = await fetchFileJsonContentByCID2(lockInfoItem.dataUri) as ILockRecord[];
              let itemfound = lockRecordList.find(v => v.account.toLowerCase() == wallet.address.toLowerCase());
              if (itemfound) {
                lockFound = true;
                break;
              }
            }
          }
        }
      }
      if (!lockFound && myCampaignItem.claimInfoList.length == 0) continue;

      let campaignIpfsData = await fetchFileJsonContentByCID2(campaignInfo.dataUri);
      myCampaignItem.campaignName = campaignIpfsData.name;
      myCampaignItem.campaignImgUrl = campaignIpfsData.imgUrl;

      if (myCampaignItem.claimInfoList.length > 0) {
        let locked = new BigNumber(0), claimed = new BigNumber(0), claimable = new BigNumber(0);
        for (let j = 0; j < myCampaignItem.claimInfoList.length; j++) {
          let claimInfoItem = myCampaignItem.claimInfoList[j];   
          locked = locked.plus(claimInfoItem.locked);
          claimed = claimed.plus(claimInfoItem.claimed);
          claimable = claimable.plus(claimInfoItem.claimable);
        }
        myCampaignItem.locked = Utils.fromDecimals(locked, tokenObj.decimals).toFixed();
        myCampaignItem.claimed = Utils.fromDecimals(claimed, tokenObj.decimals).toFixed();
        myCampaignItem.claimable = Utils.fromDecimals(claimable, tokenObj.decimals).toFixed();
      }

      myCampaignList.push(myCampaignItem);
    }
  }
  return myCampaignList;
}

export {
  ICampaignExtInfo,
  getMyCampaigns
}