import { useLocation } from 'react-router-dom';
import BlockNavigator from '../components/BlockNavigator';
import DenseAppBar from '../components/Navbar';

function Block() {
    const location = useLocation();
    const block = location.state;

    return (
        <>
            <DenseAppBar />
            <BlockNavigator block={block}/>
        </>
    )
}

export default Block