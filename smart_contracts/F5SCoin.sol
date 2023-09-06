/*
    IMPLEMENTACION DE TOKEN ERC20
*/

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract F5SCoin is ERC20 {
    constructor() ERC20("F5SCoin", "F5SC") {
        _mint(msg.sender, 21000000 * 10 ** 18);
    }
}