import { io } from "socket.io-client";


export const initAdmin = (args) => {

    const socket = io('http://localhost:3000');

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
}