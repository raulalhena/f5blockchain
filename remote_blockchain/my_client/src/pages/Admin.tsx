import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Admin() {
  const [socket, setSocket] = useState();
  const [difficulty, setDifficulty] = useState();
  const [previousHash, setPreviousHash] = useState();
  const [transactions, setTransactions] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [miners, setMiners] = useState([]);
  const [myId, setMyId] = useState();

  const connect = () => {
    setSocket(io('http://localhost:3000'));
  }

  const disconnect = () => {
    if(socket) {
      socket.emit('minerOut');
    }
  }

  const sendHash = () => {
    console.log('sendhash')
    if(socket) socket.emit('sendHash', {
        timestamp: Date.now(),
        transactions,
        previousHash,
        difficulty
    });
  }

  const joinToMine = () => {
    if(socket) socket.emit('joinToMine', {name: username, id: socket.id});
  }

  useEffect(() => {
    console.log('render')
  })

  useEffect(() => {
    if(socket) socket.connect();
  }, [socket, setSocket]);

  useEffect(() => {
    if(socket) {
      const onConnect = () => {
        setIsConnected(true);
        setMyId(socket.id);
        console.log('on connect')
      }
  
      const onWelcome = (miners) => {
        setMiners(miners);
      }

      const onJoinedToMine = (newMiner) => {
        console.log('joined to mine')
        setMiners(m => [...m, {
            name: newMiner.name,
            id: newMiner.id
          }
        ]);
      }

      const onMinerOut = (data) => {
        console.log(data.id, socket.id)
        if(data.id === socket.id) {
          setIsConnected(false);
          setSocket();
          setMyId();
          socket.disconnect();
          return;
        } 
        setMiners(data.updatedMiners);
      }

      const onGetMiners = (allMiners) => {
        setMiners(allMiners);
      }
  
      socket.on('connect', onConnect);
      socket.on('welcome', onWelcome);
      socket.on('minerOut', onMinerOut);
      socket.on('joinedToMine', onJoinedToMine);
      socket.on('getMiners', onGetMiners);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('welcome', onWelcome);
      }
    }
  }, [socket, setSocket])



  return (
    <div>
      <main style={{ heigh: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <h1>ADMIN</h1>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <div>Estado: { isConnected ? 'Conectado' : 'Desconectado' }</div>
        <input style={{ width: '200px', height: '25px'}} onChange={ e => setTransactions(e.target.value) } placeholder='Transacciones...' />
        <input style={{ width: '200px', height: '25px'}} onChange={ e => setPreviousHash(e.target.value) } placeholder='Hash del bloque anterior' />
        <input style={{ width: '200px', height: '25px'}} onChange={ e => setDifficulty(e.target.value) } placeholder='Dificultad de minado...' />
        { isConnected ? <button onClick={sendHash}>Enviar hash</button> : '' }
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          { isConnected ?
            miners.map((miner, index) => <div key={index}>{miner.id} {miner.name}</div>)
            :
            ''
          }
        </div>
      </main>
    </div>
  );
}