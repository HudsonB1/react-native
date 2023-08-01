import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Event } from '../../components/Event';

const SERVER_URL = 'http://192.168.3.101:3030';

export function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<String[]>([]);

    useEffect(() => {
        fetchNomes();
    }, [events]);

    async function fetchNomes() {
        const response = await fetch(`${SERVER_URL}/eventos`);
        const data = await response.json();
        setEvents(data.map((nome: any) => nome.nome));
    }

    function handleOpenPopup() {
        setIsPopupVisible(true);
    };

    function removeEvent(event: String) {
        Alert.alert('Remover', `Deseja remover o evento ${event}?`, [
            {
                text: 'Sim',
                onPress: () => (
                    fetch(`${SERVER_URL}/deletar-evento`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nome: event })
                    })
                        .then(response => console.log(response + ' ok'))
                        .catch(error => error)

                )
            },
            {
                text: 'Não'
            }
        ])
    }

    function handleCreateEvent(name: String) {
        const newEvent = {
            nome: name,
            data: new Date(),
        };

        fetch(`${SERVER_URL}/criar-evento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Resposta do servidor após a criação do evento
                // Faça qualquer ação necessária com a resposta do servidor
            })
            .catch((error) => {
                console.error(error);
            });
        setIsPopupVisible(false)
        setEventName('');
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.eventList}>
                    Lista de eventos
                </Text>
                <View style={styles.viewNewEvent}>
                    <Text style={styles.newEvent}> Novo evento </Text>
                    <TouchableOpacity onPress={handleOpenPopup} style={styles.buttonCreateEvent}>
                        <Feather name="plus" size={20} color='#fff' />
                    </TouchableOpacity>
                </View>

                {/* Popup*/}
                <Modal visible={isPopupVisible} onRequestClose={() => setIsPopupVisible(false)} transparent >
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
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsPopupVisible(false)}>
                                <Text style={{ color: '#FFF', fontSize: 16 }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.createButton} onPress={() => handleCreateEvent(eventName)}>
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