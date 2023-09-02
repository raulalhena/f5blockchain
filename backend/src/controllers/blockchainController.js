import * as serviceBlockchain from "../services/blockchainService.js";

const getAllBlocks = (req, res) => {
    res.status(200).json(serviceBlockchain.getAllBlocks());
}

const getAllTransactions = (req, res) => {
    res.status(200).json(serviceBlockchain.getAllTransactions());
}

const addTransaction = (req, res) => {
    res.status(200).json(serviceBlockchain.addTransaction(req.body));
}

const addBlock = (req, res) => {
    res.status(200).json(serviceBlockchain.addBlock(req.body.data));
}

const getLatestBlock = (req, res) => {
    res.status(200).json(serviceBlockchain.getLatestBlock());
}

const isChainValid = (req, res) => {
    res.status(200).json({
        isChainValid: serviceBlockchain.isChainValid()
    });
}

export {
    getAllBlocks,
    addBlock,
    getLatestBlock,
    isChainValid,
    addTransaction,
    getAllTransactions
}