import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';


export default function TabRoutesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            
            <Stack.Screen
                name='index'
                options={{
                    title: 'Início'
                }}
            />

            <Stack.Screen
                name='eventScreen'
                options={{
                    title: 'Perfil'
                }}
            />
        </Stack>
    )
}