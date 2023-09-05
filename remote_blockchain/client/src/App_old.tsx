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
  const [myMinerId, setMyMinerId] = useState();

  function join() {
    socket.emit('minerJoined', {
      name: value,
      id: socket.id,
      balance: 0
    });
  }

  function connect() {
    console.log('connect')
    socket.connect();
  }

  function disconnect() {
    setIsConnected(false);
    setIsJoined(false);
    socket.emit('disconnected');
  }

  function removeMiner(minerdDisconected) {
    console.log('miner to remove disconn', minerdDisconected)
    console.log('fil miners arr', miners);
    const filMiners = miners.filter(miner => {
     
      if(miner.id !== minerdDisconected.id){
        console.log('miner id', miner.id);
        return miner;
      }
    });
    console.log('fil miners', filMiners);
    setMiners(
      filMiners
    );
  }

  useEffect(() => {

  },[disconnect]);

  useEffect(() => {
    console.log('miners top useEffect', miners);

    function onConnect () {
      console.log('on connect')
      setIsConnected(connected => true);
      setMyMinerId(id => socket.id);
    }

    function onWelcome(miners) {
      setMiners(miners);
    }

    function onDisconnected() {
      setIsConnected(false);
      setIsJoined(false);
      socket.close();
    }

    const onMinerJoined = (newMiner) => {
      if(newMiner.id === myMinerId) {
        setIsJoined(true);
      }

      console.log('miners before set', miners);
      setMiners(miners => [
          ...miners, {
          name: newMiner.name,
          id: newMiner.id,
          balance: newMiner.balance
        }
      ]);
      console.log('miners in joined', miners)
    }

    const onMinerOut = (minerDisconnected) => {
      removeMiner(minerDisconnected);
    }
    
    socket.on('connect', onConnect);
    socket.once('welcome', onWelcome);
    socket.on('disconnected', onDisconnected);
    socket.on('minerJoined',onMinerJoined);
    socket.on('minerOut', onMinerOut);

    return () => {
      socket.off('connect', onConnect);
      socket.off('minerJoined', onMinerJoined);
      socket.off('welcome', onWelcome);
      socket.off('disconnected', onDisconnected);
      socket.off('minerOut', onMinerOut);
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