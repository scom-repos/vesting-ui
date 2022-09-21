import 'mocha';

import {Utils, Wallet, Erc20, BigNumber} from "@ijstech/eth-wallet";
import {Claimant, Contracts, Locker} from '../src';
import * as Ganache from "ganache";
import * as assert from 'assert';

suite('##Contracts', function() {  
    this.timeout(40000);
    let provider = Ganache.provider()        
    let wallet = new Wallet(provider); 
    let vestingFactory: Contracts.ValidVestingVaultFactory;  
    let vesting: Contracts.ValidVestingVault;   
    let accounts: string[];   
    let lockData = [];
    let token1: Erc20;
    let tree;
    const abi = [
        {
            type: 'uint256',
            name: 'campaignId'
        },        
        {
            type: 'uint256',
            name: 'amount'
        },
        {
            type: 'uint256',
            name: 'startDate'
        },
        {
            type: 'uint256',
            name: 'endDate'
        }
    ]
    async function doClaim() {
        let myClaims = await Claimant.getMyClaims(wallet, vesting.address);
        console.log('myClaims', myClaims)
        for (let i = 0; i < myClaims.length; i++) {
            let receipt = await vesting.claim(myClaims[i].tokenId);
            let claimEvent = vesting.parseClaimEvent(receipt)[0];
            console.log('claimEvent.amount', Utils.fromDecimals(claimEvent.amount).toFixed());
        }      
    } 
    setup(async function(){
        accounts = await wallet.accounts;
    })
    test('Deploy contracts', async function(){
        wallet.defaultAccount = accounts[0];      
        vestingFactory = new Contracts.ValidVestingVaultFactory(wallet);
        await vestingFactory.deploy();
        token1 = new Erc20(wallet);
        await token1.deploy({
            name: 'ERC20',
            symbol: 'ERC20',
            minter: accounts[0],
            cap: 1000
        });
        await token1.mint({
            address: accounts[0],
            amount: 1000
        })
    })
    test('New Profile', async function(){
        wallet.defaultAccount = accounts[0];  
        await vestingFactory.newProfile([accounts[0]]);
        let vestingAddress = await vestingFactory.profileVestingVault(1);
        vesting = new Contracts.ValidVestingVault(wallet, vestingAddress);
        let vestingOwner = await vesting.owner();
        assert.strictEqual(vestingOwner, accounts[0]);
        await vesting.newCampaign({
            dataUri: 'bafkreifj2caucwl5rs3hwbg7rtjnbg7yysu7llvfnbkimbwxslhg4zxmsq',
            token: token1.address,
            ownerFrozen: true
        });
    })
    test('Merkle Lock by account 0', async function(){
        wallet.defaultAccount = accounts[0];
        await token1.approve({
            spender: vesting.address,
            amount: 1000
        })
        lockData = [
            {
                account: accounts[1],
                amount: Utils.toDecimals(100).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086
            },
            {
                account: accounts[2],
                amount: Utils.toDecimals(300).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086
            }
        ]
        let receipt = await Locker.doMerkleLock(
            wallet, 
            vesting.address, 
            1, 
            lockData, 
            'bafkreifj2caucwl5rs3hwbg7rtjnbg7yysu7llvfnbkimbwxslhg4zxmsq'
        );
        let lockEvent = vesting.parseLockEvent(receipt)[0];
        console.log('lockId', lockEvent.lockId.toFixed());
    })
    test('Verify Merkle Lock by account 1', async function(){
        wallet.defaultAccount = accounts[1];
        let vestingData = [
            {
                campaignId: 1,
                account: accounts[1],
                amount: Utils.toDecimals(100).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086,
            },
            {
                campaignId: 1,
                account: accounts[2],
                amount: Utils.toDecimals(300).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086,
            }
        ]
        let receipt = await Claimant.doVerifyMerkleLock(
            wallet, 
            vesting.address, 
            0,
            vestingData
        );
    })  
    test('Verify Merkle Lock by account 2', async function(){
        wallet.defaultAccount = accounts[2];
        let vestingData = [
            {
                campaignId: 1,
                account: accounts[1],
                amount: Utils.toDecimals(100).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086,
            },
            {
                campaignId: 1,
                account: accounts[2],
                amount: Utils.toDecimals(300).toFixed(),
                startDate: 1659424086,
                endDate: 1659534086,
            }
        ]
        let receipt = await Claimant.doVerifyMerkleLock(
            wallet, 
            vesting.address, 
            0,
            vestingData
        );
    })  
    test('Direct Lock by account 0', async function(){
        wallet.defaultAccount = accounts[0];
        let lockItem = {
            account: accounts[2],
            amount: Utils.toDecimals(450).toFixed(),
            startDate: 1659424086,
            endDate: 1659534086
        }
        await Locker.doDirectLock(wallet, vesting.address, 1, lockItem);
    }) 
    test('Verify Direct Lock by account 2', async function(){
        wallet.defaultAccount = accounts[2];
        let unverifiedLockInfoMap = await Claimant.getUnverifiedLockInfoMap(
            wallet, 
            vesting.address,
            [1]
        );
        let unverifiedLockInfo = unverifiedLockInfoMap[1];
        for (let i = 0; i < unverifiedLockInfo.length; i++) {
            let lockId = unverifiedLockInfo[i].id;
            let receipt = await vesting.verifyDirectLock(lockId);
        }
    }) 
    test('Claim tokens by account 1', async function(){
        await wallet.increaseBlockTime(48 * 60 * 60);
        let now = (await wallet.getBlockTimestamp('latest'));
        console.log('now', now);
        wallet.defaultAccount = accounts[1];
        await doClaim();
    }) 
    test('Claim tokens by account 2', async function(){
        await wallet.increaseBlockTime(48 * 60 * 60);
        let now = (await wallet.getBlockTimestamp('latest'));
        wallet.defaultAccount = accounts[2];
        await doClaim();
    }) 
})