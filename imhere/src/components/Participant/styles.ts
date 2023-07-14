import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        color: '#fff'
    },
    name: {
        fontSize: 20,
        paddingLeft: 15,
        height: 38,
        backgroundColor: '#696969',
        flex: 1,
        opacity: 0.7,
        marginRight: 5,
        borderRadius: 4,
        justifyContent:'center'
    },
    buttonRemove: {
        backgroundColor: '#8B0000',
        height: 38,
        width: 38,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        borderRadius: 4
    }
});