import Block from "../utils/Block.js";
import Blockchain from "../utils/Blockchain.js";

const f5scoin = new Blockchain();

const getAllBlocks = () => {
    return f5scoin.chain;
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
    isChainValid
}