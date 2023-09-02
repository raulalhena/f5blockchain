import express from 'express';
import { getBlockRoutes } from './block.js';
import { getTransactionRoutes } from './transaction.js';

const getRoutes = () => {
    const router = express.Router();

    router.use('/blocks', getBlockRoutes());
    router.use('/transactions', getTransactionRoutes());

    return router;
}

export { getRoutes }