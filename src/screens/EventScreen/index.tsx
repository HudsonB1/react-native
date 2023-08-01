import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link, useLocalSearchParams } from 'expo-router';

const SERVER_URL = 'http://192.168.3.101:3030';

export default function EventScreen() {
    const [participants, setParticipants] = useState<String[]>([]);
    const [participantName, setParticipantName] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('Nome do evento');
    const [alterEventName, setAlterEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const id = useLocalSearchParams<{
        id: string
    }>().id ?? '';
    const [params, setParams] = useState<String>(decodeURIComponent(id));

    useEffect(() => {
        renderEvent();
    }, [params]);

    async function renderEvent() {
        const response = await fetch(`${SERVER_URL}/eventos`);
        const data = await response.json();

        const name = data.filter((nome: any) => nome.nome == params)[0].nome;
        const date = new Date(data.filter((nome: any) => nome.nome == params)[0].data);

        setEventName(name);
        setSelectedDate(date);
    }

    useEffect(() => {
        fetchParticipantes();
    }, [participantName]);

    async function fetchParticipantes() {
        const response = await fetch(`${SERVER_URL}/participantes`);
        const data = await response.json();
        setParticipants(data.filter((evento: any) => evento.evento == params).map((nome: any) => nome.nome));
        console.log(participants);
    }

    function handleParticipantAdd(name: String) {
        // if (participants.includes(name)) {
        //     return Alert.alert('Participante já existente.', 'Já existe um participante na lista com esse nome!');
        // }

        const newParticipant = {
            evento: params,
            nome: name,
        };

        fetch(`${SERVER_URL}/adicionar-participante`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParticipant),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Resposta do servidor após a criação do evento
                // Faça qualquer ação necessária com a resposta do servidor
            })
            .catch((error) => {
                console.error(error);
            });

        // setParticipants([...participants, name]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: String) {
        Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => (
                    fetch(`${SERVER_URL}/deletar-participante`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nome: name })
                    })
                        .then(response => console.log(response + ' ok'))
                        .catch(error => error),
                        
                    setParticipants(participants.filter(participant => participant !== name))
                )
    },
    {
        text: 'Não',
            style: 'cancel'
    }
        ]);
}

const handleOpenPopup = () => {
    setIsPopupVisible(true);
};

const handleClosePopup = () => {
    if (alterEventName === '') {
        setIsPopupVisible(false);
    } else {
        handleNameEvent(eventName, alterEventName);
        setIsPopupVisible(false);
    }
};

const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
};

const handleCancel = () => {
    setDatePickerVisible(false);
};

const formattedDate = selectedDate
    ? format(selectedDate, "eeee, d 'de' MMMM 'de' yyyy", { locale: ptBR })
    : '';


function handleNameEvent(oldName: String, newName: String) {
    const names = {
        nomeAntigo: oldName,
        nomeNovo: newName
    }
    fetch(`${SERVER_URL}/alterar-nome-evento`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(names)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setParams(newName);
        })
        .catch((error) => {
            console.error(error);
        });

}

return (
    <>
        <View style={styles.container}>
            <Link href='/'>
                <Feather name="arrow-left" size={18} color='#FFF' />
            </Link>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <Text style={styles.eventName}>
                    {eventName}
                </Text>
                <TouchableOpacity onPress={handleOpenPopup}>
                    <Feather name="edit" size={18} color='#FFF' />
                </TouchableOpacity>
                <Modal visible={isPopupVisible} onRequestClose={handleClosePopup} transparent >
                    <View style={styles.blurBackground} />
                    <View style={styles.popup}>
                        {/* Conteúdo do popup aqui */}
                        <TextInput
                            style={styles.inputPopup}
                            value={alterEventName}
                            onChangeText={setAlterEventName}
                        />

                        {/* Botão para fechar o popup */}
                        <TouchableOpacity style={styles.alterButton} onPress={handleClosePopup}>
                            <Text style={{ color: '#FFF', fontSize: 16 }}>Alterar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            {/* Input Date - GPT */}
            {/* Input de data (date picker) */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="pt_BR"
                date={selectedDate || undefined}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <View style={styles.viewDate}>
                {/* Mostrar a data selecionada */}
                {selectedDate && (
                    <Text style={styles.eventDate}>{formattedDate}</Text>
                )}
                {/* Botão que abre o date picker */}
                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                    <Feather name="edit" size={18} color='#6b6b6b' />
                </TouchableOpacity>
            </View>

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
                    {/* <AddIcon style={styles.buttonText}/> */}
                    <Feather name="plus" size={24} color="white" />

                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                // keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        // key={item}
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
    </>
);
}