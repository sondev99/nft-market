// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import 'hardhat/console.sol';

contract NFTMarketplace is IERC721Receiver, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    IERC721Enumerable private nft;
    IERC20 private token;

    // uint256 listingPrice = 0.025 ether;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        uint256 price;
        address payable seller;
        address payable owner;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event ListNFT(address indexed _from, uint256 _tokenId, uint256 _price);
    event UnlistNFT(address indexed _from, uint256 _tokenId);
    event BuyNFT(address indexed _from, uint256 _tokenId, uint256 _price);
    event UpdateListingNFTPrice(uint256 _tokenId, uint256 _price);
    event SetToken(IERC20 _token);
    event SetTax(uint256 _tax);

    event SetNFT(IERC721Enumerable _nft);

    uint256 private tax = 10; // percentage

    constructor(IERC20 _token, IERC721Enumerable _nft) {
        nft = _nft;
        token = _token;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override pure returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }


    function setTax(uint256 _tax) public onlyOwner {
        tax = _tax;
        emit SetTax(_tax);
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
        emit SetToken(_token);
    }

    function setNft(IERC721Enumerable _nft) public onlyOwner {
        nft = _nft;
        emit SetNFT(_nft);
    }


    function createMarketItem(uint256 _tokenId, uint256 _price) private {
        require(_price > 0, 'Price must be at least 1 wei');

        idToMarketItem[_tokenId] = MarketItem(
            _tokenId,
            _price,
            payable(msg.sender),
            payable(address(this)),
            false
        );

        nft.transferFrom(msg.sender, address(this), _tokenId);
        emit MarketItemCreated(
            _tokenId,
            msg.sender,
            address(this),
            _price,
            false
        );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            'Only item owner can perform this operation'
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        nft.transferFrom(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function buyNft(uint256 _tokenId,uint256 _price) public payable {
        require(token.balanceOf(msg.sender) >= _price, "Insufficient account balance");
        require(nft.ownerOf(_tokenId) == address(this), "This NFT doesn't exist on marketplace");
        require(idToMarketItem[_tokenId].price <= _price, "Minimum price has not been reached");

        idToMarketItem[_tokenId].owner = payable(msg.sender);
        idToMarketItem[_tokenId].sold = true;
        idToMarketItem[_tokenId].seller = payable(address(0));
        _itemsSold.increment();
        nft.transferFrom(address(this), msg.sender, _tokenId);
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _price);
        token.transfer(idToMarketItem[_tokenId].owner, _price * (100 - tax) / 100);
          
        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit BuyNFT(msg.sender,_tokenId, _price);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}