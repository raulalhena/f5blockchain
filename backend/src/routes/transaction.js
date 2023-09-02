import express from 'express';
import { addTransaction, getAllTransactions } from '../controllers/blockchainController.js';

const getTransactionRoutes = () => {
    const router = express.Router();

    router.post('/', addTransaction);
    router.get('/', getAllTransactions)

    return router;
}

export { getTransactionRoutes }