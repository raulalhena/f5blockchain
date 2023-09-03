import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {TableContainer} from '@mui/material';
import {Table} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableRow} from '@mui/material';
import {Paper} from '@mui/material';
import NavigateBack  from './NavigateBack';

function BlockNavigator(props) {
    const block = props.block;
  return (
     <main style={{ height: '100vh' }}>
        <Container sx={{ marginTop: '40px', padding: '20px', maxWidth: '100vw', maxHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Bloque:</h2>
                <NavigateBack />
            </Box>
            <Box>
                <Typography><strong>Timestamp: </strong>{block.timestamp}</Typography>
                <Typography><strong>Previous Hash: </strong>{block.previousHash}</Typography>
                <Typography><strong>Nonce: </strong>{block.nonce}</Typography>
                {
                    typeof block.transactions !== 'object' ? <Typography><strong>Genesis Data: </strong>{block.transactions}</Typography> : null
                }
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                <h2>Transacciones:</h2>
                <Button onClick={ () => window.location.replace('') }><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="block table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell align="center">From Address</TableCell>
                        <TableCell align="center">To Address</TableCell>
                        <TableCell align="center">Amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {typeof block.transactions === 'object' ?
                        block.transactions.map((tx, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography><Link to='/transaction' state={tx}>{`${tx.hash.substring(0, 4)}...${tx.hash.substr(tx.hash.length - 4)}`}</Link></Typography>
                                </TableCell>
                                <TableCell align="center">{`${tx.fromAddress.substring(0, 4)}...${tx.fromAddress.substr(tx.fromAddress.length - 4)}`}</TableCell>
                                <TableCell align="center">{`${tx.toAddress.substring(0, 4)}...${tx.toAddress.substr(tx.toAddress.length - 4)}`}</TableCell>
                                <TableCell align="center">{tx.amount}</TableCell>
                            </TableRow>
                        ))
                    :
                        
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Typography>&nbsp;</Typography>
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </main>
  )
}

export default BlockNavigator