import React, { useEffect, useState } from 'react'
import { Box,Button,Container,Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import {TableContainer} from '@mui/material';
import {Table} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableRow} from '@mui/material';
import {Paper} from '@mui/material';

interface Block {
    index: number;
    timestamp: string;
    data: object;
    previousHash: string;
    hash: string;
}

function ExplorerNavigator() {

    const [blocks, setBlocks] = useState<Array<Block>>([]);

    const getAllBlocks = async () => {
        const response = await fetch('http://localhost:4000/api/blocks');
        const data = await response.json();
        setBlocks(data);
    }

    useEffect(() => {
        getAllBlocks();
    }, []);

  return (
    <main style={{ height: '100vh' }}>
      <Container sx={{ marginTop: '40px', padding: '40px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Bloques:</h2>
          <Button onClick={ () => window.location.replace('') }><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="blocks table">
            <TableHead>
              <TableRow>
                <TableCell>Hash</TableCell>
                <TableCell align="right">Miner</TableCell>
                <TableCell align="right">Num. Tx</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blocks.map((block, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography><Link to='/block' state={block}>{block.hash}</Link></Typography>
                  </TableCell>
                  <TableCell align="right"> - </TableCell>
                  <TableCell align="right">{typeof block.transactions === 'object' ? block.transactions.length : 0 }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
    </main>
  )
}

export default ExplorerNavigator