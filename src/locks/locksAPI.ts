import { Wallet, BigNumber, Utils, Erc20 } from "@ijstech/eth-wallet";
import { Contracts, getCampaignInfoList, ICampaignInfo } from '@scom/vesting-sdk';
import { getVaultContractAddress, getTokenMap } from '@vesting/store';
import { ITokenObject } from '@vesting/global';

interface ICampaignExtInfo extends ICampaignInfo {
  tokenObj: ITokenObject;
  locked: string;
  claimed: string;
}

const getMyCampaigns = async () => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return [];
  let vault = new Contracts.ValidVestingVault(wallet, address);
  let myCampaigns: ICampaignExtInfo[] = [];
  let isPermitted = await vault.isPermitted(wallet.address);
  if (isPermitted.toNumber() == 0) return [];
  let tokenMap = getTokenMap();
  let campaignInfoList = await getCampaignInfoList(wallet, address);
  for (let i = 0; i < campaignInfoList.length; i++) {
    let campaignInfoItem = campaignInfoList[i];
    let tokenObj = tokenMap[campaignInfoItem.token.toLowerCase()];
    let locked = await vault.campaignLocked(campaignInfoItem.id);
    let claimed = await vault.campaignClaimed(campaignInfoItem.id);
    let campaignInfo: ICampaignExtInfo = {
      ...campaignInfoItem,
      tokenObj,
      locked: Utils.fromDecimals(locked, tokenObj.decimals).toFixed(),
      claimed: Utils.fromDecimals(claimed, tokenObj.decimals).toFixed()
    };
    myCampaigns.push(campaignInfo);
  }
  console.log('myCampaigns', myCampaigns);
  return myCampaigns;
}

export {
  ICampaignExtInfo,
  getMyCampaigns,
  getVaultContractAddress
}