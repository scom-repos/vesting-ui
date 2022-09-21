// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.15;

import "./Authorization.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC721, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { MerkleProof } from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

contract ValidVestingVault is Authorization, ERC721Enumerable {
    using SafeERC20 for IERC20;
    
    enum VestingStatus {Active, Inactive}
    enum LockType {Direct, Merkle}
    struct VestingInfo {
        uint256 campaignId;
        address recipient;
        uint256 amount;
        uint256 startDate;
        uint256 endDate;
        VestingStatus status;
    }
    struct CampaignInfo {
        string dataUri;
        IERC20 token;
        bool ownerFrozen;
    }
    struct LockInfo {
        LockType lockType;
        uint256 vestingId;
        string dataUri;
        bytes32 root;
        uint64 dateCreated;
    }    

    uint256 public campaignIdCount;
    uint256 public vestingIdCount;
    uint256 public nftIdCount;
    address public factory;
    LockInfo[] public locks; //LockInfo[lockId]
    mapping(uint256 => uint256) public vestingClaimedAmount; //vestingClaimedAmount[vestingId] = claimedAmount
    mapping(address => mapping(uint256 => bool)) public isLockIdVerified; //isLockIdVerified[recipient][lockId] = bool
    mapping(uint256 => uint256[]) public campaignLocks; //campaignLocks[campaignId][idx] = lockId
    mapping(uint256 => CampaignInfo) public campaignInfo; //campaignInfo[campaignId] = CampaignInfo
    mapping(uint256 => VestingInfo) public vestingInfo; //vestingInfo[vestingId] = VestingInfo
    mapping(uint256 => uint256) public nftVestingId; //nftVestingId[nftId] = vestingId
    mapping(uint256 => uint256) public campaignLocked; //campaignLocked[campaignId] = locked
    mapping(uint256 => uint256) public campaignClaimed; //campaignClaimed[campaignId] = claimed

    event NewCampaign(uint256 indexed campaignId, address indexed sender);
    event UpdateCampaign(uint256 indexed campaignId, string dataUri, address indexed sender);
    event Lock(uint256 indexed lockId, uint256 indexed campaignId, uint256 amount, address indexed sender);
    event CreateVesting(uint256 indexed campaignId, uint256 vestingId, address indexed recipient, uint256 amount, uint256 startDate, uint256 endDate);     
    event Mint(uint256 indexed campaignId, uint256 indexed nftId, address indexed recipient);
    event Claim(uint256 indexed nftId, uint256 amount, uint256 totalClaimed, uint256 totalAmount);

    constructor(
        string memory name_, 
        string memory symbol_
    ) ERC721(name_, symbol_) {
        factory = msg.sender;
    }  

    function setOwner(address owner_) external {
        require(msg.sender == factory, "Not from factory");
        owner = owner_;
    }

    function maximumAllowedClaimedFunds(uint256 vestingId) public view returns (uint256) {
        VestingInfo memory info = vestingInfo[vestingId];
        if (block.timestamp < info.startDate)
            return 0;

        if (info.endDate == info.startDate)
            return info.amount;

        if (block.timestamp >= info.endDate)
            return info.amount;

        uint256 elapsedTime = block.timestamp - info.startDate;
        uint256 totalTime = info.endDate - info.startDate;
        return info.amount * elapsedTime / totalTime;
    }

    function locksLength() external view returns (uint256 length) {
        length = locks.length;
    }

    function campaignLocksLength(uint256 campaignId) external view returns (uint256 length) {
        length = campaignLocks[campaignId].length;
    } 

    function newCampaign(
        IERC20 token,
        bool ownerFrozen,
        string calldata dataUri
    ) external auth returns (uint256 campaignId) {
        require(bytes(dataUri).length > 0, "dataUri cannot be empty");
        campaignId = ++campaignIdCount;
        campaignInfo[campaignId] = CampaignInfo({
            dataUri: dataUri,
            token: token,
            ownerFrozen: ownerFrozen
        });
        emit NewCampaign(campaignId, msg.sender);
    }

    function updateCampaign(
        uint256 campaignId, 
        string calldata dataUri
    ) external auth {
        require(bytes(dataUri).length > 0, "dataUri cannot be empty");
        campaignInfo[campaignId].dataUri = dataUri;
        emit UpdateCampaign(campaignId, dataUri, msg.sender);
    }

    // Functions called by sender
    function merkleLock(
        uint256 campaignId,
        uint256 amount, 
        bytes32 merkleRoot,
        string calldata dataUri
    ) external auth returns (uint256 lockId) {
        require(bytes(dataUri).length > 0, "dataUri cannot be empty");
        lockId = locks.length;
        campaignLocks[campaignId].push(lockId);
        locks.push(LockInfo({
            lockType: LockType.Merkle,
            vestingId: 0,
            dataUri: dataUri,
            root: merkleRoot,
            dateCreated: uint64(block.timestamp)          
        }));
        IERC20 token = campaignInfo[campaignId].token;
        amount = _transferAssetFrom(token, msg.sender, amount);
        campaignLocked[campaignId] += amount;
        emit Lock(lockId, campaignId, amount, msg.sender);
    }
    
    function directLock(
        uint256 campaignId,
        address recipient, 
        uint256 amount,
        uint256 startDate, 
        uint256 endDate
    ) external auth returns (uint256 lockId) {
        IERC20 token = campaignInfo[campaignId].token;
        amount = _transferAssetFrom(token, msg.sender, amount);
        uint256 vestingId = writeVestingData(campaignId, recipient, amount, startDate, endDate); 
        lockId = locks.length;
        campaignLocks[campaignId].push(lockId);
        locks.push(LockInfo({
            lockType: LockType.Direct,
            vestingId: vestingId,
            dataUri: "",
            root: bytes32(0x00),
            dateCreated: uint64(block.timestamp)          
        }));
        campaignLocked[campaignId] += amount;
        emit Lock(lockId, campaignId, amount, msg.sender);
    }

    // Functions by recipient
    function verifyMerkleLock(
        uint256 lockId,
        uint256 campaignId,
        uint256 amount, 
        uint256 startDate, 
        uint256 endDate,  
        bytes32[] calldata proof
    ) external returns (uint256 nftId) {
        require(locks[lockId].lockType == LockType.Merkle, "Invalid lock type");
        require(
            MerkleProof.verify(proof, locks[lockId].root, keccak256(
                abi.encodePacked(
                    msg.sender, 
                    campaignId, 
                    amount, 
                    startDate, 
                    endDate
                )
            ))
        , "merkle proof failed");
        require(!isLockIdVerified[msg.sender][lockId], "merkleId already verified");
        uint256 vestingId = writeVestingData(campaignId, msg.sender, amount, startDate, endDate);
        nftId = nftIdCount;
        nftIdCount += 1; 
        nftVestingId[nftId] = vestingId;
        isLockIdVerified[msg.sender][lockId] = true;
        emit Mint(campaignId, nftId, msg.sender);   
        _safeMint(msg.sender, nftId);
    }

    function verifyDirectLock(
        uint256 lockId
    ) external returns (uint256 nftId) {
        require(locks[lockId].lockType == LockType.Direct, "Invalid lock type");
        require(!isLockIdVerified[msg.sender][lockId], "vestingId already verified");
        uint256 vestingId = locks[lockId].vestingId; 
        VestingInfo memory info = vestingInfo[vestingId];
        require(msg.sender == info.recipient, "Recipient not match");
        nftId = nftIdCount;
        nftIdCount += 1; 
        nftVestingId[nftId] = vestingId;
        isLockIdVerified[msg.sender][lockId] = true;
        emit Mint(info.campaignId, nftId, msg.sender);   
        _safeMint(msg.sender, nftId);
    }

    /// @dev Claim from a lockup. The tokens will be sent directly to the recipient.
    /// @param id The ID to claim on.
    function claim(uint256 id) external {
        doClaim(id);
    }
    
    /// @dev Claim from multiple lockups. The tokens will be sent directly to their recipients.
    /// @param ids The lockups to claim on.
    function claimMultiple(uint256[] memory ids) external {
        uint256 length = ids.length;
        for (uint256 i = 0; i < length; i++) {
            doClaim(ids[i]);
        }
    }

    function withdrawFund(IERC20 token, uint256 amount) external onlyOwner {
        token.safeTransfer(msg.sender, amount);
    }

    function getInfo(uint256 nftId) 
        external 
        view 
        returns (
            uint256 campaignId, 
            uint256 vestingId, 
            address recipient, 
            IERC20 token, 
            uint256 unclaimedFunds, 
            uint256 claimedAmount, 
            uint256 totalAmount, 
            uint256 startDate, 
            uint256 endDate
        ) 
    {
        recipient = ownerOf(nftId);
        vestingId = nftVestingId[nftId];
        VestingInfo memory info = vestingInfo[vestingId];
        campaignId = info.campaignId;
        token = campaignInfo[campaignId].token;
        unclaimedFunds = vestingUnclaimedFunds(vestingId);
        claimedAmount = vestingClaimedAmount[vestingId];
        totalAmount = info.amount;
        startDate = info.startDate;
        endDate = info.endDate;
    }

    function _transfer(address from, address to, uint256 nftId) internal override {
        uint256 vestingId = nftVestingId[nftId];
        uint256 campaignId = vestingInfo[vestingId].campaignId;
        require(to != from, "Cannot transfer to the same address");
        require(!campaignInfo[campaignId].ownerFrozen, "Token owner is frozen!");
        super._transfer(from, to, nftId);
    }

    function _approve(address to, uint256 nftId) internal override {
        uint256 vestingId = nftVestingId[nftId];
        uint256 campaignId = vestingInfo[vestingId].campaignId;
        require(to == address(0) || !campaignInfo[campaignId].ownerFrozen, "Token owner is frozen!");
        super._approve(to, nftId);
    }

    function _transferAssetFrom(IERC20 token, address from, uint amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(from, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }

    function writeVestingData(
        uint256 campaignId, 
        address recipient,
        uint256 amount, 
        uint256 startDate, 
        uint256 endDate
    ) internal returns (uint256 vestingId) {
        require(startDate <= endDate, "Start date cannot be later than end date");       
        vestingId = ++vestingIdCount;
        vestingInfo[vestingId] = VestingInfo({
            campaignId: campaignId,
            recipient: recipient,
            amount: amount,
            startDate: startDate,
            endDate: endDate,
            status: VestingStatus.Active
        });
        emit CreateVesting(campaignId, vestingId, recipient, amount, startDate, endDate);
    }

    function doClaim(uint256 nftId) internal {
        uint256 vestingId = nftVestingId[nftId];
        require(ownerOf(nftId) == msg.sender, "Cannot claim() on a token belonging to another address!");
        uint256 maxClaimable = maximumAllowedClaimedFunds(vestingId);
        if (maxClaimable == vestingClaimedAmount[vestingId])
            return;
        uint256 unclaimed = maxClaimable - vestingClaimedAmount[vestingId];
        vestingClaimedAmount[vestingId] = maxClaimable;
        VestingInfo memory info = vestingInfo[vestingId];
        require(info.status == VestingStatus.Active, 'Inactive vesting');
        emit Claim(nftId, unclaimed, vestingClaimedAmount[vestingId], info.amount);
        IERC20 token = campaignInfo[info.campaignId].token;
        token.safeTransfer(msg.sender, unclaimed);
        campaignClaimed[info.campaignId] += unclaimed;
    }
    
    function vestingUnclaimedFunds(uint256 vestingId) internal view returns (uint256) {
         return maximumAllowedClaimedFunds(vestingId) - vestingClaimedAmount[vestingId];
    }
}
