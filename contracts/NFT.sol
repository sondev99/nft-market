//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MonoNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    address public marketplaceAddress;
    Counters.Counter private _tokenIds;

        struct Nft {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    constructor(address _marketplaceAddress) ERC721("MonoNFT", "MNFT") {
        marketplaceAddress = _marketplaceAddress;
    }

    function mint(string memory _tokenURI)         
        public
        payable
        returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        return newTokenId;
    }


}
