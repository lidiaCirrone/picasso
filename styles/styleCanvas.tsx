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
      height: 70,
      backgroundColor: 'black'
   },
   editColor: {
      flex: 1,
      padding: 20,
      marginBottom: 20
   },
   editContainer: {
      backgroundColor: '#efefef'
   },
   icons: {
      color: '#007AFF',
      fontSize: 30
   },
   iconsSelected: {
      color: '#fff',
      fontSize: 30
   },
   drawing: {
      width: '100%',
      height: '100%'
   }

})

const styleCssCanvas = {
   styleDraw: `
  .m-signature-pad {
      flex:1
    
  }
 
  .m-signature-pad--footer {display: none; margin: 0px;} 

  body,html {
   width: 100%; height: 100%}
 `

}

export { styleCanvas, styleCssCanvas }