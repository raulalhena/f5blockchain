import React, { useEffect, useState } from 'react'
import DenseAppBar from '../components/Navbar'
import { Box,Container,Typography } from '@mui/material';

interface Block {
    index: number;
    timestamp: string;
    data: object;
    previousHash: string;
    hash: string;
}

const card = {
    padding: '5px',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    border: '1px solid purple', 
    maxWidth: '30%' 
}

function Explorer() {

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
    <main style={{ height: '100vh', border: '1px solid green'}}>
        <DenseAppBar />
        <Container sx={{ marginTop: '40px', padding: '40px', maxWidth: '100vw', maxHeight: '100vh', border: '1px solid orange' }} element='main'>
        <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'center', border: '1px solid blue' }}>
            {
                blocks.map((block, index) => {
                    return(
                        <Box key={ index } sx={card}>
                            <Typography><strong>Index:</strong> {block.index}</Typography>
                            <Typography><strong>Timestamp:</strong> {block.timestamp}</Typography>
                            <Typography><strong>Transactions: </strong></Typography>
                                {
                                typeof block.transactions === 'object' ? 
                                    // Object.entries(block.data).map(entries => {
                                    //     return (<Typography sx={{ paddingLeft: '8px' }}>{`<strong>${entries[0]}:</strong>${entries[1]}`}</Typography>)
                                    // })
                                    block.transactions.map((tx, index) => {
                                        return (
                                            <Box key={index}>
                                                <Typography sx={{ paddingLeft: '8px' }}><strong>From Address:</strong>{tx.fromAddress}</Typography>
                                                <Typography sx={{ paddingLeft: '8px' }}><strong>To Address:</strong>{tx.toAddress}</Typography>
                                                <Typography sx={{ paddingLeft: '8px' }}><strong>Amount:</strong>{tx.amount}</Typography>
                                                { tx.signature ?
                                                    <Typography sx={{ paddingLeft: '8px' }}><strong>Signature:</strong>{tx.signature}</Typography>
                                                :
                                                 <Typography sx={{ paddingLeft: '8px' }}><strong>Signature:</strong></Typography>
                                                }
                                            </Box>
                                        )
                                    })
                                : 
                                    <Typography sx={{ paddingLeft: '8px' }}>{block.transactions}</Typography>
                                }
                                
                            <Typography><strong>Previous Hash:</strong> {block.previousHash}</Typography>
                            <Typography><strong>Hash:</strong> {block.hash}</Typography>
                        </Box>
                    )
                })
            }
        </Box>
        </Container>
    </main>
  )
}

export default Explorer