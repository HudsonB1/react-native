import { StatusBar } from 'expo-status-bar';
import { Home } from '../screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function index() {
    return (
        
        <SafeAreaView style={{flex: 1, backgroundColor: '#131016' }}>
            <StatusBar style='light'/>
            <Home />
        </SafeAreaView>
    );
}
