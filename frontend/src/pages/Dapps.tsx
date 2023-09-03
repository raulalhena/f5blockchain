import { useState } from 'react'
import DenseAppBar from '../components/Navbar'
import { Box, Typography } from '@mui/material'
import { ethers } from 'ethers'
import f5scoinABI from '../../abis/f5scoin.json'

console.log('abi', f5scoinABI)

const connectionButton = {
  width: '200px', 
  height: '50px', 
  fontSize: '20px', 
  color: '#fff', 
  backgroundColor: 'purple', 
  borderRadius: '5px' 
}

interface ContractInfo {
  address: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
}

interface BalanceInfo {

}

function Dapps() {
  const [contractListened, setContractListened] = useState();
  const [wallet, setWallet] = useState();
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

  // Conectamos a Metamask con el objeto que inyecta la propia Metamask
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

  // Connectamos usando la libreria ethersjs
  const connectWallet = async () => {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log('address', await signer.getAddress());
      return provider;
    }
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
    console.log('contract info', contractInfo.totalSupply)
  }

  return (
    <>
      <DenseAppBar />
      <main style={{ height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', border: '1px solid blue' }} >
          <form onSubmit={handleSubmit}>
            <input type='text' name='address' placeholder='ERC20 Contract address...' />
            <button type='submit'>Get contract</button>
          </form>
          <Typography sx={{ fontSize: '30px' }}><strong>Name:</strong>{contractInfo.tokenName}</Typography>
          <Typography sx={{ fontSize: '30px' }}><strong>Symbol:</strong>{contractInfo.tokenSymbol}</Typography>
          <Typography sx={{ fontSize: '30px' }}><strong>Total Supply:</strong>{contractInfo.totalSupply}</Typography>
          {/* <button style={connectionButton} onClick={connectWallet}>Connect Wallet</button>
          <Typography sx={{ fontSize: '30px' }}><strong>Wallet:</strong></Typography>
          <Typography sx={{ fontSize: '25px' }}>{wallet}</Typography> */}
        </Box>
      </main>
    </>
  )
}

export default Dapps