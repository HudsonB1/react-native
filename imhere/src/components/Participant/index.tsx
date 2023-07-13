import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export function Participant() {
    return (
        <>
            <View style={styles.container}>
                <Text style={{fontSize: 16,
        padding: 5,
        height: 30,
        backgroundColor: '#696969',
        flex: 1,
        marginRight: 5,
        color: '#fff',
        borderRadius: 6,}}>
                    Hudson Baroni
                </Text>
                <TouchableOpacity style={styles.buttonRemove}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}