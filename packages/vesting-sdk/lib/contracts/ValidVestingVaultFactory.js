"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidVestingVaultFactory = void 0;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const ValidVestingVaultFactory_json_1 = __importDefault(require("./ValidVestingVaultFactory.json"));
class ValidVestingVaultFactory extends eth_wallet_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ValidVestingVaultFactory_json_1.default.abi, ValidVestingVaultFactory_json_1.default.bytecode);
        this.assign();
    }
    deploy() {
        return this.__deploy();
    }
    parseNewProfileEvent(receipt) {
        return this.parseEvents(receipt, "NewProfile").map(e => this.decodeNewProfileEvent(e));
    }
    decodeNewProfileEvent(event) {
        let result = event.data;
        return {
            profileId: new eth_wallet_1.BigNumber(result.profileId),
            admins: result.admins,
            _event: event
        };
    }
    assign() {
        let profileIdCount_call = async () => {
            let result = await this.call('profileIdCount');
            return new eth_wallet_1.BigNumber(result);
        };
        this.profileIdCount = profileIdCount_call;
        let profileVestingVault_call = async (param1) => {
            let result = await this.call('profileVestingVault', [eth_wallet_1.Utils.toString(param1)]);
            return result;
        };
        this.profileVestingVault = profileVestingVault_call;
        let newProfile_send = async (admins) => {
            let result = await this.send('newProfile', [admins]);
            return result;
        };
        let newProfile_call = async (admins) => {
            let result = await this.call('newProfile', [admins]);
            return new eth_wallet_1.BigNumber(result);
        };
        this.newProfile = Object.assign(newProfile_send, {
            call: newProfile_call
        });
    }
}
exports.ValidVestingVaultFactory = ValidVestingVaultFactory;
