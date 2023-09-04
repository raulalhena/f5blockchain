import React, { useState, useEffect } from 'react'
import DenseAppBar from '../components/Navbar'
import { Box, Typography } from '@mui/material'
import {TableContainer} from '@mui/material';
import {Table} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableRow} from '@mui/material';
import {Paper} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ethers } from 'ethers'
import ContractInfo from '../interfaces/ContractInfo';
import BalanceInfo from '../interfaces/BalanceInfo';
import f5scoinABI from '../../abis/f5scoin.json'

console.log('ABI', f5scoinABI)

const getContractButton = {
  width: '200px', 
  height: '50px', 
  fontSize: '20px', 
  color: '#fff', 
  backgroundColor: 'purple', 
  borderRadius: '5px' 
}

const contractInput = {
  width: '400px', 
  height: '50px', 
  fontSize: '20px', 
  color: '#555',
  borderRadius: '5px'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dapps() {

  const [contractInfo, setContractInfo] = useState<ContractInfo>({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  });
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>({
    address: "-",
    balance: "-"
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    severity: '',
    text: ''
  });

  const showMessage = (message) => {
    setMessage(message)
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Conectamos a Metamask con el objeto que inyecta la propia Metamask
  const checkMetamask = async () => {
    if(window.ethereum) {
      showMessage({ severity: 'success', text: 'Metamask detectado! :)' });
    } else {
      showMessage({ severity: 'error', text: 'Metmask no detectado. Instalalo! :)' });
    }
  }

  // Connectamos usando la libreria ethersjs
  const connectWallet = async () => {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    }
  }

  const getBalance = async () => {
    const provider = await connectWallet();
    await provider.send('eth_requestAccounts', []);
    const f5scoin = new ethers.Contract(contractInfo.address, f5scoinABI, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = String(await f5scoin.balanceOf(signerAddress));

    setBalanceInfo({
      address: signerAddress,
      balance
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = await connectWallet();
    const f5scoin = new ethers.Contract(data.get('address'), f5scoinABI, provider);

    const tokenName = await f5scoin.name();
    const tokenSymbol = await f5scoin.symbol();
    const totalSupply = String(await f5scoin.totalSupply());

    setContractInfo({
      address: data.get('address'),
      tokenName,
      tokenSymbol,
      totalSupply
    });
  }

  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = await connectWallet();
    const f5scoin = new ethers.Contract(contractInfo.address, f5scoinABI, provider);
    const signer = await provider.getSigner();
    const contractSigner = await f5scoin.connect(signer);
    await contractSigner.transfer(data.get('toAddress'), ethers.parseUnits(data.get('amount'), 'ether'));
  }

  useEffect(() => {
    checkMetamask();
  },[]);

  return (
    <>
      <DenseAppBar />
      <main style={{ height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }} >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', justifyContent: 'center', alignItems: 'center' }}>
            <input style={contractInput} type='text' name='address' placeholder='ERC20 Contract address...' />
            <button style={getContractButton} type='submit'>Información del contrato</button>
          </form>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="block table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Símbolo</TableCell>
                    <TableCell align="center">Suministro Total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align='center'>
                        <Typography sx={{ fontSize: '20px' }}>{contractInfo.tokenName}</Typography>
                      </TableCell>
                      <TableCell align="center">
                          <Typography sx={{ fontSize: '20px' }}>{contractInfo.tokenSymbol}</Typography>
                      </TableCell>
                      <TableCell align="center">
                      <Typography sx={{ fontSize: '20px' }}>{contractInfo.totalSupply}</Typography>  
                      </TableCell>        
                  </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }} >
            <button style={getContractButton} onClick={getBalance}>Obtener mi saldo</button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="block table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Dirección</TableCell>
                    <TableCell align="center">Balance</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align='center'>
                        <Typography sx={{ fontSize: '20px' }}>{balanceInfo.address}</Typography>
                      </TableCell>
                      <TableCell align="center">
                          <Typography sx={{ fontSize: '20px' }}>{balanceInfo.balance}</Typography>
                      </TableCell>    
                  </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }} >
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '25px', justifyContent: 'center', alignItems: 'center' }}>
            <input style={contractInput} type='text' name='toAddress' placeholder='Dirección wallet a transferir tokens...' />
            <input style={contractInput} type='text' name='amount' placeholder='Cantidad de tokens a enviar...' />
            <button style={getContractButton} type='submit'>Transferir</button>
          </form>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
      </main>
    </>
  )
}

export default Dapps