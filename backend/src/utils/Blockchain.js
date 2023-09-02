import Block from './Block.js';

class Blockchain {
    constructor() {
        // Inicializamos la blockchain con el bloque génsis
        this.chain = [this.createGenesisBlock()];
    }

    // Create del bloque genesis, primer bloque de la cadena
    createGenesisBlock() {
        return new Block(0, '02/09/23', 'Genesis Block', '0');
    }

    // Obtener el último bloque de la cadena
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Añadir nuevo bloque
    addBlock(newBlock) {
        // Obtenemos el Hash del bloque anterior
        newBlock.previousHash = this.getLatestBlock().hash;

        // Calcular el Hash del bloque que queremos añadir
        newBlock.hash = newBlock.calculateHash();

        // Añadimos el bloque a la blockchain (Array)
        this.chain.push(newBlock);
    }

    // Comprobar la integridad de la blockchain. Comprobamos los hash entre los bloques, previusHash
    // Si los hash no son correctos, devuelve false, si todos son correctos, devuelve true
    isChainValid() {
        // Recorremos el array de la blockchain, y obtenemos los
        for(let i = 0; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[ i - 1 ];

            // Comprobamos si los hash, tanto del bloque actual, como el previousHash que almacena el bloque actual con el hash 
            // del bloque anterior, son correctos
            if(currentBlock.hash !== currentBlock.calculateHash() && currentBlock.previousHash !== previousBlock.hash) {
                return false;
            } 
        }
        
        // Si todos los hash son correctos, devuelve true
        return true;
    }
}

export default Blockchain;