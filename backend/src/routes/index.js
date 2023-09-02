import express from 'express';
import { getBlockRoutes } from './block.js';

const getRoutes = () => {
    const router = express.Router();

    router.use('/blocks', getBlockRoutes());

    return router;
}

export { getRoutes }