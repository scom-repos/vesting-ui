import { TransactionReceipt, Wallet } from "@ijstech/eth-wallet";
import { getVaultFactoryAddress } from "@vesting/store";
import { Contracts } from '@scom/vesting-sdk';

const newProfile = async () => {
  let wallet = Wallet.getInstance();
  let factoryAddress = getVaultFactoryAddress();
  if (!factoryAddress) return null;
  let factory = new Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
  let receipt = await factory.newProfile([wallet.address]);
  return receipt;
}

const getNewProfileId = (receipt: TransactionReceipt) => {
  let wallet = Wallet.getInstance();
  let factoryAddress = getVaultFactoryAddress();
  if (!factoryAddress) return null;
  let factory = new Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
  let event = factory.parseNewProfileEvent(receipt)[0];
  return event.profileId.toNumber();
}

export {
  newProfile,
  getNewProfileId
}