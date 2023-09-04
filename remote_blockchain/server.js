import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: '*'
    }
 });

io.on("connection", (socket) => {
  console.log('connection stablished');
  socket.on('joinMiners', (data) => {
    
  });
});

httpServer.listen(3000);