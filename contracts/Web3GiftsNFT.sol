pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3GiftsNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    string public contract_metadata;
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIDs;

    struct Gift {
        uint256 tokenID;
        uint256 amount;
        bool redeemed;
    }

    mapping(uint256 => Gift) private gifts;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadata
    ) ERC721(_name, _symbol) {
        contract_metadata = _metadata;
    }

    function contractURI() public view returns (string memory) {
        return contract_metadata;
    }

    function mint(string memory uri) public payable returns (uint256) {
        require(msg.value > 0, "Gift cannot be worth 0 ETH");

        _tokenIDs.increment();
        uint256 newID = _tokenIDs.current();

        gifts[newID] = Gift(newID, msg.value, false);

        _safeMint(msg.sender, newID);
        _setTokenURI(newID, uri);
        return newID;
    }

    function redeem(uint256 tokenID) public returns (uint256) {
        Gift memory gift = gifts[tokenID];
        require(gift.redeemed == false, "Gift has already been redeemed");

        address tokenOwner = ownerOf(tokenID);
        require(tokenOwner == msg.sender, "You do not own this gift");

        payable(msg.sender).transfer(gift.amount);
        gifts[tokenID].redeemed = true;

        return gift.amount;
    }

    function transferToken(
        address from,
        address to,
        uint256 tokenID
    ) public returns (bool) {
        super.safeTransferFrom(from, to, tokenID);
        return true;
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

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        return super.ownerOf(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
