import { Wallet } from "@ijstech/eth-wallet";
import { ILockInfo, ILockRecord } from "./common";
export declare function doMerkleLock(wallet: Wallet, contractAddress: string, campaignId: number, lockRecords: ILockRecord[], dataUri: string): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
export declare function doDirectLock(wallet: Wallet, contractAddress: string, campaignId: number, lockRecord: ILockRecord): Promise<import("@ijstech/eth-wallet/types/wallet").TransactionReceipt>;
export declare function getMyLocks(wallet: Wallet, contractAddress: string, campaignId: number): Promise<ILockInfo[]>;
