import React from 'react'
import DenseAppBar from '../components/Navbar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper } from '@mui/material'
import { CopyBlock, dracula } from "react-code-blocks";
import f5scoinABI from '../../abis/f5scoin.json'

const f5scoinContractSolidity = `pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";                           

contract F5SCoin is ERC20 {
    constructor() ERC20("F5SCoin", "F5SC") {
        _mint(msg.sender, 21000000 * 10 ** 18);
    }
}`;

function SmartContracts() {
  return (
    <>
      <DenseAppBar />
      <main style={{ height: '100vh', border: '1px solid red' }}>
        <Box component="section" sx={{  display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <TableContainer comopnent={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="block table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' sx={{ fontSize: '20px'}}><strong>Dirección del contrato de F5SCoin (F5SC) en red de test Seporia</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center' sx={{ fontSize: '20px'}}><a href='https://sepolia.etherscan.io/address/0xDB441A802Bab201f1265CAbb89D38537D9507884' target="_blank">0xDB441A802Bab201f1265CAbb89D38537D9507884</a></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center' sx={{ fontSize: '20px'}}><a href='https://remix.ethereum.org' target="_blank">REMIX Editor Online de Solidity</a></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center' sx={{ fontSize: '20px'}}><a href=' https://github.com/OpenZeppelin/openzeppelin-contracts/blob/audit/wip/2a-2b/contracts/token/ERC20/ERC20.sol' target="_blank">Contrato del estandard token ERC20 de Ethereum (Openzeppelin)</a></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, verticalAlign: 'baseline' }} aria-label="block table">
              <TableHead>
                <TableRow >
                  <TableCell align='center' sx={{ fontSize: '20px'}}>
                    <strong>Código Solidity</strong>
                  </TableCell>
                  <TableCell align='center' sx={{ fontSize: '20px'}}>
                    <strong>ABI</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ gap: '0'}}>
                <TableRow >
                  <TableCell align='left' sx={{ fontSize: '20px', paddingTop: '16px', justifyContent: 'center', backgroundColor:'#fff', margin: '0', display: 'flex', alignItems: 'initial'}}>
                    <CopyBlock sx={{ }}
                      text={f5scoinContractSolidity} 
                      language="solidity"
                      showLineNumbers={true}
                      theme={dracula}
                      codeBlock
                      />
                  </TableCell>
                  <TableCell align='left' sx={{ fontSize: '20px', width: '80%'}}>
                    <CopyBlock 
                      text={JSON.stringify(f5scoinABI, null, 4)} 
                      language="json"
                      showLineNumbers={true}
                      theme={dracula}
                      />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>
    </>
  )
}

export default SmartContracts