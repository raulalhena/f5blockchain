import {useState} from 'react'
import DenseAppBar from '../components/Navbar'
import { Box, Typography } from '@mui/material'


const connectionButton = {
  width: '200px', 
  height: '50px', 
  fontSize: '20px', 
  color: '#fff', 
  backgroundColor: 'purple', 
  borderRadius: '5px' 
}

function Dapps() {
  const [wallet, setWallet] = useState();

  const requestAccount = async () => {
    if(window.ethereum) {
      console.log('detected');
      try{
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWallet(accounts)
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('Metamask not detected')
    }
  }

  return (
    <>
      <DenseAppBar />
      <main style={{ height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', border: '1px solid blue' }} >
          <button style={connectionButton} onClick={requestAccount}>Connect Wallet</button>
          <Typography sx={{ fontSize: '30px' }}><strong>Wallet:</strong></Typography>
          <Typography sx={{ fontSize: '25px' }}>{wallet}</Typography>
        </Box>
      </main>
    </>
  )
}

export default Dapps