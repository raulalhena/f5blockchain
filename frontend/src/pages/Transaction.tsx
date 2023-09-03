import { useLocation } from 'react-router-dom';
import DenseAppBar from '../components/Navbar';
import TransactionNavigator from '../components/TransactionNavigator';

function Transaction() {
    const location = useLocation();
    const transaction = location.state;

    return (
        <>
            <DenseAppBar />
            <TransactionNavigator transaction={transaction}/>
        </>
    )
}

export default Transaction