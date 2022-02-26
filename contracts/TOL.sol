//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TOL is Ownable, ERC721Enumerable{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  mapping(uint256 => string) private _tokenURIS;

  event TokenURISet(uint256 tokenId, string tokenUri);

  constructor() ERC721("Truckloads of Love", "TOL") {}

  function mint(address recipient) external onlyOwner {
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function setTokenURI(uint256 tokenId, string memory tokenUri) external onlyOwner {
    _tokenURIS[tokenId] = tokenUri;

    emit TokenURISet(tokenId, tokenUri);
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return _tokenURIS[tokenId];
  }
}