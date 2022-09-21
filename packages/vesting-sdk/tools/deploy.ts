import {ValidVestingVaultFactory} from "../src/contracts";
import {BigNumber, Utils, Wallet} from "@ijstech/eth-wallet";
import Web3 from 'web3';
import * as Config from '../data/config';

let rpcUrl = Config.rpcUrl
let account = Config.deployer;

async function deploy() {
    let {admins} = Config.deploymentOptions;
    let provider = new Web3.providers.HttpProvider(rpcUrl);
    let wallet = new Wallet(provider, account);
    let factory = new ValidVestingVaultFactory(wallet);
    let address = await factory.deploy();
    console.log(address);
    await factory.newProfile(admins);
}
deploy();