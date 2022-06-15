import { Dimensions, StyleSheet } from 'react-native';

const styleCamera = StyleSheet.create({
   camera: {
      flex: 6,
      width: Dimensions.get('screen').width
   },
   buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      marginLeft: 20,
      marginBottom: 20
   },
   buttonCamera: {
      flex: 0,
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
      marginRight: 20
   },
   text: {
      fontSize: 18,
      color: 'white'
   }
})

export default styleCamera;