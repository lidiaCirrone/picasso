import { Dimensions, StyleSheet } from 'react-native';

const styleModal = StyleSheet.create({
   centeredView: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
   },
   modalView: {
      marginTop: Dimensions.get('screen').height / 6 * 2,
      marginHorizontal: 20,
      backgroundColor: '#000',
      borderRadius: 20,
      padding: 50,
      width: Dimensions.get('screen').width - 40,
      height: Dimensions.get('screen').height / 6 * 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
      // shadowColor: '#000',
      // shadowOffset: {
      //    width: 0,
      //    height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.1)'
   },
   modalInnerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%'
   },
   button: {
      borderColor: '#007AFF', 
      borderWidth: 2, 
      padding: 8, 
      borderRadius: 6
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