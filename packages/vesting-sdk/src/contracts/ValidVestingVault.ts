import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "@ijstech/eth-wallet";
import Bin from "./ValidVestingVault.json";

export interface IDeployParams {name:string;symbol:string}
export interface IApproveParams {to:string;tokenId:number|BigNumber}
export interface ICampaignLocksParams {param1:number|BigNumber;param2:number|BigNumber}
export interface IDirectLockParams {campaignId:number|BigNumber;recipient:string;amount:number|BigNumber;startDate:number|BigNumber;endDate:number|BigNumber}
export interface IIsApprovedForAllParams {owner:string;operator:string}
export interface IIsLockIdVerifiedParams {param1:string;param2:number|BigNumber}
export interface IMerkleLockParams {campaignId:number|BigNumber;amount:number|BigNumber;merkleRoot:string;dataUri:string}
export interface INewCampaignParams {token:string;ownerFrozen:boolean;dataUri:string}
export interface ISafeTransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface ISafeTransferFrom_1Params {from:string;to:string;tokenId:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export interface ITokenOfOwnerByIndexParams {owner:string;index:number|BigNumber}
export interface ITransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface IUpdateCampaignParams {campaignId:number|BigNumber;dataUri:string}
export interface IVerifyMerkleLockParams {lockId:number|BigNumber;campaignId:number|BigNumber;amount:number|BigNumber;startDate:number|BigNumber;endDate:number|BigNumber;proof:string[]}
export interface IWithdrawFundParams {token:string;amount:number|BigNumber}
export class ValidVestingVault extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams): Promise<string>{
        return this.__deploy([params.name,params.symbol]);
    }
    parseApprovalEvent(receipt: TransactionReceipt): ValidVestingVault.ApprovalEvent[]{
        return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event: Event): ValidVestingVault.ApprovalEvent{
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt: TransactionReceipt): ValidVestingVault.ApprovalForAllEvent[]{
        return this.parseEvents(receipt, "ApprovalForAll").map(e=>this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event: Event): ValidVestingVault.ApprovalForAllEvent{
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseAuthorizeEvent(receipt: TransactionReceipt): ValidVestingVault.AuthorizeEvent[]{
        return this.parseEvents(receipt, "Authorize").map(e=>this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event: Event): ValidVestingVault.AuthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseClaimEvent(receipt: TransactionReceipt): ValidVestingVault.ClaimEvent[]{
        return this.parseEvents(receipt, "Claim").map(e=>this.decodeClaimEvent(e));
    }
    decodeClaimEvent(event: Event): ValidVestingVault.ClaimEvent{
        let result = event.data;
        return {
            nftId: new BigNumber(result.nftId),
            amount: new BigNumber(result.amount),
            totalClaimed: new BigNumber(result.totalClaimed),
            totalAmount: new BigNumber(result.totalAmount),
            _event: event
        };
    }
    parseCreateVestingEvent(receipt: TransactionReceipt): ValidVestingVault.CreateVestingEvent[]{
        return this.parseEvents(receipt, "CreateVesting").map(e=>this.decodeCreateVestingEvent(e));
    }
    decodeCreateVestingEvent(event: Event): ValidVestingVault.CreateVestingEvent{
        let result = event.data;
        return {
            campaignId: new BigNumber(result.campaignId),
            vestingId: new BigNumber(result.vestingId),
            recipient: result.recipient,
            amount: new BigNumber(result.amount),
            startDate: new BigNumber(result.startDate),
            endDate: new BigNumber(result.endDate),
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt: TransactionReceipt): ValidVestingVault.DeauthorizeEvent[]{
        return this.parseEvents(receipt, "Deauthorize").map(e=>this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event: Event): ValidVestingVault.DeauthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseLockEvent(receipt: TransactionReceipt): ValidVestingVault.LockEvent[]{
        return this.parseEvents(receipt, "Lock").map(e=>this.decodeLockEvent(e));
    }
    decodeLockEvent(event: Event): ValidVestingVault.LockEvent{
        let result = event.data;
        return {
            lockId: new BigNumber(result.lockId),
            campaignId: new BigNumber(result.campaignId),
            amount: new BigNumber(result.amount),
            sender: result.sender,
            _event: event
        };
    }
    parseMintEvent(receipt: TransactionReceipt): ValidVestingVault.MintEvent[]{
        return this.parseEvents(receipt, "Mint").map(e=>this.decodeMintEvent(e));
    }
    decodeMintEvent(event: Event): ValidVestingVault.MintEvent{
        let result = event.data;
        return {
            campaignId: new BigNumber(result.campaignId),
            nftId: new BigNumber(result.nftId),
            recipient: result.recipient,
            _event: event
        };
    }
    parseNewCampaignEvent(receipt: TransactionReceipt): ValidVestingVault.NewCampaignEvent[]{
        return this.parseEvents(receipt, "NewCampaign").map(e=>this.decodeNewCampaignEvent(e));
    }
    decodeNewCampaignEvent(event: Event): ValidVestingVault.NewCampaignEvent{
        let result = event.data;
        return {
            campaignId: new BigNumber(result.campaignId),
            sender: result.sender,
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): ValidVestingVault.StartOwnershipTransferEvent[]{
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e=>this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event: Event): ValidVestingVault.StartOwnershipTransferEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferEvent(receipt: TransactionReceipt): ValidVestingVault.TransferEvent[]{
        return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event: Event): ValidVestingVault.TransferEvent{
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt: TransactionReceipt): ValidVestingVault.TransferOwnershipEvent[]{
        return this.parseEvents(receipt, "TransferOwnership").map(e=>this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event: Event): ValidVestingVault.TransferOwnershipEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseUpdateCampaignEvent(receipt: TransactionReceipt): ValidVestingVault.UpdateCampaignEvent[]{
        return this.parseEvents(receipt, "UpdateCampaign").map(e=>this.decodeUpdateCampaignEvent(e));
    }
    decodeUpdateCampaignEvent(event: Event): ValidVestingVault.UpdateCampaignEvent{
        let result = event.data;
        return {
            campaignId: new BigNumber(result.campaignId),
            dataUri: result.dataUri,
            sender: result.sender,
            _event: event
        };
    }
    approve: {
        (params: IApproveParams): Promise<TransactionReceipt>;
        call: (params: IApproveParams) => Promise<void>;
    }
    balanceOf: {
        (owner:string): Promise<BigNumber>;
    }
    campaignClaimed: {
        (param1:number|BigNumber): Promise<BigNumber>;
    }
    campaignIdCount: {
        (): Promise<BigNumber>;
    }
    campaignInfo: {
        (param1:number|BigNumber): Promise<{dataUri:string,token:string,ownerFrozen:boolean}>;
    }
    campaignLocked: {
        (param1:number|BigNumber): Promise<BigNumber>;
    }
    campaignLocks: {
        (params: ICampaignLocksParams): Promise<BigNumber>;
    }
    campaignLocksLength: {
        (campaignId:number|BigNumber): Promise<BigNumber>;
    }
    claim: {
        (id:number|BigNumber): Promise<TransactionReceipt>;
        call: (id:number|BigNumber) => Promise<void>;
    }
    claimMultiple: {
        (ids:(number|BigNumber)[]): Promise<TransactionReceipt>;
        call: (ids:(number|BigNumber)[]) => Promise<void>;
    }
    deny: {
        (user:string): Promise<TransactionReceipt>;
        call: (user:string) => Promise<void>;
    }
    directLock: {
        (params: IDirectLockParams): Promise<TransactionReceipt>;
        call: (params: IDirectLockParams) => Promise<BigNumber>;
    }
    factory: {
        (): Promise<string>;
    }
    getApproved: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    getInfo: {
        (nftId:number|BigNumber): Promise<{campaignId:BigNumber,vestingId:BigNumber,recipient:string,token:string,unclaimedFunds:BigNumber,claimedAmount:BigNumber,totalAmount:BigNumber,startDate:BigNumber,endDate:BigNumber}>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams): Promise<boolean>;
    }
    isLockIdVerified: {
        (params: IIsLockIdVerifiedParams): Promise<boolean>;
    }
    isPermitted: {
        (param1:string): Promise<BigNumber>;
    }
    locks: {
        (param1:number|BigNumber): Promise<{lockType:BigNumber,vestingId:BigNumber,dataUri:string,root:string,dateCreated:BigNumber}>;
    }
    locksLength: {
        (): Promise<BigNumber>;
    }
    maximumAllowedClaimedFunds: {
        (vestingId:number|BigNumber): Promise<BigNumber>;
    }
    merkleLock: {
        (params: IMerkleLockParams): Promise<TransactionReceipt>;
        call: (params: IMerkleLockParams) => Promise<BigNumber>;
    }
    name: {
        (): Promise<string>;
    }
    newCampaign: {
        (params: INewCampaignParams): Promise<TransactionReceipt>;
        call: (params: INewCampaignParams) => Promise<BigNumber>;
    }
    newOwner: {
        (): Promise<string>;
    }
    nftIdCount: {
        (): Promise<BigNumber>;
    }
    nftVestingId: {
        (param1:number|BigNumber): Promise<BigNumber>;
    }
    owner: {
        (): Promise<string>;
    }
    ownerOf: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    permit: {
        (user:string): Promise<TransactionReceipt>;
        call: (user:string) => Promise<void>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams) => Promise<void>;
    }
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params) => Promise<void>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams) => Promise<void>;
    }
    setOwner: {
        (owner:string): Promise<TransactionReceipt>;
        call: (owner:string) => Promise<void>;
    }
    supportsInterface: {
        (interfaceId:string): Promise<boolean>;
    }
    symbol: {
        (): Promise<string>;
    }
    takeOwnership: {
        (): Promise<TransactionReceipt>;
        call: () => Promise<void>;
    }
    tokenByIndex: {
        (index:number|BigNumber): Promise<BigNumber>;
    }
    tokenOfOwnerByIndex: {
        (params: ITokenOfOwnerByIndexParams): Promise<BigNumber>;
    }
    tokenURI: {
        (tokenId:number|BigNumber): Promise<string>;
    }
    totalSupply: {
        (): Promise<BigNumber>;
    }
    transferFrom: {
        (params: ITransferFromParams): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams) => Promise<void>;
    }
    transferOwnership: {
        (newOwner:string): Promise<TransactionReceipt>;
        call: (newOwner:string) => Promise<void>;
    }
    updateCampaign: {
        (params: IUpdateCampaignParams): Promise<TransactionReceipt>;
        call: (params: IUpdateCampaignParams) => Promise<void>;
    }
    verifyDirectLock: {
        (lockId:number|BigNumber): Promise<TransactionReceipt>;
        call: (lockId:number|BigNumber) => Promise<BigNumber>;
    }
    verifyMerkleLock: {
        (params: IVerifyMerkleLockParams): Promise<TransactionReceipt>;
        call: (params: IVerifyMerkleLockParams) => Promise<BigNumber>;
    }
    vestingClaimedAmount: {
        (param1:number|BigNumber): Promise<BigNumber>;
    }
    vestingIdCount: {
        (): Promise<BigNumber>;
    }
    vestingInfo: {
        (param1:number|BigNumber): Promise<{campaignId:BigNumber,recipient:string,amount:BigNumber,startDate:BigNumber,endDate:BigNumber,status:BigNumber}>;
    }
    withdrawFund: {
        (params: IWithdrawFundParams): Promise<TransactionReceipt>;
        call: (params: IWithdrawFundParams) => Promise<void>;
    }
    private assign(){
        let balanceOf_call = async (owner:string): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[owner]);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let campaignClaimed_call = async (param1:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('campaignClaimed',[Utils.toString(param1)]);
            return new BigNumber(result);
        }
        this.campaignClaimed = campaignClaimed_call
        let campaignIdCount_call = async (): Promise<BigNumber> => {
            let result = await this.call('campaignIdCount');
            return new BigNumber(result);
        }
        this.campaignIdCount = campaignIdCount_call
        let campaignInfo_call = async (param1:number|BigNumber): Promise<{dataUri:string,token:string,ownerFrozen:boolean}> => {
            let result = await this.call('campaignInfo',[Utils.toString(param1)]);
            return {
                dataUri: result.dataUri,
                token: result.token,
                ownerFrozen: result.ownerFrozen
            };
        }
        this.campaignInfo = campaignInfo_call
        let campaignLocked_call = async (param1:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('campaignLocked',[Utils.toString(param1)]);
            return new BigNumber(result);
        }
        this.campaignLocked = campaignLocked_call
        let campaignLocksParams = (params: ICampaignLocksParams) => [Utils.toString(params.param1),Utils.toString(params.param2)];
        let campaignLocks_call = async (params: ICampaignLocksParams): Promise<BigNumber> => {
            let result = await this.call('campaignLocks',campaignLocksParams(params));
            return new BigNumber(result);
        }
        this.campaignLocks = campaignLocks_call
        let campaignLocksLength_call = async (campaignId:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('campaignLocksLength',[Utils.toString(campaignId)]);
            return new BigNumber(result);
        }
        this.campaignLocksLength = campaignLocksLength_call
        let factory_call = async (): Promise<string> => {
            let result = await this.call('factory');
            return result;
        }
        this.factory = factory_call
        let getApproved_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('getApproved',[Utils.toString(tokenId)]);
            return result;
        }
        this.getApproved = getApproved_call
        let getInfo_call = async (nftId:number|BigNumber): Promise<{campaignId:BigNumber,vestingId:BigNumber,recipient:string,token:string,unclaimedFunds:BigNumber,claimedAmount:BigNumber,totalAmount:BigNumber,startDate:BigNumber,endDate:BigNumber}> => {
            let result = await this.call('getInfo',[Utils.toString(nftId)]);
            return {
                campaignId: new BigNumber(result.campaignId),
                vestingId: new BigNumber(result.vestingId),
                recipient: result.recipient,
                token: result.token,
                unclaimedFunds: new BigNumber(result.unclaimedFunds),
                claimedAmount: new BigNumber(result.claimedAmount),
                totalAmount: new BigNumber(result.totalAmount),
                startDate: new BigNumber(result.startDate),
                endDate: new BigNumber(result.endDate)
            };
        }
        this.getInfo = getInfo_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.owner,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params));
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let isLockIdVerifiedParams = (params: IIsLockIdVerifiedParams) => [params.param1,Utils.toString(params.param2)];
        let isLockIdVerified_call = async (params: IIsLockIdVerifiedParams): Promise<boolean> => {
            let result = await this.call('isLockIdVerified',isLockIdVerifiedParams(params));
            return result;
        }
        this.isLockIdVerified = isLockIdVerified_call
        let isPermitted_call = async (param1:string): Promise<BigNumber> => {
            let result = await this.call('isPermitted',[param1]);
            return new BigNumber(result);
        }
        this.isPermitted = isPermitted_call
        let locks_call = async (param1:number|BigNumber): Promise<{lockType:BigNumber,vestingId:BigNumber,dataUri:string,root:string,dateCreated:BigNumber}> => {
            let result = await this.call('locks',[Utils.toString(param1)]);
            return {
                lockType: new BigNumber(result.lockType),
                vestingId: new BigNumber(result.vestingId),
                dataUri: result.dataUri,
                root: result.root,
                dateCreated: new BigNumber(result.dateCreated)
            };
        }
        this.locks = locks_call
        let locksLength_call = async (): Promise<BigNumber> => {
            let result = await this.call('locksLength');
            return new BigNumber(result);
        }
        this.locksLength = locksLength_call
        let maximumAllowedClaimedFunds_call = async (vestingId:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('maximumAllowedClaimedFunds',[Utils.toString(vestingId)]);
            return new BigNumber(result);
        }
        this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call
        let name_call = async (): Promise<string> => {
            let result = await this.call('name');
            return result;
        }
        this.name = name_call
        let newOwner_call = async (): Promise<string> => {
            let result = await this.call('newOwner');
            return result;
        }
        this.newOwner = newOwner_call
        let nftIdCount_call = async (): Promise<BigNumber> => {
            let result = await this.call('nftIdCount');
            return new BigNumber(result);
        }
        this.nftIdCount = nftIdCount_call
        let nftVestingId_call = async (param1:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('nftVestingId',[Utils.toString(param1)]);
            return new BigNumber(result);
        }
        this.nftVestingId = nftVestingId_call
        let owner_call = async (): Promise<string> => {
            let result = await this.call('owner');
            return result;
        }
        this.owner = owner_call
        let ownerOf_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('ownerOf',[Utils.toString(tokenId)]);
            return result;
        }
        this.ownerOf = ownerOf_call
        let supportsInterface_call = async (interfaceId:string): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId]);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let symbol_call = async (): Promise<string> => {
            let result = await this.call('symbol');
            return result;
        }
        this.symbol = symbol_call
        let tokenByIndex_call = async (index:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('tokenByIndex',[Utils.toString(index)]);
            return new BigNumber(result);
        }
        this.tokenByIndex = tokenByIndex_call
        let tokenOfOwnerByIndexParams = (params: ITokenOfOwnerByIndexParams) => [params.owner,Utils.toString(params.index)];
        let tokenOfOwnerByIndex_call = async (params: ITokenOfOwnerByIndexParams): Promise<BigNumber> => {
            let result = await this.call('tokenOfOwnerByIndex',tokenOfOwnerByIndexParams(params));
            return new BigNumber(result);
        }
        this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call
        let tokenURI_call = async (tokenId:number|BigNumber): Promise<string> => {
            let result = await this.call('tokenURI',[Utils.toString(tokenId)]);
            return result;
        }
        this.tokenURI = tokenURI_call
        let totalSupply_call = async (): Promise<BigNumber> => {
            let result = await this.call('totalSupply');
            return new BigNumber(result);
        }
        this.totalSupply = totalSupply_call
        let vestingClaimedAmount_call = async (param1:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('vestingClaimedAmount',[Utils.toString(param1)]);
            return new BigNumber(result);
        }
        this.vestingClaimedAmount = vestingClaimedAmount_call
        let vestingIdCount_call = async (): Promise<BigNumber> => {
            let result = await this.call('vestingIdCount');
            return new BigNumber(result);
        }
        this.vestingIdCount = vestingIdCount_call
        let vestingInfo_call = async (param1:number|BigNumber): Promise<{campaignId:BigNumber,recipient:string,amount:BigNumber,startDate:BigNumber,endDate:BigNumber,status:BigNumber}> => {
            let result = await this.call('vestingInfo',[Utils.toString(param1)]);
            return {
                campaignId: new BigNumber(result.campaignId),
                recipient: result.recipient,
                amount: new BigNumber(result.amount),
                startDate: new BigNumber(result.startDate),
                endDate: new BigNumber(result.endDate),
                status: new BigNumber(result.status)
            };
        }
        this.vestingInfo = vestingInfo_call
        let approveParams = (params: IApproveParams) => [params.to,Utils.toString(params.tokenId)];
        let approve_send = async (params: IApproveParams): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params));
            return result;
        }
        let approve_call = async (params: IApproveParams): Promise<void> => {
            let result = await this.call('approve',approveParams(params));
            return;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
        });
        let claim_send = async (id:number|BigNumber): Promise<TransactionReceipt> => {
            let result = await this.send('claim',[Utils.toString(id)]);
            return result;
        }
        let claim_call = async (id:number|BigNumber): Promise<void> => {
            let result = await this.call('claim',[Utils.toString(id)]);
            return;
        }
        this.claim = Object.assign(claim_send, {
            call:claim_call
        });
        let claimMultiple_send = async (ids:(number|BigNumber)[]): Promise<TransactionReceipt> => {
            let result = await this.send('claimMultiple',[Utils.toString(ids)]);
            return result;
        }
        let claimMultiple_call = async (ids:(number|BigNumber)[]): Promise<void> => {
            let result = await this.call('claimMultiple',[Utils.toString(ids)]);
            return;
        }
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call:claimMultiple_call
        });
        let deny_send = async (user:string): Promise<TransactionReceipt> => {
            let result = await this.send('deny',[user]);
            return result;
        }
        let deny_call = async (user:string): Promise<void> => {
            let result = await this.call('deny',[user]);
            return;
        }
        this.deny = Object.assign(deny_send, {
            call:deny_call
        });
        let directLockParams = (params: IDirectLockParams) => [Utils.toString(params.campaignId),params.recipient,Utils.toString(params.amount),Utils.toString(params.startDate),Utils.toString(params.endDate)];
        let directLock_send = async (params: IDirectLockParams): Promise<TransactionReceipt> => {
            let result = await this.send('directLock',directLockParams(params));
            return result;
        }
        let directLock_call = async (params: IDirectLockParams): Promise<BigNumber> => {
            let result = await this.call('directLock',directLockParams(params));
            return new BigNumber(result);
        }
        this.directLock = Object.assign(directLock_send, {
            call:directLock_call
        });
        let merkleLockParams = (params: IMerkleLockParams) => [Utils.toString(params.campaignId),Utils.toString(params.amount),Utils.stringToBytes32(params.merkleRoot),params.dataUri];
        let merkleLock_send = async (params: IMerkleLockParams): Promise<TransactionReceipt> => {
            let result = await this.send('merkleLock',merkleLockParams(params));
            return result;
        }
        let merkleLock_call = async (params: IMerkleLockParams): Promise<BigNumber> => {
            let result = await this.call('merkleLock',merkleLockParams(params));
            return new BigNumber(result);
        }
        this.merkleLock = Object.assign(merkleLock_send, {
            call:merkleLock_call
        });
        let newCampaignParams = (params: INewCampaignParams) => [params.token,params.ownerFrozen,params.dataUri];
        let newCampaign_send = async (params: INewCampaignParams): Promise<TransactionReceipt> => {
            let result = await this.send('newCampaign',newCampaignParams(params));
            return result;
        }
        let newCampaign_call = async (params: INewCampaignParams): Promise<BigNumber> => {
            let result = await this.call('newCampaign',newCampaignParams(params));
            return new BigNumber(result);
        }
        this.newCampaign = Object.assign(newCampaign_send, {
            call:newCampaign_call
        });
        let permit_send = async (user:string): Promise<TransactionReceipt> => {
            let result = await this.send('permit',[user]);
            return result;
        }
        let permit_call = async (user:string): Promise<void> => {
            let result = await this.call('permit',[user]);
            return;
        }
        this.permit = Object.assign(permit_send, {
            call:permit_call
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,Utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params: ISafeTransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params));
            return result;
        }
        let safeTransferFrom_call = async (params: ISafeTransferFromParams): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params));
            return;
        }
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call:safeTransferFrom_call
        });
        let safeTransferFrom_1Params = (params: ISafeTransferFrom_1Params) => [params.from,params.to,Utils.toString(params.tokenId),Utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params: ISafeTransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params));
            return result;
        }
        let safeTransferFrom_1_call = async (params: ISafeTransferFromParams): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params));
            return;
        }
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call:safeTransferFrom_1_call
        });
        let setApprovalForAllParams = (params: ISetApprovalForAllParams) => [params.operator,params.approved];
        let setApprovalForAll_send = async (params: ISetApprovalForAllParams): Promise<TransactionReceipt> => {
            let result = await this.send('setApprovalForAll',setApprovalForAllParams(params));
            return result;
        }
        let setApprovalForAll_call = async (params: ISetApprovalForAllParams): Promise<void> => {
            let result = await this.call('setApprovalForAll',setApprovalForAllParams(params));
            return;
        }
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call:setApprovalForAll_call
        });
        let setOwner_send = async (owner:string): Promise<TransactionReceipt> => {
            let result = await this.send('setOwner',[owner]);
            return result;
        }
        let setOwner_call = async (owner:string): Promise<void> => {
            let result = await this.call('setOwner',[owner]);
            return;
        }
        this.setOwner = Object.assign(setOwner_send, {
            call:setOwner_call
        });
        let takeOwnership_send = async (): Promise<TransactionReceipt> => {
            let result = await this.send('takeOwnership');
            return result;
        }
        let takeOwnership_call = async (): Promise<void> => {
            let result = await this.call('takeOwnership');
            return;
        }
        this.takeOwnership = Object.assign(takeOwnership_send, {
            call:takeOwnership_call
        });
        let transferFromParams = (params: ITransferFromParams) => [params.from,params.to,Utils.toString(params.tokenId)];
        let transferFrom_send = async (params: ITransferFromParams): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params));
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams): Promise<void> => {
            let result = await this.call('transferFrom',transferFromParams(params));
            return;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
        });
        let transferOwnership_send = async (newOwner:string): Promise<TransactionReceipt> => {
            let result = await this.send('transferOwnership',[newOwner]);
            return result;
        }
        let transferOwnership_call = async (newOwner:string): Promise<void> => {
            let result = await this.call('transferOwnership',[newOwner]);
            return;
        }
        this.transferOwnership = Object.assign(transferOwnership_send, {
            call:transferOwnership_call
        });
        let updateCampaignParams = (params: IUpdateCampaignParams) => [Utils.toString(params.campaignId),params.dataUri];
        let updateCampaign_send = async (params: IUpdateCampaignParams): Promise<TransactionReceipt> => {
            let result = await this.send('updateCampaign',updateCampaignParams(params));
            return result;
        }
        let updateCampaign_call = async (params: IUpdateCampaignParams): Promise<void> => {
            let result = await this.call('updateCampaign',updateCampaignParams(params));
            return;
        }
        this.updateCampaign = Object.assign(updateCampaign_send, {
            call:updateCampaign_call
        });
        let verifyDirectLock_send = async (lockId:number|BigNumber): Promise<TransactionReceipt> => {
            let result = await this.send('verifyDirectLock',[Utils.toString(lockId)]);
            return result;
        }
        let verifyDirectLock_call = async (lockId:number|BigNumber): Promise<BigNumber> => {
            let result = await this.call('verifyDirectLock',[Utils.toString(lockId)]);
            return new BigNumber(result);
        }
        this.verifyDirectLock = Object.assign(verifyDirectLock_send, {
            call:verifyDirectLock_call
        });
        let verifyMerkleLockParams = (params: IVerifyMerkleLockParams) => [Utils.toString(params.lockId),Utils.toString(params.campaignId),Utils.toString(params.amount),Utils.toString(params.startDate),Utils.toString(params.endDate),Utils.stringToBytes32(params.proof)];
        let verifyMerkleLock_send = async (params: IVerifyMerkleLockParams): Promise<TransactionReceipt> => {
            let result = await this.send('verifyMerkleLock',verifyMerkleLockParams(params));
            return result;
        }
        let verifyMerkleLock_call = async (params: IVerifyMerkleLockParams): Promise<BigNumber> => {
            let result = await this.call('verifyMerkleLock',verifyMerkleLockParams(params));
            return new BigNumber(result);
        }
        this.verifyMerkleLock = Object.assign(verifyMerkleLock_send, {
            call:verifyMerkleLock_call
        });
        let withdrawFundParams = (params: IWithdrawFundParams) => [params.token,Utils.toString(params.amount)];
        let withdrawFund_send = async (params: IWithdrawFundParams): Promise<TransactionReceipt> => {
            let result = await this.send('withdrawFund',withdrawFundParams(params));
            return result;
        }
        let withdrawFund_call = async (params: IWithdrawFundParams): Promise<void> => {
            let result = await this.call('withdrawFund',withdrawFundParams(params));
            return;
        }
        this.withdrawFund = Object.assign(withdrawFund_send, {
            call:withdrawFund_call
        });
    }
}
export module ValidVestingVault{
    export interface ApprovalEvent {owner:string,approved:string,tokenId:BigNumber,_event:Event}
    export interface ApprovalForAllEvent {owner:string,operator:string,approved:boolean,_event:Event}
    export interface AuthorizeEvent {user:string,_event:Event}
    export interface ClaimEvent {nftId:BigNumber,amount:BigNumber,totalClaimed:BigNumber,totalAmount:BigNumber,_event:Event}
    export interface CreateVestingEvent {campaignId:BigNumber,vestingId:BigNumber,recipient:string,amount:BigNumber,startDate:BigNumber,endDate:BigNumber,_event:Event}
    export interface DeauthorizeEvent {user:string,_event:Event}
    export interface LockEvent {lockId:BigNumber,campaignId:BigNumber,amount:BigNumber,sender:string,_event:Event}
    export interface MintEvent {campaignId:BigNumber,nftId:BigNumber,recipient:string,_event:Event}
    export interface NewCampaignEvent {campaignId:BigNumber,sender:string,_event:Event}
    export interface StartOwnershipTransferEvent {user:string,_event:Event}
    export interface TransferEvent {from:string,to:string,tokenId:BigNumber,_event:Event}
    export interface TransferOwnershipEvent {user:string,_event:Event}
    export interface UpdateCampaignEvent {campaignId:BigNumber,dataUri:string,sender:string,_event:Event}
}