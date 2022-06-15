import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create(
   {
      imgBg: {
         flex: 1
      },
      container: {

         flexDirection: "row",
         justifyContent: 'space-around',
         alignItems: 'center',
         backgroundColor: '#000',
         borderBottomWidth : 1,
         borderTopWidth:1,
         borderBottomColor : '#fff',
         borderTopColor : '#fff',
      },
      btn: {
         marginVertical:20,
         width: Dimensions.get('screen').width / 3,
         backgroundColor: '#000',
      },
      centralBtn: {
         borderWidth: 2,
         borderRightColor: '#fff',
         borderLeftColor: '#fff'
      },
      textBtn: {
         color: '#007AFF',
         fontWeight: 'bold',
         textAlign: 'center'
      }
   }
)