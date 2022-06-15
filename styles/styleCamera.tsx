import { Dimensions, StyleSheet } from 'react-native';

const styleCamera = StyleSheet.create({
    camera: {
        flex: 6, // TO-DO: check if suits iOS
        width: Dimensions.get('screen').width,
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