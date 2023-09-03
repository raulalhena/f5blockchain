import { Box, Typography, Container } from '@mui/material';
import NavigateBack from './NavigateBack';

function TransactionNavigator(props) {
    const transaction = props.transaction;
  return (
     <main style={{ height: '100vh', border: '1px solid green'}}>
     <Container sx={{ marginTop: '40px', padding: '20px', maxWidth: '100vw', maxHeight: '100vh', border: '1px solid orange' }} element='main'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Transacción: {transaction.hash}</h2>
            <NavigateBack />
        </Box>
     <Box>
        <Typography><strong>From Address: </strong>{transaction.fromAddress}</Typography>
        <Typography><strong>To Address: </strong>{transaction.toAddress}</Typography>
        <Typography><strong>Signature: </strong>{transaction.signature}</Typography>
        <Typography><strong>Amount: </strong>{transaction.amount}</Typography>
     </Box>
     </Container>
    </main>
  )
}

export default TransactionNavigator