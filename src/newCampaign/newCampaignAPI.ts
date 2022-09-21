import { Wallet, BigNumber, Utils, Erc20 } from "@ijstech/eth-wallet";
import { Contracts, Locker, ILockRecord, ILockInfo, IVestingItem, LockType } from '@scom/vesting-sdk';
import { getVaultContractAddress } from '@vesting/store'
import { updateDataToIPFS } from '@vesting/common';

const newCampaign = async (name: string, imgUrl: string, token: string) => {
  let wallet = Wallet.getInstance();
  let address = await getVaultContractAddress();
  if (!address) return null;
  let fileName = `vesting-new-campaign-${wallet.chainId}-${Date.now()}.json`;
  let campaignInfo = {
    name,
    imgUrl
  }
  let ipfsCid = await updateDataToIPFS(JSON.stringify(campaignInfo), fileName);
  console.log('ipfsCid', ipfsCid);
  let vault = new Contracts.ValidVestingVault(wallet, address);
  let receipt = await vault.newCampaign({
    token: token,
    ownerFrozen: true,
    dataUri: ipfsCid
  })
  return receipt;
}

export {
  newCampaign
}