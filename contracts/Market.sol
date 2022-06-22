// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error Reserved(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

contract NftMarketplace is ReentrancyGuard, IERC721Receiver {

    enum Status { AWAITING_PURCHASER, AWAITING_DELIVERY, COMPLETE }

    struct Listing {
        uint256 price;
        address seller;
        bool isPhysicalItem;
        Status currStatus;
    }

    struct escrowRecords {
        address nftAddress;
        uint256 tokenId;
        address purchaser;
        address seller;
        uint256 price;
    }

    // Escrow configuratio

    

    mapping(address => mapping(uint256 => escrowRecords)) private escrowDebt;

    // Events

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    // State Variables
    mapping(address => mapping(uint256 => Listing)) private s_listings;
    mapping(address => uint256) private s_proceeds;

    // Function modifiers
    modifier notListed(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    // main functions

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        bool _isPhysicalItem
    )
        external
        notListed(nftAddress, tokenId, msg.sender)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        // internal scoping to work arounf Stack Too Deep error
        {
            IERC721 nft = IERC721(nftAddress);
            if (nft.getApproved(tokenId) != address(this)) {
                revert NotApprovedForMarketplace();
            }
        }

        s_listings[nftAddress][tokenId] = Listing(price, msg.sender, _isPhysicalItem, Status.AWAITING_PURCHASER);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isOwner(nftAddress, tokenId, msg.sender)
    {
        Listing memory listing = s_listings[nftAddress][tokenId];
        require(listing.currStatus == Status.AWAITING_PURCHASER);
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }

        delete (s_listings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    // function required to send ERC721 to this smart contract

    function onERC721Received( address operator, address from, uint256 tokenId, bytes calldata data ) 
    public
    override 
    returns (bytes4) {
            return this.onERC721Received.selector;
        }

    function buyItem(address _nftAddress, uint256 _tokenId, address _owner)
        external
        payable
        nonReentrant
    {
        Listing memory listedItem = s_listings[_nftAddress][_tokenId];
        require(listedItem.currStatus == Status.AWAITING_PURCHASER);

        if (listedItem.price <= 0) {
            revert NotListed(_nftAddress, _tokenId);
        }

        if (msg.value < listedItem.price) {
            revert PriceNotMet(_nftAddress, _tokenId, listedItem.price);
        }
        if (listedItem.isPhysicalItem == true) {
            IERC721 nft = IERC721(_nftAddress);

            listedItem.currStatus = Status.AWAITING_DELIVERY;
            address _seller = listedItem.seller;

            escrowDebt[_nftAddress][_tokenId] = escrowRecords(_nftAddress, _tokenId, msg.sender, _seller, msg.value);
            // as function is set payable i should not need the below line
            // address(this) += msg.value;
            IERC721(_nftAddress).safeTransferFrom(listedItem.seller, address(this), _tokenId);
        } else {
            s_proceeds[listedItem.seller] += msg.value;
            delete (s_listings[_nftAddress][_tokenId]);
            IERC721(_nftAddress).safeTransferFrom(listedItem.seller, msg.sender, _tokenId);
            emit ItemBought(msg.sender, _nftAddress, _tokenId, listedItem.price);
        }

        
    }

    function confirmDelivery(address _nftAddress, uint256 _tokenId) 
        external
        nonReentrant
    {   
        // ensure only the purchaser can confirm delivery
        escrowRecords memory records = escrowDebt[_nftAddress][_tokenId];
        require(msg.sender == records.purchaser, "Only the purchaser can call this function");

        // Ensure the status of the listing is awaiting delivery i.e. the item + payment funds are in escrow
        Listing memory listing = s_listings[_nftAddress][_tokenId];
        require(listing.currStatus == Status.AWAITING_DELIVERY);

        if (listing.price <= 0) {
            revert NotListed(_nftAddress, _tokenId);
        }

        escrowRecords memory escrowItem = escrowDebt[_nftAddress][_tokenId];
        require(msg.sender == escrowItem.purchaser);
        s_proceeds[escrowItem.seller] += escrowItem.price;
        delete (s_listings[_nftAddress][_tokenId]);
        IERC721(_nftAddress).safeTransferFrom(address(this), escrowItem.purchaser, _tokenId);
        emit ItemBought(escrowItem.purchaser, _nftAddress, _tokenId, escrowItem.price);
        delete (escrowDebt[_nftAddress][_tokenId]);

    }


    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    )
        external
        nonReentrant
        isOwner(nftAddress, tokenId, msg.sender)
    {
        Listing memory listing = s_listings[nftAddress][tokenId];
        require(listing.currStatus == Status.AWAITING_PURCHASER);

        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }

        if (newPrice == 0) {
            revert PriceMustBeAboveZero();
        }

        s_listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    function withdrawProceeds() external {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0) {
            revert NoProceeds();
        }
        s_proceeds[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed");
    }

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) external view returns (uint256) {
        return s_proceeds[seller];
    }
}
