import SHA256 from 'crypto-js/sha256.js';

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        // Indice del bloque
        this.index = index;
        // Fecha y hora de la transacción
        this.timestamp = timestamp;
        // Datos que irá dentro del bloque, dirección de las wallets y los balances de monedas
        this.data = data;
        // Hash del bloque anterior
        this.previousHash = previousHash;
        // Hash actual del bloque
        this.hash = this.calculateHash();
        // Añadimos el nonce
        this.nonce = 0;
    }

    // Cálculo del hash del bloque
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    // PoW, difficulty = número de 0 que añadiremos al hash creado
    mintBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mint ${this.hash}`);
    }
}

export default Block;