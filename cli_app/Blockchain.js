import Block from './Block.js';
import Transaction from './Transaction.js';

class Blockchain {
    constructor() {
        // Inicializamos la blockchain con el bloque génsis
        this.chain = [this.createGenesisBlock()];
        // Especificamos la dificultad al instanciar la Blockchain
        this.difficulty = 2;
        // Crear un array de transacciones pendientes
        this.pendingTransactions = [];
        // Recompensa que recibirá el minero por crear el nuevo bloque
        this.miningReward = 100;
    }

    // Create del bloque genesis, primer bloque de la cadena
    createGenesisBlock() {
        return new Block(Date.now(), 'Genesis Block', '0');
    }

    // Obtener el último bloque de la cadena
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Minado de las transacciones pendientes
    minePendingTransactions(miningRewardAddress) {
        // Creamos la transacción del minado para enviar la recompensa al minero que crea el bloque
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        // Creamos nuevo objeto bloque, pasandole los argumentos correspondientes al constructor
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);

        // Minamos el bloque pasandole la dificultad e informamos que el bloque se ha minado correctamente
        block.mineBlock(this.difficulty);
        console.log(`Block successfully mined, hash: ${block.hash}`);
        
        // Añadimos el bloque a la blockchain
        this.chain.push(block);

        // Añadimos una transacción pendiente al array para que el minero reciba el premio por minar el bloque
        this.pendingTransactions = [];
    }

    // Creamos nuevas transacciones
    addTransactions(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) throw new Error('Transaction should have from and to address');
        if(!transaction.isValid()) throw new Error(`Can't add a no valid transaction to blockchain`);

        this.pendingTransactions.push(transaction);
    }

    // Obtenemos el balance de una wallet
    getBalanceOfAddress(address) {
        let balance = 0;

        // Iteramos en todos los bloques de la cadena
        for(const block of this.chain){
            // Iteramos en todas las transacciones de cada bloque
            for(const trans of block.transactions){
                // Si la dirección que llega como argumento es igual a la dirección de origen
                // se resta la cantidad que hay en la transacción
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                // Si la dirección que llega como argumento es igual a la dirección de destino
                // se suma la cantidad que hay en la transacción
                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        // Devolvemos el balance de la dirección de wallet
        return balance;
    }

    // Comprobar la integridad de la blockchain. Comprobamos los hash entre los bloques, previusHash
    // Si los hash no son correctos, devuelve false, si todos son correctos, devuelve true
    isChainValid() {
        // Recorremos el array de la blockchain, y obtenemos los
        for(let i = 1; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[ i - 1 ];

            // Comprobamos si los hash, tanto del bloque actual, como el previousHash que almacena el bloque actual con el hash 
            // del bloque anterior, son correctos
            if(currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
                return false;
            } 
        }
        
        // Si todos los hash son correctos, devuelve true
        return true;
    }
}

export default Blockchain;