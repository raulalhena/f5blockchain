import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

socket.on('connect', (data) => {
    socket.emit('join', 'Hello!');
});