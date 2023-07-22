import { View, Text, StatusBar } from 'react-native';
import { Link } from 'expo-router';

export function Home() {
    return (
        <>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 44, fontWeight: '700' }}>
                    Home Pinto
                </Text>
                <Link href='/eventScreen'> EventScreen </Link>
            </View>
        </>
    )
}