//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MonoNFT is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    address public marketplaceAddress;
    mapping(uint256 => address) private _creators;

    event TokenMinted(uint256 indexed tokenId, string tokenURI, address marketplaceAddress);
    Counters.Counter private _tokenIds;

    constructor(address _marketplaceAddress) ERC721("MonoNFT", "MNFT") {
        marketplaceAddress = _marketplaceAddress;
    }


    function mintToken(string memory tokenUri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _creators[newItemId] = msg.sender;
        _setTokenURI(newItemId, tokenUri);

        // Give the marketplace approval to transact NFTs between users
        setApprovalForAll(marketplaceAddress, true);

        emit TokenMinted(newItemId, tokenUri, marketplaceAddress);
        return newItemId;
    }

    function giveAway(address to) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(to, newItemId);
        _setTokenURI(
            newItemId,
            "https://arweave.net/OsqlmFB-i_dN9J1g_jSvVdsoRXPJB3ux9utDZ7is0kM"
        );
        setApprovalForAll(marketplaceAddress, true);

        console.log("Minted token %s to %s", newItemId, to);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function getTokenCreatorById(uint256 tokenId) public view returns (address) {
        return _creators[tokenId];
    }
}