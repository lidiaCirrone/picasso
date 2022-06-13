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
      width: Dimensions.get('screen').width, height: 300
   }

})

const styleCssCanvas = {
   styleDraw: `
  .m-signature-pad {
    position:absolute;
  }
 
  .m-signature-pad--footer {display: none; margin: 0px;} 

  body,html {
   width: ${Dimensions.get('screen').width}px; height: ${Dimensions.get('screen').height}px;}
 `

}

export { styleCanvas, styleCssCanvas }