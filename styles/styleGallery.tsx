import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create(
    {
        container: {
            backgroundColor: '#007AFF',
            flex: 1
        },
        flatlist: {
            padding: 10,
        },
        imageGallery: {
            width: Dimensions.get('screen').width / 3 -24, height: 150,marginRight :24,marginBottom:24
        }
    }
)