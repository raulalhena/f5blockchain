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

 const miners = [];

io.on("connection", (socket) => {
  
  console.log('connection stablished', socket.id);
  io.emit('welcome', miners);
  console.log('>>>> CONNECTED <<<<<<')
  console.log(miners);

  socket.on('disconnect', (socket) => {
    console.log(miners)
    console.log('>>>> DISCONNECTED <<<<<<')
    console.log(miners);
  });
  
  socket.on('minerJoined', (data) => {
    console.log(miners);
    io.emit('minerJoined', data);
    for(const miner of miners) {
      if(miner.id === data.id) return;
    }
    miners.push(data);
    console.log(miners);
  });

  socket.on('disconnected', () => {
    console.log(socket.id)
    miners.map((miner, index, miners) => {
      if(miner.id === socket.id) miners.splice(index, 1);
    });
  });
 
});

httpServer.listen(3000, () => {
  console.log('Server listenting on port 3000...');
});