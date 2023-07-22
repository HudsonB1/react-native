import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

type Props = {
    name: String;
    onRemove: () => void;
}

export function Participant({ name, onRemove }: Props) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text style={{ color: '#FFF' }}>
                        {name}
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonRemove} onPress={onRemove}>
                    <Feather  name="x" size={22} color="white" />
                </TouchableOpacity>
            </View>
        </>
    )
}