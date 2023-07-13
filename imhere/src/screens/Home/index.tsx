import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';

export function Home() {

    function handleParticipantAdd() {
        return console.log('Participante adicionado');
    }


    return (
        <View style={styles.container}>
            <Text key="1" style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Segunda-feira, 10 de julho de 2023
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor={"#6b6b6b"}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <Participant />
            <Participant />
            <Participant />

        </View>
    );
}