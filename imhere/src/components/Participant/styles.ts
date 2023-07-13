import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        color: '#fff'
    },
    name: {
        fontSize: 16,
        padding: 5,
        height: 30,
        backgroundColor: '#696969',
        flex: 1,
        opacity: 0.7,
        marginRight: 5,
        color: '#fff',
        borderRadius: 6,
    },
    buttonRemove: {
        backgroundColor: '#8B0000',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        borderRadius: 4,
    }
});