import { IWallet, Contract, TransactionReceipt, BigNumber, Event } from "@ijstech/eth-wallet";
export interface IDeployParams {
    name: string;
    symbol: string;
}
export interface IApproveParams {
    to: string;
    tokenId: number | BigNumber;
}
export interface ICampaignDirectLockInfoParams {
    param1: number | BigNumber;
    param2: number | BigNumber;
}
export interface ICampaignMerkleInfoParams {
    param1: number | BigNumber;
    param2: number | BigNumber;
}
export interface IDirectLockParams {
    profileId: number | BigNumber;
    campaignId: number | BigNumber;
    recipient: string;
    amount: number | BigNumber;
    startDate: number | BigNumber;
    endDate: number | BigNumber;
}
export interface IGetUnverifiedDirectLockInfoParams {
    campaignId: number | BigNumber;
    recipient: string;
}
export interface IGetUnverifiedMerkleInfoParams {
    campaignId: number | BigNumber;
    recipient: string;
}
export interface IIsApprovedForAllParams {
    owner: string;
    operator: string;
}
export interface IIsMerkleIdVerifiedParams {
    param1: string;
    param2: number | BigNumber;
}
export interface IIsVestingIdVerifiedParams {
    param1: string;
    param2: number | BigNumber;
}
export interface IMerkleLockParams {
    profileId: number | BigNumber;
    campaignId: number | BigNumber;
    amount: number | BigNumber;
    merkleRoot: string;
    ipfsCid: string;
}
export interface INewCampaignParams {
    profileId: number | BigNumber;
    token: string;
    ownerFrozen: boolean;
    ipfsCid: string;
}
export interface IProfileAdminsParams {
    param1: number | BigNumber;
    param2: number | BigNumber;
}
export interface IProfileCampaignsParams {
    param1: number | BigNumber;
    param2: number | BigNumber;
}
export interface ISafeTransferFromParams {
    from: string;
    to: string;
    tokenId: number | BigNumber;
}
export interface ISafeTransferFrom_1Params {
    from: string;
    to: string;
    tokenId: number | BigNumber;
    data: string;
}
export interface ISetApprovalForAllParams {
    operator: string;
    approved: boolean;
}
export interface ITokenOfOwnerByIndexParams {
    owner: string;
    index: number | BigNumber;
}
export interface ITransferFromParams {
    from: string;
    to: string;
    tokenId: number | BigNumber;
}
export interface IUpdateCampaignParams {
    profileId: number | BigNumber;
    campaignId: number | BigNumber;
    ipfsCid: string;
}
export interface IVerifyMerkleLockParams {
    merkleId: number | BigNumber;
    campaignId: number | BigNumber;
    amount: number | BigNumber;
    startDate: number | BigNumber;
    endDate: number | BigNumber;
    proof: string[];
}
export declare class Vesting extends Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams): Promise<string>;
    parseApprovalEvent(receipt: TransactionReceipt): Vesting.ApprovalEvent[];
    decodeApprovalEvent(event: Event): Vesting.ApprovalEvent;
    parseApprovalForAllEvent(receipt: TransactionReceipt): Vesting.ApprovalForAllEvent[];
    decodeApprovalForAllEvent(event: Event): Vesting.ApprovalForAllEvent;
    parseAuthorizeEvent(receipt: TransactionReceipt): Vesting.AuthorizeEvent[];
    decodeAuthorizeEvent(event: Event): Vesting.AuthorizeEvent;
    parseClaimEvent(receipt: TransactionReceipt): Vesting.ClaimEvent[];
    decodeClaimEvent(event: Event): Vesting.ClaimEvent;
    parseCreateMerkleRootEvent(receipt: TransactionReceipt): Vesting.CreateMerkleRootEvent[];
    decodeCreateMerkleRootEvent(event: Event): Vesting.CreateMerkleRootEvent;
    parseCreateVestingEvent(receipt: TransactionReceipt): Vesting.CreateVestingEvent[];
    decodeCreateVestingEvent(event: Event): Vesting.CreateVestingEvent;
    parseDeauthorizeEvent(receipt: TransactionReceipt): Vesting.DeauthorizeEvent[];
    decodeDeauthorizeEvent(event: Event): Vesting.DeauthorizeEvent;
    parseMintEvent(receipt: TransactionReceipt): Vesting.MintEvent[];
    decodeMintEvent(event: Event): Vesting.MintEvent;
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Vesting.StartOwnershipTransferEvent[];
    decodeStartOwnershipTransferEvent(event: Event): Vesting.StartOwnershipTransferEvent;
    parseTransferEvent(receipt: TransactionReceipt): Vesting.TransferEvent[];
    decodeTransferEvent(event: Event): Vesting.TransferEvent;
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Vesting.TransferOwnershipEvent[];
    decodeTransferOwnershipEvent(event: Event): Vesting.TransferOwnershipEvent;
    approve: {
        (params: IApproveParams): Promise<TransactionReceipt>;
        call: (params: IApproveParams) => Promise<void>;
    };
    balanceOf: {
        (owner: string): Promise<BigNumber>;
    };
    campaignDirectLockInfo: {
        (params: ICampaignDirectLockInfoParams): Promise<{
            id: BigNumber;
            campaignId: BigNumber;
            recipient: string;
            amount: BigNumber;
            startDate: BigNumber;
            endDate: BigNumber;
            status: BigNumber;
        }>;
    };
    campaignDirectLockInfoLength: {
        (campaignId: number | BigNumber): Promise<BigNumber>;
    };
    campaignIdCount: {
        (): Promise<BigNumber>;
    };
    campaignInfo: {
        (param1: number | BigNumber): Promise<{
            id: BigNumber;
            ipfsCid: string;
            token: string;
            ownerFrozen: boolean;
        }>;
    };
    campaignMerkleInfo: {
        (params: ICampaignMerkleInfoParams): Promise<{
            id: BigNumber;
            ipfsCid: string;
            root: string;
        }>;
    };
    campaignMerkleInfoLength: {
        (campaignId: number | BigNumber): Promise<BigNumber>;
    };
    campaignProfileId: {
        (param1: number | BigNumber): Promise<BigNumber>;
    };
    claim: {
        (id: number | BigNumber): Promise<TransactionReceipt>;
        call: (id: number | BigNumber) => Promise<void>;
    };
    claimMultiple: {
        (ids: (number | BigNumber)[]): Promise<TransactionReceipt>;
        call: (ids: (number | BigNumber)[]) => Promise<void>;
    };
    deny: {
        (user: string): Promise<TransactionReceipt>;
        call: (user: string) => Promise<void>;
    };
    directLock: {
        (params: IDirectLockParams): Promise<TransactionReceipt>;
        call: (params: IDirectLockParams) => Promise<BigNumber>;
    };
    getAllInfo: {
        (owner: string): Promise<{
            campaignId: BigNumber[];
            vestingId: BigNumber[];
            tokenId: BigNumber[];
            token: string[];
            unclaimedFunds: BigNumber[];
            claimedAmount: BigNumber[];
            totalAmount: BigNumber[];
            startDate: BigNumber[];
            endDate: BigNumber[];
        }>;
    };
    getApproved: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    getInfo: {
        (nftId: number | BigNumber): Promise<{
            campaignId: BigNumber;
            recipient: string;
            token: string;
            unclaimedFunds: BigNumber;
            claimedAmount: BigNumber;
            totalAmount: BigNumber;
            startDate: BigNumber;
            endDate: BigNumber;
        }>;
    };
    getUnverifiedDirectLockInfo: {
        (params: IGetUnverifiedDirectLockInfoParams): Promise<{
            id: BigNumber;
            campaignId: BigNumber;
            recipient: string;
            amount: BigNumber;
            startDate: BigNumber;
            endDate: BigNumber;
            status: BigNumber;
        }[]>;
    };
    getUnverifiedMerkleInfo: {
        (params: IGetUnverifiedMerkleInfoParams): Promise<{
            id: BigNumber;
            ipfsCid: string;
            root: string;
        }[]>;
    };
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    };
    isMerkleIdVerified: {
        (params: IIsMerkleIdVerifiedParams): Promise<boolean>;
    };
    isPermitted: {
        (param1: string): Promise<BigNumber>;
    };
    isVestingIdVerified: {
        (params: IIsVestingIdVerifiedParams): Promise<boolean>;
    };
    maximumAllowedClaimedFunds: {
        (vestingId: number | BigNumber): Promise<BigNumber>;
    };
    merkleIdCount: {
        (): Promise<BigNumber>;
    };
    merkleInfo: {
        (param1: number | BigNumber): Promise<{
            id: BigNumber;
            ipfsCid: string;
            root: string;
        }>;
    };
    merkleLock: {
        (params: IMerkleLockParams): Promise<TransactionReceipt>;
        call: (params: IMerkleLockParams) => Promise<BigNumber>;
    };
    name: {
        (): Promise<string>;
    };
    newCampaign: {
        (params: INewCampaignParams): Promise<TransactionReceipt>;
        call: (params: INewCampaignParams) => Promise<BigNumber>;
    };
    newOwner: {
        (): Promise<string>;
    };
    newProfile: {
        (admins: string[]): Promise<TransactionReceipt>;
        call: (admins: string[]) => Promise<BigNumber>;
    };
    nftIdCount: {
        (): Promise<BigNumber>;
    };
    nftVestingId: {
        (param1: number | BigNumber): Promise<BigNumber>;
    };
    owner: {
        (): Promise<string>;
    };
    ownerOf: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    ownerProfileId: {
        (param1: string): Promise<BigNumber>;
    };
    permit: {
        (user: string): Promise<TransactionReceipt>;
        call: (user: string) => Promise<void>;
    };
    profileAdmins: {
        (params: IProfileAdminsParams): Promise<string>;
    };
    profileCampaigns: {
        (params: IProfileCampaignsParams): Promise<BigNumber>;
    };
    profileCampaignsLength: {
        (profileId: number | BigNumber): Promise<BigNumber>;
    };
    profileIdCount: {
        (): Promise<BigNumber>;
    };
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    };
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params) => Promise<void>;
    };
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    };
    setProfileAdmins: {
        (admins: string[]): Promise<TransactionReceipt>;
        call: (admins: string[]) => Promise<void>;
    };
    supportsInterface: {
        (interfaceId: string): Promise<boolean>;
    };
    symbol: {
        (): Promise<string>;
    };
    takeOwnership: {
        (): Promise<TransactionReceipt>;
        call: () => Promise<void>;
    };
    tokenByIndex: {
        (index: number | BigNumber): Promise<BigNumber>;
    };
    tokenOfOwnerByIndex: {
        (params: ITokenOfOwnerByIndexParams): Promise<BigNumber>;
    };
    tokenURI: {
        (tokenId: number | BigNumber): Promise<string>;
    };
    totalSupply: {
        (): Promise<BigNumber>;
    };
    transferFrom: {
        (params: ITransferFromParams): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams) => Promise<void>;
    };
    transferOwnership: {
        (newOwner: string): Promise<TransactionReceipt>;
        call: (newOwner: string) => Promise<void>;
    };
    updateCampaign: {
        (params: IUpdateCampaignParams): Promise<TransactionReceipt>;
        call: (params: IUpdateCampaignParams) => Promise<void>;
    };
    verifyDirectLock: {
        (vestingId: number | BigNumber): Promise<TransactionReceipt>;
        call: (vestingId: number | BigNumber) => Promise<BigNumber>;
    };
    verifyMerkleLock: {
        (params: IVerifyMerkleLockParams): Promise<TransactionReceipt>;
        call: (params: IVerifyMerkleLockParams) => Promise<BigNumber>;
    };
    vestingClaimedAmount: {
        (param1: number | BigNumber): Promise<BigNumber>;
    };
    vestingIdCount: {
        (): Promise<BigNumber>;
    };
    vestingInfo: {
        (param1: number | BigNumber): Promise<{
            id: BigNumber;
            campaignId: BigNumber;
            recipient: string;
            amount: BigNumber;
            startDate: BigNumber;
            endDate: BigNumber;
            status: BigNumber;
        }>;
    };
    private assign;
}
export declare module Vesting {
    interface ApprovalEvent {
        owner: string;
        approved: string;
        tokenId: BigNumber;
        _event: Event;
    }
    interface ApprovalForAllEvent {
        owner: string;
        operator: string;
        approved: boolean;
        _event: Event;
    }
    interface AuthorizeEvent {
        user: string;
        _event: Event;
    }
    interface ClaimEvent {
        nftId: BigNumber;
        amount: BigNumber;
        totalClaimed: BigNumber;
        totalAmount: BigNumber;
        _event: Event;
    }
    interface CreateMerkleRootEvent {
        campaignId: BigNumber;
        merkleId: BigNumber;
        merkleRoot: string;
        ipfsCid: string;
        _event: Event;
    }
    interface CreateVestingEvent {
        campaignId: BigNumber;
        vestingId: BigNumber;
        recipient: string;
        amount: BigNumber;
        startDate: BigNumber;
        endDate: BigNumber;
        _event: Event;
    }
    interface DeauthorizeEvent {
        user: string;
        _event: Event;
    }
    interface MintEvent {
        campaignId: BigNumber;
        nftId: BigNumber;
        recipient: string;
        _event: Event;
    }
    interface StartOwnershipTransferEvent {
        user: string;
        _event: Event;
    }
    interface TransferEvent {
        from: string;
        to: string;
        tokenId: BigNumber;
        _event: Event;
    }
    interface TransferOwnershipEvent {
        user: string;
        _event: Event;
    }
}
