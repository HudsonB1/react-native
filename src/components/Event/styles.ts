import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#696969',
        margin: 4,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 31
    },
    eventName: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRemove: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 31,
        width: 31,
        borderRadius: 5
    }
});