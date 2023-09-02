import Block from "../utils/Block.js";
import Blockchain from "../utils/Blockchain.js";

import elliptic from 'elliptic';
import Transaction from "../utils/Transaction.js";

const EC = elliptic.ec;
const ec = new EC('secp256k1');

// Creamos las claves de la wallet
// Privada
const myPrivateKey = ec.keyFromPrivate('e46873a2895a79cb60fc70198f8919209ff74daf3ec394cd7bfb21b442196ea2');
// Publica, la usamos como dirección a la que nos van a enviar las monedas
const myWalletAddress = myPrivateKey.getPublic('hex');

const f5scoin = new Blockchain();

const getAllBlocks = () => {
    return f5scoin.chain;
}

const addTransaction = (transaction) => {
    const trans = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount);
    trans.signTransaction(myPrivateKey);
    f5scoin.addTransactions(trans);
    return f5scoin.minePendingTransactions(myWalletAddress);
}

const getAllTransactions = () => {
    return 'hola';
}

const addBlock = (data) => {
    f5scoin.addBlock(new Block(f5scoin.getLatestBlock().index + 1, Date.now(), data));
    return f5scoin.getLatestBlock();
}

const getLatestBlock = () => {
    return f5scoin.getLatestBlock();
}

const isChainValid = () => {
    return f5scoin.isChainValid();
}

export {
    getAllBlocks,
    addBlock,
    getLatestBlock,
    isChainValid,
    addTransaction,
    getAllTransactions
}