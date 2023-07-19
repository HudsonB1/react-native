import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
    const [participants, setParticipants] = useState<String[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd(name: String) {
        
        if (participants.includes(name)) {
            return Alert.alert('Participante já existente.', 'Já existe um participante na lista com esse nome!');
        }
        setParticipants([...participants, name]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: String) {
        Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => (
                    setParticipants(participants.filter(participant => participant !== name)),
                    Alert.alert('Removido', 'Participante removido!')
                )
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }


    return (
        <View style={styles.container}>
            <Text key='1' style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Segunda-feira, 10 de julho de 2023
            </Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor={'#6b6b6b'}
                    onChangeText={text => setParticipantName(text)}
                    value={participantName}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleParticipantAdd(participantName)}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        key={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
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