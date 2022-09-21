import { IWallet, Contract, TransactionReceipt, BigNumber, Event } from "@ijstech/eth-wallet";
export declare class Authorization extends Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(): Promise<string>;
    parseAuthorizeEvent(receipt: TransactionReceipt): Authorization.AuthorizeEvent[];
    decodeAuthorizeEvent(event: Event): Authorization.AuthorizeEvent;
    parseDeauthorizeEvent(receipt: TransactionReceipt): Authorization.DeauthorizeEvent[];
    decodeDeauthorizeEvent(event: Event): Authorization.DeauthorizeEvent;
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Authorization.StartOwnershipTransferEvent[];
    decodeStartOwnershipTransferEvent(event: Event): Authorization.StartOwnershipTransferEvent;
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Authorization.TransferOwnershipEvent[];
    decodeTransferOwnershipEvent(event: Event): Authorization.TransferOwnershipEvent;
    deny: {
        (user: string): Promise<TransactionReceipt>;
        call: (user: string) => Promise<void>;
    };
    isPermitted: {
        (param1: string): Promise<BigNumber>;
    };
    newOwner: {
        (): Promise<string>;
    };
    owner: {
        (): Promise<string>;
    };
    permit: {
        (user: string): Promise<TransactionReceipt>;
        call: (user: string) => Promise<void>;
    };
    takeOwnership: {
        (): Promise<TransactionReceipt>;
        call: () => Promise<void>;
    };
    transferOwnership: {
        (newOwner: string): Promise<TransactionReceipt>;
        call: (newOwner: string) => Promise<void>;
    };
    private assign;
}
export declare module Authorization {
    interface AuthorizeEvent {
        user: string;
        _event: Event;
    }
    interface DeauthorizeEvent {
        user: string;
        _event: Event;
    }
    interface StartOwnershipTransferEvent {
        user: string;
        _event: Event;
    }
    interface TransferOwnershipEvent {
        user: string;
        _event: Event;
    }
}
