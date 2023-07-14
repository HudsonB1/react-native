import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type Props = {
    name: String;
    onRemove: () => void;
}

export function Participant({name, onRemove}: Props) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text style={{color: '#FFF'}}>
                        {name}
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonRemove} onPress={onRemove}>
                    <Text style={{color: '#FFF', fontSize: 27, padding: 0}}>-</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}