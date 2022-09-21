import { IWallet, Contract, TransactionReceipt, BigNumber, Event } from "@ijstech/eth-wallet";
export declare class ValidVestingVaultFactory extends Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(): Promise<string>;
    parseNewProfileEvent(receipt: TransactionReceipt): ValidVestingVaultFactory.NewProfileEvent[];
    decodeNewProfileEvent(event: Event): ValidVestingVaultFactory.NewProfileEvent;
    newProfile: {
        (admins: string[]): Promise<TransactionReceipt>;
        call: (admins: string[]) => Promise<BigNumber>;
    };
    profileIdCount: {
        (): Promise<BigNumber>;
    };
    profileVestingVault: {
        (param1: number | BigNumber): Promise<string>;
    };
    private assign;
}
export declare module ValidVestingVaultFactory {
    interface NewProfileEvent {
        profileId: BigNumber;
        admins: string[];
        _event: Event;
    }
}
