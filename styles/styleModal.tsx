import { Dimensions, StyleSheet } from 'react-native';

const styleModal = StyleSheet.create({
    centeredView: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        marginVertical: Dimensions.get('screen').height / 2 - 100,
        marginHorizontal: 20,
        backgroundColor: '#000',
        borderRadius: 20,
        paddingVertical: 20,
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: '#007AFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#007AFF',
    },
    container: {
        flex: 1,
    },
    
})

export default styleModal