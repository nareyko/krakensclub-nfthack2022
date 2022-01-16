//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Krakens is ERC1155, Ownable {
    mapping(uint256 => uint256) public tokenSupply;
    mapping(uint256 => uint256) public level;
    uint256 public publicMintMax;
    uint256 public publicMintLevel;
    uint256 public publicMinted;

    uint256 private currentTokenID = 99; // 0-99 are reserved for fungible tokens
    uint256 public constant minNFTID = 100;

    string public name;
    string public symbol;
    string private _uri;

    constructor() ERC1155("https://krakensclub.com/ipfs/"){
        name = "Krakens Sailing Club";
        symbol = "KRAKENS";
    }

    function setUri(string memory _newuri) external onlyOwner {
        _uri = _newuri;
    }

    function uri(uint256 _id) override public view returns (string memory) {
        return string(abi.encodePacked(_uri, Strings.toString(_id)));
    }

    function totalSupply(uint256 _id) public view returns (uint256) {
        return tokenSupply[_id];
    }

    function mint(
        address _to,
        uint256 _level,
        uint256 _id,
        uint256 _quantity,
        bytes memory _data
    ) external onlyOwner {
        if (currentTokenID < _id) {
            currentTokenID = _id;
        }
        _mint(_to, _id, _quantity, _data);
        level[_id] = _level;
        tokenSupply[_id] += _quantity;
    }

    function setPublicMint(uint256 _max, uint256 _level) external onlyOwner {
        publicMintMax = _max;
        publicMintLevel = _level;
        publicMinted = 0;
    }

    function publicMint(uint256 _quantity) external payable {
        require(
            publicMinted + _quantity <= publicMintMax,
            "WOULD_EXCEED_SUPPLY"
        );
        require(msg.sender == tx.origin, "CONTRACTS_CANNOT_MINT");
        _mint(msg.sender, publicMintLevel, _quantity, "");
        level[publicMintLevel] = publicMintLevel;
    }
    function mystic(uint256 _tokenid1, uint256 _tokenid2) external {
        require(_tokenid1 != _tokenid2, "MUST_BE_DIFFERENT");
        require(_tokenid1 >= minNFTID, "T1_MUST_BE_NFT");
        require(_tokenid2 >= minNFTID, "T2_MUST_BE_NFT");
        require(balanceOf(msg.sender, _tokenid1) > 0, "MUST_OWN_T1");
        require(balanceOf(msg.sender, _tokenid2) > 0, "MUST_OWN_T2");
        require(level[_tokenid1] == level[_tokenid2], "MUST_HAVE_SAME_LEVEL");
        require(level[_tokenid1] < minNFTID-1, "TOO_HIGH LEVEL");

        _safeTransferFrom(msg.sender, owner(), _tokenid1, 1, "");
        _safeTransferFrom(msg.sender, owner(), _tokenid2, 1, "");
        _mint(msg.sender, level[_tokenid1]+1, 1, "");
    }
    function swap(uint256 _tokenid1, uint256 _tokenid2) external {
        require(_tokenid1 != _tokenid2, "MUST_BE_DIFFERENT");
        require(_tokenid1 >= minNFTID, "T1_MUST_BE_NFT");
        require(_tokenid2 >= minNFTID, "T2_MUST_BE_NFT");
        require(balanceOf(msg.sender, _tokenid1) > 0, "MUST_OWN_T1");
        require(balanceOf(msg.sender, _tokenid2) > 0, "MUST_OWN_T2");
        require(level[_tokenid1] != level[_tokenid2], "MUST_HAVE_DIFFERENT_LEVELS");
        if (level[_tokenid1] < level[_tokenid2]) {
            uint256 _temp = level[_tokenid2];
            level[_tokenid2] = level[_tokenid1];
            level[_tokenid1] = _temp;
        } else {
            uint256 _temp = level[_tokenid1];
            level[_tokenid1] = level[_tokenid2];
            level[_tokenid2] = _temp;
        }
    }
    function power(uint256 _tokenid1, uint256 _tokenid2) external {
        require(_tokenid1 != _tokenid2, "MUST_BE_DIFFERENT");
        require(_tokenid1 >= minNFTID, "T1_MUST_BE_NFT");
        require(_tokenid2 >= minNFTID, "T2_MUST_BE_NFT");
        require(balanceOf(msg.sender, _tokenid1) > 0, "MUST_OWN_T1");
        require(balanceOf(msg.sender, _tokenid2) > 0, "MUST_OWN_T2");
        require(level[_tokenid1] == level[_tokenid2], "MUST_HAVE_SAME_LEVEL");
        require(level[_tokenid1] < minNFTID-1, "TOO_HIGH LEVEL");
        _safeTransferFrom(msg.sender, owner(), _tokenid2, 1, "");
        level[_tokenid1] += 1;
    }
}