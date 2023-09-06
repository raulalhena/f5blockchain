/*
    CONTRATO PARA USAR EN REMIX.ETHEREUM.ORG, NO IMPORTADAS LAS DEPENDENCIAS DE OPENZEPPELIN
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Tutorial {
    uint number;    
    address myWallet = 0x8BDD0CE451513C667D7D82efA5e404798f7d847a;

    // Constructor con inicialización de variables
    constructor() {
        number = 5;
    }

    // Modificador personalizado, hace la función a la que se le aplica sea dependiente del valor de
    // la variable number, sólo se ejecutará en el caso de que number = 5
    modifier numberShouldBeFive() {
        require(number == 5, "Number tiene que ser 5");
        // Este caracter indica cuando se ejecuta la función a la que se le ha implemntado el modificador
        _;
    }

    // Función que modifica la variable number con el valor a pasado como argumento
    function setNumber(uint a) public {
        number = a;
    }

    // Función con el modificador pure = no modifica el estado del contrato ni de la blockchain
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }

    // Función con el modificador view = no puede modificar datos (sólo lectura)
    function getNumber() public view returns (uint) {
        return number;
    }

    // Función que devuelve un string siempre que number = 5
    function numberIsFive() view public numberShouldBeFive returns(string memory) {
        return string(abi.encodePacked("La variable number es ", Strings.toString(number)));
    }

    // Funcion con el modificador payable = puede manejar monedas
    function deposit(uint256 amount) public payable {
        
    }

}

