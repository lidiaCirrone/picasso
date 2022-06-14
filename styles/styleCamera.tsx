import { StyleSheet } from 'react-native';

const styleCamera = StyleSheet.create({
    camera: {
        flex: 8, // TO-DO: check if suits iOS
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    buttonCamera: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})

export default styleCamera;