import React, { useState, useEffect } from 'react';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from './components/Events';
import { MyForm } from './components/MyForm';
import Miners from './components/Miners';
import Miner from './interfaces/Miner';
import { connect } from 'socket.io-client';
import { io } from 'socket.io-client';
import Block from '../utils/Block';

// Datos fake para simular los datos de la instacia de la clase Block para minar
const transactions: unknown = [
  {
      fromAddress: '4k3ljk484kjl3kllll334552134324234234234',
      toAddress: '9993llahuernzmcxcvb23b3l39xm783192389',
      amount: 100
  },
  {
      fromAddress: '4k3ljk484kjl3kllll334552134324234234234',
      toAddress: '9993llahuernzmcxcvb23b3l39xm783192389',
      amount: 100
  },
];

const previousHash: string = '4k3ljk484kjl3kllll334552134324234234234';

// Componente Room
export default function Room() {
  const [socket, setSocket] = useState();
  const [username, setUsername] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [miners, setMiners] = useState([]);
  const [myId, setMyId] = useState();
  const [isMining, setIsMining] = useState(false);

  const connect = () => {
    setSocket(io('http://localhost:3000'));
  }

  const disconnect = () => {
    if(socket) {
      socket.emit('minerOut');
    }
  }

  const joinToMine = () => {
    if(socket) socket.emit('joinToMine', {name: username, id: socket.id, rewards: 0});
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
        console.log(socket.id);
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
            id: newMiner.id,
            rewards: newMiner.rewards
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

      const onStartMining = async (data) => {
        setIsMining(true);
        const block = new Block(data.timestamp, data.transactions, data.previousHash, data.difficulty);
        const hash = await block.mineBlock();
        if(hash) {
          console.log('Hash encontrado: ', hash);
          socket.emit('hashFound');
        } else {
          console.log('Hash undefined, something went wrong..');
        }
        setIsMining(false);
      }

      const onHashFound = (updatedMiners) => {
        setMiners(updatedMiners);
      }
  
      socket.on('connect', onConnect);
      socket.on('welcome', onWelcome);
      socket.on('minerOut', onMinerOut);
      socket.on('joinedToMine', onJoinedToMine);
      socket.on('getMiners', onGetMiners);
      socket.on('startMining', onStartMining);
      socket.on('hashFound', onHashFound);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('welcome', onWelcome);
      }
    }
  }, [socket, setSocket])

  return (
    <div>
      <main style={{ heigh: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <div>Estado: { isConnected ? 'Conectado' : 'Desconectado' }</div>
        <input style={{ width: '200px', height: '25px'}} onChange={ e => setUsername(e.target.value) } placeholder='Nombre de usuario...' />
        { isConnected ? <button onClick={joinToMine}>Unirme al minado</button> : '' }        
          {
            isMining ? <div>Mining....I HOPE TO GET LUCKY!! ;D </div> : ''
          }        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          { isConnected ?
            miners.map((miner, index) => <div key={index}>{miner.id} {miner.name} {miner.rewards}</div>)
            :
            ''
          }
        </div>
      </main>
    </div>
  );
}