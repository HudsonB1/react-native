import { Stack } from 'expo-router';

export default function TabRoutesLayout() {
    return (
        <>

            <Stack screenOptions={{ headerShown: false }}>

                <Stack.Screen
                    name='index'
                    options={{
                        title: 'Início'
                    }}
                />

                <Stack.Screen
                    name='eventScreen/[id]'
                    options={{
                        title: 'Perfil'
                    }}
                />
            </Stack>
        </>
    )
}