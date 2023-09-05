import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';
import { MyForm } from './components/MyForm';
import Miners from './components/Miners';
import Miner from './interfaces/Miner';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [miners, setMiners] = useState([]);
  const [value, setValue] = useState('');
  const [isWelcomed, setIsWelcomed] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  function join() {
    socket.emit('minerJoined', {
      name: value,
      id: socket.id,
      balance: 0
    });
  }

  function connect() {
    socket.connect();
    setIsConnected(true);
  }

  function disconnect() {
    socket.emit('disconnected');
  }

  useEffect(() => {

  },[disconnect]);

  useEffect(() => {
    function onConnect () {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setIsJoined(false);
    }

    function onWelcome(miners) {
      setMiners(miners);
      setIsConnected(true);
    }

    function onDisconnected() {
      setMiners([]);
      setIsConnected(false);
      setIsJoined(false);
    }

    const onMinerJoined = (newMiner) => {
      setIsJoined(true);
      console.log('miners', miners)
      console.log('new miner', newMiner)
      setMiners(miners => [...miners, newMiner]);
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.once('welcome', onWelcome);
    socket.on('minerJoined',onMinerJoined);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('minerJoined', onMinerJoined);
      socket.off('welcome', onWelcome);
      socket.off('disconnected', onDisconnected);
    };
  }, []);

  return (
    <div className="App">
      <main style={{ heigh: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <ConnectionState isConnected={ isConnected } />
        
        <div hidden={isWelcomed} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
          <input style={{ width: '200px', height: '25px'}} onChange={ e => setValue(e.target.value) } placeholder='Nombre de usuario...' />
          {
            !isConnected ?
              <button onClick={connect} style={{ width: '200px', height: '25px'}}>Conectar</button>
            :
              <button onClick={disconnect} style={{ width: '200px', height: '25px'}}>Desconectar</button>
          }
          {
            isJoined ?
              ''
              :
              <button onClick={join} style={{ width: '200px', height: '25px'}}>Unirse a la red</button>
              
          }
        </div>
        <div>Miners:</div>
        <div>
          <ul>
        { 
            miners && 
            miners.map((miner, index) => <li key={index}>{miner.id + ' ' + miner.name}</li>) 
        }
        </ul>
        </div>
      </main>
    </div>
  );
}