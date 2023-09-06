import React from 'react';

export function ConnectionState({ isConnected }) {
  return <p>Estado: {isConnected ? 'Conectado' : 'Desconectado' }</p>;
}