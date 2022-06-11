import { Dimensions, StyleSheet } from 'react-native';

const styleCanvas = StyleSheet.create({
   container: {
      flex: 1,
      width: Dimensions.get('screen').width,
   },
   row: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 100,
      backgroundColor: 'black'
   },
   editColor: {
      flex: 1,
      padding: 20
   },
   editContainer: {
      backgroundColor: '#efefef'
   },
   icons: {
      color:'#007AFF',
      fontSize : 30
   }
})

const styleCssCanvas = {
   styleDraw: `
  .m-signature-pad {
    position:absolute;
  }
 
  .m-signature-pad--footer {display: none; margin: 0px;} 
 `

}

export {styleCanvas,styleCssCanvas}