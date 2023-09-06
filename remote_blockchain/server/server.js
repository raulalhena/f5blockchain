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
 const hashPool = [];

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
  
  socket.on('joinToMine', (data) => {
    io.emit('joinedToMine', data);
    for(const miner of miners) {
      if(miner.id === data.id) return;
    }
    miners.push(data);
    console.log(miners);
  });

  socket.on('minerOut', () => {
    console.log(socket.id)
    let minerDisconnected;
    miners.map((miner, index, miners) => {
      if(miner.id === socket.id) {
        minerDisconnected = miner;
        miners.splice(index, 1);
      }
    });
    io.emit('minerOut', {updatedMiners: miners, id: socket.id});
    console.log('miners still connected', miners);
  });

  socket.on('getMiners', () => {
    console.log('getminers')
    io.emit('getMiners', miners);
  });

  socket.on('sendHash', (data) => {
    console.log('sendhash')
    socket.broadcast.emit('startMining', (data));
  });

  socket.on('hashFound', (hash) => {
    if(!hashPool.includes(hash)){
      hashPool.push(hash);
      miners.map((miner) => {
        if(miner.id === socket.id) miner.rewards++;
      });
      console.log('hash pool', hashPool);
      io.emit('hashFound', miners);
    }
  })
  
});

httpServer.listen(3000, () => {
  console.log('Server listenting on port 3000...');
});