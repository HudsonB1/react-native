import { Home } from '../../screens/HomeScreen';
import { StatusBar } from 'react-native';

export default function index() {
    return (
        <>
            <StatusBar translucent/>
            <Home />
        </>
    );
}
