import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131016',
        padding: 24
    },

    eventName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    //Via GPT
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
    alterButton:{
        backgroundColor: '#30914a',
        width: 70,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
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

    eventDate: {
        color: '#6b6b6b',
        fontSize: 16,
        padding: 10,
        paddingLeft: 0
    },
    viewDate: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    
    form: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10
    },
    input: {
        height: 46,
        flex: 1,
        marginRight: 5,
        backgroundColor: '#1f1e25',
        borderRadius: 6,
        color: '#fff',
        paddingLeft: 16,
        fontSize: 20
    },
    button: {
        height: 46,
        width: 46,
        borderRadius: 10,
        backgroundColor: '#102536',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ListEmptyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20
    }
});