import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    eventList: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10
    },
    viewNewEvent: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1f1e25',
        borderRadius: 5,
        height: 40
    },
    newEvent: {
        flex: 1,
        height: 30,
        width: 30,
        color: '#fff',
        fontSize: 19,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nameEvent: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonCreateEvent: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#102536',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    blurBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente mais escuro
    },
    popup: {
        color: '#FFF',
        width: 'auto',
        margin: 40,
        marginTop: 80,
        backgroundColor: '#131016',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 8,
        elevation: 5, // Sombra no Android //Via GPT
    },

    cancelButton: {
        backgroundColor: 'red',
        width: 80,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 8,
        marginLeft: 8
    },
    createButton: {
        backgroundColor: '#30914a',
        width: 80,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 8,
        marginLeft: 8
    },

    inputPopup: {
        height: 46,
        width: '100%',
        padding: 15,
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#1f1e25',
        borderRadius: 6,
        color: '#fff',
        fontSize: 16
    },
    ListEmptyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20
    }
});