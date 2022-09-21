import {IWallet, Contract, Transaction, TransactionReceipt, Utils, BigNumber, Event, IBatchRequestObj} from "@ijstech/eth-wallet";
import Bin from "./ValidVestingVaultFactory.json";

export class ValidVestingVaultFactory extends Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(): Promise<string>{
        return this.__deploy();
    }
    parseNewProfileEvent(receipt: TransactionReceipt): ValidVestingVaultFactory.NewProfileEvent[]{
        return this.parseEvents(receipt, "NewProfile").map(e=>this.decodeNewProfileEvent(e));
    }
    decodeNewProfileEvent(event: Event): ValidVestingVaultFactory.NewProfileEvent{
        let result = event.data;
        return {
            profileId: new BigNumber(result.profileId),
            admins: result.admins,
            _event: event
        };
    }
    newProfile: {
        (admins:string[]): Promise<TransactionReceipt>;
        call: (admins:string[]) => Promise<BigNumber>;
    }
    profileIdCount: {
        (): Promise<BigNumber>;
    }
    profileVestingVault: {
        (param1:number|BigNumber): Promise<string>;
    }
    private assign(){
        let profileIdCount_call = async (): Promise<BigNumber> => {
            let result = await this.call('profileIdCount');
            return new BigNumber(result);
        }
        this.profileIdCount = profileIdCount_call
        let profileVestingVault_call = async (param1:number|BigNumber): Promise<string> => {
            let result = await this.call('profileVestingVault',[Utils.toString(param1)]);
            return result;
        }
        this.profileVestingVault = profileVestingVault_call
        let newProfile_send = async (admins:string[]): Promise<TransactionReceipt> => {
            let result = await this.send('newProfile',[admins]);
            return result;
        }
        let newProfile_call = async (admins:string[]): Promise<BigNumber> => {
            let result = await this.call('newProfile',[admins]);
            return new BigNumber(result);
        }
        this.newProfile = Object.assign(newProfile_send, {
            call:newProfile_call
        });
    }
}
export module ValidVestingVaultFactory{
    export interface NewProfileEvent {profileId:BigNumber,admins:string[],_event:Event}
}