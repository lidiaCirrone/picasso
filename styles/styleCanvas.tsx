import { Dimensions, StyleSheet } from 'react-native';

const styleCanvas = StyleSheet.create({
   container: {
      flex: 1,
      width: Dimensions.get('screen').width,
   },
   row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: Dimensions.get('screen').height / 6,
      backgroundColor: 'black'
   },
   editColor: {
      height: Dimensions.get('screen').height / 6 * 3,
      padding: 20,
   },
   editSize: {
      height: Dimensions.get('screen').height / 6 * 1,
      backgroundColor: '#efefef',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
   },
   editSizeSlider: {
      width: 200
   },
   editSizeIcon: {
      color: '#007AFF',
      fontSize: 40
   },
   icons: {
      color: '#007AFF',
      fontSize: 30
   },
   iconsSelected: {
      color: '#fff',
      fontSize: 30
   },
   iconsDisabled: {
      color: '#007AFF',
      fontSize: 30,
      opacity: .5
   },
   drawing: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height / 6 * 4,
   }

})

const styleCssCanvas = {
   styleDraw: `
   body, html {
      width: 100%;
      height: 100%;
   }
   
   .m-signature-pad {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      margin-left: 0;
      margin-top: 0;
      border: 0;
      background-color: #fff;
      box-shadow: 0;
   }
   
   .m-signature-pad--body {
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 0;
   }
   
   .m-signature-pad--footer {
      display: none;
      margin: 0px;
   }
 `
}

export { styleCanvas, styleCssCanvas }