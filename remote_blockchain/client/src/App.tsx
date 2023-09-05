import React, { useState, useEffect } from 'react';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';
import { MyForm } from './components/MyForm';
import Miners from './components/Miners';
import Miner from './interfaces/Miner';
import { connect } from 'socket.io-client';
import { io } from 'socket.io-client';

export default function App() {
  const [socket, setSocket] = useState();
  const [username, setUsername] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [miners, setMiners] = useState([]);

  const connect = () => {
    setSocket(io('http://localhost:3000'));
  }

  const disconnect = () => {
    if(socket) {
      socket.disconnect();
      setSocket();
    }
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
        console.log('on connect')
      }
  
      const onWelcome = (miners) => {
        console.log('welcome')
      }

      const onJoinedToMine = (newMiner) => {
        console.log('joined to mine')
        setMiners(m => [...m, {
            name: newMiner.name,
            id: newMiner.id
          }
        ]);
      }

      const onDisconnect = () => {
        setIsConnected(false);
      }
  
      socket.on('connect', onConnect);
      socket.on('welcome', onWelcome);
      socket.on('disconnect', onDisconnect);
      socket.on('joinedToMine', onJoinedToMine);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('welcome', onWelcome);
      }
    }
  }, [socket, setSocket])



  return (
    <div className="App">
      <main style={{ heigh: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <div>Estado: { isConnected ? 'Conectado' : 'Desconectado' }</div>
        <input style={{ width: '200px', height: '25px'}} onChange={ e => setUsername(e.target.value) } placeholder='Nombre de usuario...' />
        <button onClick={joinToMine}>Unirme al minado</button>
        <div>
          {
            miners.map(miner => `${miner.id} ${miner.name}`)
          }
        </div>
        {/* <ConnectionState isConnected={ isConnected } />
        
        <div hidden={isWelcomed} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
          <input style={{ width: '200px', height: '25px'}} onChange={ e => setUsername(e.target.value) } placeholder='Nombre de usuario...' />
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
        </div> */}
      </main>
    </div>
  );
}