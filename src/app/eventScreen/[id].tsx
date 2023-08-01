import EventScreen from "../../screens/EventScreen";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function eventScreen() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#131016' }}>

            <EventScreen />
        </SafeAreaView>
    );
}