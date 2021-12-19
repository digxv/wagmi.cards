pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3GiftsNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    string public contract_metadata;
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIDs;

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

    function mintGift(string memory uri) public returns (uint256) {
        _tokenIDs.increment();
        uint256 newID = _tokenIDs.current();
        _safeMint(msg.sender, newID);
        _setTokenURI(newID, uri);
        return newID;
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
