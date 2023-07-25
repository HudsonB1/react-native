import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Event } from '../../components/Event';


export function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<String[]>([]);

    function handleOpenPopup() {
        setIsPopupVisible(true);
    };

    function handleClosePopup(event: String) {
        if (event === '') {
            setIsPopupVisible(false);
        } else {
            setEvents([...events, event]);
            setIsPopupVisible(false);
        }
        setEventName('');
    };

    function removeEvent(event: String) {
        Alert.alert('Remover', `Deseja remover o evento ${event}?`, [
            {
                text: 'Sim',
                onPress: () => (
                    setEvents(events.filter((e) => e !== event))
                )
            },
            {
                text: 'Não'
            }
        ])
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.eventList}>
                    Lista de eventos
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.newEvent}> Novo evento </Text>
                    <TouchableOpacity onPress={handleOpenPopup} style={styles.buttonCreateEvent}>
                        <Feather name="plus" size={20} color='#fff' />
                    </TouchableOpacity>
                </View>

                {/* Popup*/}
                <Modal visible={isPopupVisible} onRequestClose={() => handleClosePopup('')} transparent >
                    <View style={styles.blurBackground} />

                    <View style={styles.popup}>
                        {/* Conteúdo do popup aqui */}
                        <Text style={styles.nameEvent}>Nome do evento</Text>
                        <TextInput
                            style={styles.inputPopup}
                            onChangeText={setEventName}
                        />

                        {/* Botão para fechar o popup */}
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => handleClosePopup('')}>
                                <Text style={{ color: '#FFF', fontSize: 16 }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.createButton} onPress={() => handleClosePopup(eventName)}>
                                <Text style={{ color: '#FFF', fontSize: 16 }}>Criar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <FlatList
                    data={events}
                    // keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Event name={item} onRemove={() => removeEvent(item)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.ListEmptyText}>
                            Não há eventos ainda? Crie um agora!
                        </Text>
                    )}
                />

            </View>
        </>
    )
}