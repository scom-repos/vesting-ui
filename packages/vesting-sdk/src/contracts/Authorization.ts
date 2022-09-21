import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "@ijstech/eth-wallet";
import Bin from "./Authorization.json";

export class Authorization extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(): Promise<string>{
        return this.__deploy();
    }
    parseAuthorizeEvent(receipt: TransactionReceipt): Authorization.AuthorizeEvent[]{
        return this.parseEvents(receipt, "Authorize").map(e=>this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event: Event): Authorization.AuthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt: TransactionReceipt): Authorization.DeauthorizeEvent[]{
        return this.parseEvents(receipt, "Deauthorize").map(e=>this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event: Event): Authorization.DeauthorizeEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Authorization.StartOwnershipTransferEvent[]{
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e=>this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event: Event): Authorization.StartOwnershipTransferEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Authorization.TransferOwnershipEvent[]{
        return this.parseEvents(receipt, "TransferOwnership").map(e=>this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event: Event): Authorization.TransferOwnershipEvent{
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    deny: {
        (user:string): Promise<TransactionReceipt>;
        call: (user:string) => Promise<void>;
    }
    isPermitted: {
        (param1:string): Promise<BigNumber>;
    }
    newOwner: {
        (): Promise<string>;
    }
    owner: {
        (): Promise<string>;
    }
    permit: {
        (user:string): Promise<TransactionReceipt>;
        call: (user:string) => Promise<void>;
    }
    takeOwnership: {
        (): Promise<TransactionReceipt>;
        call: () => Promise<void>;
    }
    transferOwnership: {
        (newOwner:string): Promise<TransactionReceipt>;
        call: (newOwner:string) => Promise<void>;
    }
    private assign(){
        let isPermitted_call = async (param1:string): Promise<BigNumber> => {
            let result = await this.call('isPermitted',[param1]);
            return new BigNumber(result);
        }
        this.isPermitted = isPermitted_call
        let newOwner_call = async (): Promise<string> => {
            let result = await this.call('newOwner');
            return result;
        }
        this.newOwner = newOwner_call
        let owner_call = async (): Promise<string> => {
            let result = await this.call('owner');
            return result;
        }
        this.owner = owner_call
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
    }
}
export module Authorization{
    export interface AuthorizeEvent {user:string,_event:Event}
    export interface DeauthorizeEvent {user:string,_event:Event}
    export interface StartOwnershipTransferEvent {user:string,_event:Event}
    export interface TransferOwnershipEvent {user:string,_event:Event}
}