import { io } from "socket.io-client";


export const initAdmin = (args) => {

    const socket = io('http://93.93.112.16:8000');

    socket.connect();

    socket.on('connect', () => {
        socket.emit('joinToMine', {id: socket.id});
        console.log('connected', socket.id);
    });

    socket.emit('sendHash', {
        timestamp: args.timestamp,
        transactions: args.transactions,
        previousHash: args.previousHash,
        difficulty: args.difficulty
    });

    socket.on('hashFound', (miner) => {
        console.log('winner: ', miner);
    })
}