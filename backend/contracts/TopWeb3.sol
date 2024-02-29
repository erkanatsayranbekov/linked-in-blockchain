// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TOPWEB3NFT is ERC721, Ownable {
    uint256 private constant MAX_FRIENDS_FOR_NFT = 3;
    
    constructor(address _owner) ERC721("TOPWEB3NFT", "TWNFT") Ownable(_owner) {}

    function mint(address to, uint256 tokenId) external onlyOwner {
        require(tokenId == 0, "Token ID must be 0");
        _safeMint(to, tokenId);
    }
    
    function mintNFTIfQualified(address recipient, uint256 currentFriendsCount) external onlyOwner {
        require(currentFriendsCount >= MAX_FRIENDS_FOR_NFT, "User does not have enough friends for NFT");
        require(balanceOf(recipient) == 0, "Recipient already has a TOPWEB3NFT");
        
        _safeMint(recipient, 0);
    }
}
