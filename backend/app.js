import express from 'express';
import { getRoutes } from './src/routes/index.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server working');
});

app.use('/api', getRoutes());


app.listen('4000', () => {
    console.log('Server listening on port 4000...');
});