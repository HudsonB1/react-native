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
        marginTop: 48
    },

    eventDate: {
        color: '#6b6b6b',
        fontSize: 16,
        padding: 10,
        paddingLeft: 0
    },
    form:{
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
    buttonText: {
        color: '#FFF',
        fontSize: 25
    },
    button: {
        height:46,
        width: 46,
        borderRadius: 10,
        backgroundColor: '#102536',
        alignItems: 'center',
        justifyContent: 'center'
    }
});