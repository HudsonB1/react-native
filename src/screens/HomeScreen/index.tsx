import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Event } from '../../components/Event';



// const SERVER_URL = 'http://localhost:3000'; // Substitua pela URL do seu servidor local

export function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState<String[]>([]);

    useEffect(() => {
        fetchNomes();
    }, [events]);

    async function fetchNomes() {
        const response = await fetch('http://192.168.3.101:3030/nome-eventos');
        const data = await response.json();

        setEvents(data.map((nome: any) => nome.nome));
    }

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

    function handleCreateEvent() {
        const newEvent = {
            nome: 'teste',
            data: new Date(),
        };

        fetch(`http://192.168.3.101:3030/criar-evento`, {
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
    };

    async function getEvents() {
        try {
            // Make a request to the server.
            const data = await fetch('http://192.168.3.101:3030/eventos');

            // Handle the successful response.
            const json = await data.json();
            return json;
        } catch (error) {
            // Handle the error response.
            console.log('There has been a problem with your fetch operation: ' + error);
            throw error; // Lança o erro novamente para que o chamador possa lidar com ele, se necessário.
        }
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

                <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                    <Text style={{ color: '#FFF', fontSize: 16 }}>Criar</Text>
                </TouchableOpacity>
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