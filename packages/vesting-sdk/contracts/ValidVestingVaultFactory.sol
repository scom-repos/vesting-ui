// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.15;

import {ValidVestingVault} from "./ValidVestingVault.sol";

contract ValidVestingVaultFactory {
    uint256 public profileIdCount;
    mapping(uint256 => ValidVestingVault) public profileVestingVault; //profileVestingVault[profileId] = ValidVestingVault

    event NewProfile(uint256 profileId, address[] admins);
    
    constructor() {
    }  

    function newProfile(address[] calldata admins) external returns (uint256 profileId) {
        profileId = ++profileIdCount;
        ValidVestingVault vestingVault = new ValidVestingVault("Valid Vesting Vault", "Valid-Vesting-Vault");
        for (uint i = 0; i < admins.length; i++) {
            vestingVault.permit(admins[i]);
        }
        vestingVault.setOwner(msg.sender);
        profileVestingVault[profileId] = vestingVault;
        emit NewProfile(profileId, admins);
    }  
}
