import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
    // const [participants, setParticipants] = useState<String[]>([]);
    const participants = ['hudson', 'caio', 'matheus',''];

    function handleParticipantAdd(name: String) {
        // return setParticipants([...participants, name])
        return 'ok';
    }

    function handleParticipantRemove(name: String) {
        return console.log(`Participante ${name} removido`);
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
                    onPress={() => handleParticipantAdd(`hudson`)}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
            data={participants}
            keyExtractor={item => item}
            renderItem={({item}) => (
                <Participant 
                name={item}
                key={item}
                onRemove={() => handleParticipantRemove('hudson')}
                />
            ) }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.ListEmptyText}>
                    Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                </Text>
            )}
            />

        </View>
    );
}