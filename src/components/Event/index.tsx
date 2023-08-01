import { Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { Link } from "expo-router";

type Props = {
    name: String,
    onRemove: () => void;
}

export function Event({ name, onRemove }: Props) {
    return (
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.container}>
                    <Text style={styles.eventName}>{name}</Text>
                    <Link href={{
                        pathname: '/eventScreen/[id]',
                        params: {id: name}
                    }}>
                        <Feather name="arrow-right" size={20} color='#fff' />
                    </Link>
                </View>
                <TouchableOpacity onPress={onRemove} style={styles.buttonRemove}>
                    <Feather name="x" size={20} color='#fff' />
                </TouchableOpacity>
            </View>
        </>
    );
}