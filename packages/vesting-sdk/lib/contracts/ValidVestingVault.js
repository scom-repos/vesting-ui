"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidVestingVault = void 0;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const ValidVestingVault_json_1 = __importDefault(require("./ValidVestingVault.json"));
class ValidVestingVault extends eth_wallet_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ValidVestingVault_json_1.default.abi, ValidVestingVault_json_1.default.bytecode);
        this.assign();
    }
    deploy(params) {
        return this.__deploy([params.name, params.symbol]);
    }
    parseApprovalEvent(receipt) {
        return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt) {
        return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseAuthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseClaimEvent(receipt) {
        return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
    }
    decodeClaimEvent(event) {
        let result = event.data;
        return {
            nftId: new eth_wallet_1.BigNumber(result.nftId),
            amount: new eth_wallet_1.BigNumber(result.amount),
            totalClaimed: new eth_wallet_1.BigNumber(result.totalClaimed),
            totalAmount: new eth_wallet_1.BigNumber(result.totalAmount),
            _event: event
        };
    }
    parseCreateVestingEvent(receipt) {
        return this.parseEvents(receipt, "CreateVesting").map(e => this.decodeCreateVestingEvent(e));
    }
    decodeCreateVestingEvent(event) {
        let result = event.data;
        return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            vestingId: new eth_wallet_1.BigNumber(result.vestingId),
            recipient: result.recipient,
            amount: new eth_wallet_1.BigNumber(result.amount),
            startDate: new eth_wallet_1.BigNumber(result.startDate),
            endDate: new eth_wallet_1.BigNumber(result.endDate),
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseLockEvent(receipt) {
        return this.parseEvents(receipt, "Lock").map(e => this.decodeLockEvent(e));
    }
    decodeLockEvent(event) {
        let result = event.data;
        return {
            lockId: new eth_wallet_1.BigNumber(result.lockId),
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            amount: new eth_wallet_1.BigNumber(result.amount),
            sender: result.sender,
            _event: event
        };
    }
    parseMintEvent(receipt) {
        return this.parseEvents(receipt, "Mint").map(e => this.decodeMintEvent(e));
    }
    decodeMintEvent(event) {
        let result = event.data;
        return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            nftId: new eth_wallet_1.BigNumber(result.nftId),
            recipient: result.recipient,
            _event: event
        };
    }
    parseNewCampaignEvent(receipt) {
        return this.parseEvents(receipt, "NewCampaign").map(e => this.decodeNewCampaignEvent(e));
    }
    decodeNewCampaignEvent(event) {
        let result = event.data;
        return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            sender: result.sender,
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt) {
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferEvent(receipt) {
        return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event) {
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt) {
        return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseUpdateCampaignEvent(receipt) {
        return this.parseEvents(receipt, "UpdateCampaign").map(e => this.decodeUpdateCampaignEvent(e));
    }
    decodeUpdateCampaignEvent(event) {
        let result = event.data;
        return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            dataUri: result.dataUri,
            sender: result.sender,
            _event: event
        };
    }
    assign() {
        let balanceOf_call = async (owner) => {
            let result = await this.call('balanceOf', [owner]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let campaignClaimed_call = async (param1) => {
            let result = await this.call('campaignClaimed', [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.campaignClaimed = campaignClaimed_call;
        let campaignIdCount_call = async () => {
            let result = await this.call('campaignIdCount');
            return new eth_wallet_1.BigNumber(result);
        };
        this.campaignIdCount = campaignIdCount_call;
        let campaignInfo_call = async (param1) => {
            let result = await this.call('campaignInfo', [eth_wallet_1.Utils.toString(param1)]);
            return {
                dataUri: result.dataUri,
                token: result.token,
                ownerFrozen: result.ownerFrozen
            };
        };
        this.campaignInfo = campaignInfo_call;
        let campaignLocked_call = async (param1) => {
            let result = await this.call('campaignLocked', [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.campaignLocked = campaignLocked_call;
        let campaignLocksParams = (params) => [eth_wallet_1.Utils.toString(params.param1), eth_wallet_1.Utils.toString(params.param2)];
        let campaignLocks_call = async (params) => {
            let result = await this.call('campaignLocks', campaignLocksParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.campaignLocks = campaignLocks_call;
        let campaignLocksLength_call = async (campaignId) => {
            let result = await this.call('campaignLocksLength', [eth_wallet_1.Utils.toString(campaignId)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.campaignLocksLength = campaignLocksLength_call;
        let factory_call = async () => {
            let result = await this.call('factory');
            return result;
        };
        this.factory = factory_call;
        let getApproved_call = async (tokenId) => {
            let result = await this.call('getApproved', [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
        };
        this.getApproved = getApproved_call;
        let getInfo_call = async (nftId) => {
            let result = await this.call('getInfo', [eth_wallet_1.Utils.toString(nftId)]);
            return {
                campaignId: new eth_wallet_1.BigNumber(result.campaignId),
                vestingId: new eth_wallet_1.BigNumber(result.vestingId),
                recipient: result.recipient,
                token: result.token,
                unclaimedFunds: new eth_wallet_1.BigNumber(result.unclaimedFunds),
                claimedAmount: new eth_wallet_1.BigNumber(result.claimedAmount),
                totalAmount: new eth_wallet_1.BigNumber(result.totalAmount),
                startDate: new eth_wallet_1.BigNumber(result.startDate),
                endDate: new eth_wallet_1.BigNumber(result.endDate)
            };
        };
        this.getInfo = getInfo_call;
        let isApprovedForAllParams = (params) => [params.owner, params.operator];
        let isApprovedForAll_call = async (params) => {
            let result = await this.call('isApprovedForAll', isApprovedForAllParams(params));
            return result;
        };
        this.isApprovedForAll = isApprovedForAll_call;
        let isLockIdVerifiedParams = (params) => [params.param1, eth_wallet_1.Utils.toString(params.param2)];
        let isLockIdVerified_call = async (params) => {
            let result = await this.call('isLockIdVerified', isLockIdVerifiedParams(params));
            return result;
        };
        this.isLockIdVerified = isLockIdVerified_call;
        let isPermitted_call = async (param1) => {
            let result = await this.call('isPermitted', [param1]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.isPermitted = isPermitted_call;
        let locks_call = async (param1) => {
            let result = await this.call('locks', [eth_wallet_1.Utils.toString(param1)]);
            return {
                lockType: new eth_wallet_1.BigNumber(result.lockType),
                vestingId: new eth_wallet_1.BigNumber(result.vestingId),
                dataUri: result.dataUri,
                root: result.root,
                dateCreated: new eth_wallet_1.BigNumber(result.dateCreated)
            };
        };
        this.locks = locks_call;
        let locksLength_call = async () => {
            let result = await this.call('locksLength');
            return new eth_wallet_1.BigNumber(result);
        };
        this.locksLength = locksLength_call;
        let maximumAllowedClaimedFunds_call = async (vestingId) => {
            let result = await this.call('maximumAllowedClaimedFunds', [eth_wallet_1.Utils.toString(vestingId)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call;
        let name_call = async () => {
            let result = await this.call('name');
            return result;
        };
        this.name = name_call;
        let newOwner_call = async () => {
            let result = await this.call('newOwner');
            return result;
        };
        this.newOwner = newOwner_call;
        let nftIdCount_call = async () => {
            let result = await this.call('nftIdCount');
            return new eth_wallet_1.BigNumber(result);
        };
        this.nftIdCount = nftIdCount_call;
        let nftVestingId_call = async (param1) => {
            let result = await this.call('nftVestingId', [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.nftVestingId = nftVestingId_call;
        let owner_call = async () => {
            let result = await this.call('owner');
            return result;
        };
        this.owner = owner_call;
        let ownerOf_call = async (tokenId) => {
            let result = await this.call('ownerOf', [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
        };
        this.ownerOf = ownerOf_call;
        let supportsInterface_call = async (interfaceId) => {
            let result = await this.call('supportsInterface', [interfaceId]);
            return result;
        };
        this.supportsInterface = supportsInterface_call;
        let symbol_call = async () => {
            let result = await this.call('symbol');
            return result;
        };
        this.symbol = symbol_call;
        let tokenByIndex_call = async (index) => {
            let result = await this.call('tokenByIndex', [eth_wallet_1.Utils.toString(index)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.tokenByIndex = tokenByIndex_call;
        let tokenOfOwnerByIndexParams = (params) => [params.owner, eth_wallet_1.Utils.toString(params.index)];
        let tokenOfOwnerByIndex_call = async (params) => {
            let result = await this.call('tokenOfOwnerByIndex', tokenOfOwnerByIndexParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
        let tokenURI_call = async (tokenId) => {
            let result = await this.call('tokenURI', [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
        };
        this.tokenURI = tokenURI_call;
        let totalSupply_call = async () => {
            let result = await this.call('totalSupply');
            return new eth_wallet_1.BigNumber(result);
        };
        this.totalSupply = totalSupply_call;
        let vestingClaimedAmount_call = async (param1) => {
            let result = await this.call('vestingClaimedAmount', [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.vestingClaimedAmount = vestingClaimedAmount_call;
        let vestingIdCount_call = async () => {
            let result = await this.call('vestingIdCount');
            return new eth_wallet_1.BigNumber(result);
        };
        this.vestingIdCount = vestingIdCount_call;
        let vestingInfo_call = async (param1) => {
            let result = await this.call('vestingInfo', [eth_wallet_1.Utils.toString(param1)]);
            return {
                campaignId: new eth_wallet_1.BigNumber(result.campaignId),
                recipient: result.recipient,
                amount: new eth_wallet_1.BigNumber(result.amount),
                startDate: new eth_wallet_1.BigNumber(result.startDate),
                endDate: new eth_wallet_1.BigNumber(result.endDate),
                status: new eth_wallet_1.BigNumber(result.status)
            };
        };
        this.vestingInfo = vestingInfo_call;
        let approveParams = (params) => [params.to, eth_wallet_1.Utils.toString(params.tokenId)];
        let approve_send = async (params) => {
            let result = await this.send('approve', approveParams(params));
            return result;
        };
        let approve_call = async (params) => {
            let result = await this.call('approve', approveParams(params));
            return;
        };
        this.approve = Object.assign(approve_send, {
            call: approve_call
        });
        let claim_send = async (id) => {
            let result = await this.send('claim', [eth_wallet_1.Utils.toString(id)]);
            return result;
        };
        let claim_call = async (id) => {
            let result = await this.call('claim', [eth_wallet_1.Utils.toString(id)]);
            return;
        };
        this.claim = Object.assign(claim_send, {
            call: claim_call
        });
        let claimMultiple_send = async (ids) => {
            let result = await this.send('claimMultiple', [eth_wallet_1.Utils.toString(ids)]);
            return result;
        };
        let claimMultiple_call = async (ids) => {
            let result = await this.call('claimMultiple', [eth_wallet_1.Utils.toString(ids)]);
            return;
        };
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call: claimMultiple_call
        });
        let deny_send = async (user) => {
            let result = await this.send('deny', [user]);
            return result;
        };
        let deny_call = async (user) => {
            let result = await this.call('deny', [user]);
            return;
        };
        this.deny = Object.assign(deny_send, {
            call: deny_call
        });
        let directLockParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), params.recipient, eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.toString(params.startDate), eth_wallet_1.Utils.toString(params.endDate)];
        let directLock_send = async (params) => {
            let result = await this.send('directLock', directLockParams(params));
            return result;
        };
        let directLock_call = async (params) => {
            let result = await this.call('directLock', directLockParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.directLock = Object.assign(directLock_send, {
            call: directLock_call
        });
        let merkleLockParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.stringToBytes32(params.merkleRoot), params.dataUri];
        let merkleLock_send = async (params) => {
            let result = await this.send('merkleLock', merkleLockParams(params));
            return result;
        };
        let merkleLock_call = async (params) => {
            let result = await this.call('merkleLock', merkleLockParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.merkleLock = Object.assign(merkleLock_send, {
            call: merkleLock_call
        });
        let newCampaignParams = (params) => [params.token, params.ownerFrozen, params.dataUri];
        let newCampaign_send = async (params) => {
            let result = await this.send('newCampaign', newCampaignParams(params));
            return result;
        };
        let newCampaign_call = async (params) => {
            let result = await this.call('newCampaign', newCampaignParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.newCampaign = Object.assign(newCampaign_send, {
            call: newCampaign_call
        });
        let permit_send = async (user) => {
            let result = await this.send('permit', [user]);
            return result;
        };
        let permit_call = async (user) => {
            let result = await this.call('permit', [user]);
            return;
        };
        this.permit = Object.assign(permit_send, {
            call: permit_call
        });
        let safeTransferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params) => {
            let result = await this.send('safeTransferFrom', safeTransferFromParams(params));
            return result;
        };
        let safeTransferFrom_call = async (params) => {
            let result = await this.call('safeTransferFrom', safeTransferFromParams(params));
            return;
        };
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call: safeTransferFrom_call
        });
        let safeTransferFrom_1Params = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId), eth_wallet_1.Utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params) => {
            let result = await this.send('safeTransferFrom', safeTransferFromParams(params));
            return result;
        };
        let safeTransferFrom_1_call = async (params) => {
            let result = await this.call('safeTransferFrom', safeTransferFromParams(params));
            return;
        };
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call: safeTransferFrom_1_call
        });
        let setApprovalForAllParams = (params) => [params.operator, params.approved];
        let setApprovalForAll_send = async (params) => {
            let result = await this.send('setApprovalForAll', setApprovalForAllParams(params));
            return result;
        };
        let setApprovalForAll_call = async (params) => {
            let result = await this.call('setApprovalForAll', setApprovalForAllParams(params));
            return;
        };
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call: setApprovalForAll_call
        });
        let setOwner_send = async (owner) => {
            let result = await this.send('setOwner', [owner]);
            return result;
        };
        let setOwner_call = async (owner) => {
            let result = await this.call('setOwner', [owner]);
            return;
        };
        this.setOwner = Object.assign(setOwner_send, {
            call: setOwner_call
        });
        let takeOwnership_send = async () => {
            let result = await this.send('takeOwnership');
            return result;
        };
        let takeOwnership_call = async () => {
            let result = await this.call('takeOwnership');
            return;
        };
        this.takeOwnership = Object.assign(takeOwnership_send, {
            call: takeOwnership_call
        });
        let transferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
        let transferFrom_send = async (params) => {
            let result = await this.send('transferFrom', transferFromParams(params));
            return result;
        };
        let transferFrom_call = async (params) => {
            let result = await this.call('transferFrom', transferFromParams(params));
            return;
        };
        this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
        });
        let transferOwnership_send = async (newOwner) => {
            let result = await this.send('transferOwnership', [newOwner]);
            return result;
        };
        let transferOwnership_call = async (newOwner) => {
            let result = await this.call('transferOwnership', [newOwner]);
            return;
        };
        this.transferOwnership = Object.assign(transferOwnership_send, {
            call: transferOwnership_call
        });
        let updateCampaignParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), params.dataUri];
        let updateCampaign_send = async (params) => {
            let result = await this.send('updateCampaign', updateCampaignParams(params));
            return result;
        };
        let updateCampaign_call = async (params) => {
            let result = await this.call('updateCampaign', updateCampaignParams(params));
            return;
        };
        this.updateCampaign = Object.assign(updateCampaign_send, {
            call: updateCampaign_call
        });
        let verifyDirectLock_send = async (lockId) => {
            let result = await this.send('verifyDirectLock', [eth_wallet_1.Utils.toString(lockId)]);
            return result;
        };
        let verifyDirectLock_call = async (lockId) => {
            let result = await this.call('verifyDirectLock', [eth_wallet_1.Utils.toString(lockId)]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.verifyDirectLock = Object.assign(verifyDirectLock_send, {
            call: verifyDirectLock_call
        });
        let verifyMerkleLockParams = (params) => [eth_wallet_1.Utils.toString(params.lockId), eth_wallet_1.Utils.toString(params.campaignId), eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.toString(params.startDate), eth_wallet_1.Utils.toString(params.endDate), eth_wallet_1.Utils.stringToBytes32(params.proof)];
        let verifyMerkleLock_send = async (params) => {
            let result = await this.send('verifyMerkleLock', verifyMerkleLockParams(params));
            return result;
        };
        let verifyMerkleLock_call = async (params) => {
            let result = await this.call('verifyMerkleLock', verifyMerkleLockParams(params));
            return new eth_wallet_1.BigNumber(result);
        };
        this.verifyMerkleLock = Object.assign(verifyMerkleLock_send, {
            call: verifyMerkleLock_call
        });
        let withdrawFundParams = (params) => [params.token, eth_wallet_1.Utils.toString(params.amount)];
        let withdrawFund_send = async (params) => {
            let result = await this.send('withdrawFund', withdrawFundParams(params));
            return result;
        };
        let withdrawFund_call = async (params) => {
            let result = await this.call('withdrawFund', withdrawFundParams(params));
            return;
        };
        this.withdrawFund = Object.assign(withdrawFund_send, {
            call: withdrawFund_call
        });
    }
}
exports.ValidVestingVault = ValidVestingVault;
