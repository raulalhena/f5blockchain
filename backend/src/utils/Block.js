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
    }

    // Cálculo del hash del bloque
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

export default Block;