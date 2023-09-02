import express from 'express';
import { addBlock, getAllBlocks, getLatestBlock, isChainValid } from '../controllers/blockchainController.js';

const getBlockRoutes = () => {
    const router = express.Router();

    router.get('/', getAllBlocks);
    router.post('/add', addBlock);
    router.get('/last', getLatestBlock);
    router.get('/valid', isChainValid);

    return router;
}

export { getBlockRoutes }