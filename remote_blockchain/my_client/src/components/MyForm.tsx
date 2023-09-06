import React, { useState } from 'react';
import { socket } from '../socket';

interface Props {
  handleConnection(): void;
}

export function MyForm({handleConnection}: Props) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log('set value', value)
    handleConnection(value);
    // socket.timeout(5000).emit('foo', value, (err, response) => {
    //   if(err) {
    //     setIsLoading(false);
    //   } else {
    //     console.log('response foo emit, 5000 timeout', response)
    //   }
    // });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}