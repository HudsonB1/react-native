import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'expo-router';

export default function EventScreen() {
    const [participants, setParticipants] = useState<String[]>([]);
    const [participantName, setParticipantName] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('Nome do evento');
    const [alterEventName, setAlterEventName] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);


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
            setEventName(alterEventName);
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

    return (
        <View style={styles.container}>
            <Link href='/'>
                    <Feather name="arrow-left" size={18} color='#FFF'/>
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
    );
}