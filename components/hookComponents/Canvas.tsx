import React, { useRef, useState } from "react";

// components 
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import { Dimensions, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";

import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// style 
import { styleCanvas, styleCssCanvas } from "../../styles/styleCanvas";


const Canvas = (props: any) => {
   const ref = useRef<SignatureViewRef>(null);
   const refColor: any = useRef();
   const canvasRef: any = useRef();
   const [state, setState] = useState({
      editSize: false,
      editColor: false,
      sizePen: 1,
      urlImg: undefined,
      isDrawing: true,
      signature: '',
      saveModalVisible: false,
   })

   // function to clear all file 
   const handleClear = () => {
      ref.current?.clearSignature();
   };

   // function to change size of pen 
   const changeSize = (value: number) => {
      ref.current?.changePenSize(1, value)
      setState({
         ...state,
         sizePen: value
      })
   }

   // function to handle editSize 
   const handleEditSize = () => {
      setState({
         ...state,
         editSize: !state.editSize,
         editColor: false
      })
   }

   // function to change color of pen 
   const onColorChange = (value: string) => {
      ref.current?.changePenColor(value)
   }

   // function to handle edit color 
   const handleEditColor = () => {
      setState({
         ...state,
         editSize: false,
         editColor: !state.editColor
      })
   }

   // function to eraser
   const erase = () => {
      ref.current?.erase();
      setState({
         ...state,
         isDrawing: false
      })
   }

   // function to redo 
   const redo = () => {
      ref.current?.redo()
   }

   // function to undo 
   const undo = () => {
      ref.current?.undo()
   }

   // function to draw 
   const handleSignature = () => {
      ref.current?.draw();
      setState({
         ...state,
         isDrawing: true
      })
   };

   // function to save 
   const save = () => {
      console.log("end");
      ref.current?.readSignature();
   };

   const handleOK = async (signature: any) => {
      setState({
         ...state,
         signature: signature,
         saveModalVisible: true
      })

      // let capture = await captureRef(canvasRef.current, {
      //    format: "jpg",
      //    quality: 0.8,
      // });
      // props.callback(capture, signature)();
   };

   const saveCapture = async () => {
      console.log('modale');
      let capture = await captureRef(canvasRef.current);
      props.callback(capture)();
      setState({
         ...state,
         saveModalVisible: false,
         signature: ''

      })
   }

   return (
      <View style={styleCanvas.container}>

         {/* top editor  */}
         <View style={styleCanvas.row}>

            <TouchableOpacity onPress={undo}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="undo" />
            </TouchableOpacity>

            <TouchableOpacity onPress={redo}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="redo" />
            </TouchableOpacity>

            {/* <Button title="Clear all " onPress={handleClear} /> */}
            <TouchableOpacity onPress={handleClear}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="trash-can" />
            </TouchableOpacity>

            <TouchableOpacity onPress={erase}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="camera" />
            </TouchableOpacity>

            <TouchableOpacity onPress={save}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="content-save" />
            </TouchableOpacity>

         </View>

         {!state.signature ?
            // <View ref={canvasRef} style={{ flex: 1, backgroundColor: 'white' }} collapsable={false}>

            <SignatureScreen
               ref={ref}
               webStyle={styleCssCanvas.styleDraw}
               onOK={handleOK}
               bgSrc={undefined}
               bgWidth={Dimensions.get('screen').width}
               bgHeight={Dimensions.get('screen').height}
            // dataURL={state.bgImage ? state.bgImage : ''}
            />

            // </View >

            :

            <>
               <View ref={canvasRef} style={{ flex: 1, backgroundColor: 'white' }} collapsable={false}>
                  {
                     state.urlImg ?
                        <ImageBackground
                           style={{ flex: 1 }}
                           source={{ uri: state.urlImg }}
                        >
                           <Image
                              style={{ width: 200, height: 300 }}
                              source={{ uri: state.signature }}

                           />
                        </ImageBackground> :
                        <Image
                           style={{ width: 200, height: 300 }}
                           source={{ uri: state.signature }}

                        />
                  }

                  <View style={styles.centeredView}>
                     <Modal
                        animationType="slide"
                        transparent={true}
                        visible={state.saveModalVisible}
                        onRequestClose={() => {
                           setState({ ...state, saveModalVisible: !state.saveModalVisible });
                        }}>
                        <View style={styles.modalView}>
                           <Text style={styles.modalText}>Choice where</Text>
                           <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                              <TouchableOpacity
                                 style={{ borderColor: '#007AFF', borderWidth: 2, padding: 8, borderRadius: 6 }}
                                 onPress={saveCapture}>
                                 <Text style={styles.textStyle}>save photo</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                 style={{ borderColor: '#007AFF', borderWidth: 2, padding: 8, borderRadius: 6 }}
                                 onPress={saveCapture}>
                                 <Text style={styles.textStyle}>save photo</Text>
                              </TouchableOpacity>
                           </View>

                        </View>
                     </Modal>
                  </View>

               </View>





            </>
         }



         {//editor size pen
            state.editSize &&
            <View style={[styleCanvas.row, styleCanvas.editContainer]}>
               <Slider
                  value={state.sizePen}
                  style={{ width: 200, height: 40 }}
                  minimumValue={1}
                  maximumValue={50}
                  step={1}
                  minimumTrackTintColor="blue"
                  maximumTrackTintColor="#000000"
                  onValueChange={changeSize}
               />

               <TouchableOpacity onPress={handleEditSize}>
                  <Ionicons style={{ color: 'blue', fontSize: 40 }} name="checkmark-done" />
               </TouchableOpacity>
            </View>
         }

         { // editor change color
            state.editColor &&
            <View
               style={styleCanvas.editColor}
            >
               <ColorPicker
                  ref={refColor}
                  onColorChangeComplete={onColorChange}
                  thumbSize={20}
                  sliderSize={20}
                  noSnap={false}
                  row={false}
               />
            </View>
         }

         {/* bottom editor  */}
         <View style={styleCanvas.row}>

            <TouchableOpacity onPress={erase}>
               <MaterialCommunityIcons
                  style={[styleCanvas.icons, !state.isDrawing ? styleCanvas.iconsSelected : styleCanvas.icons]}
                  name="eraser" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignature}>
               <MaterialCommunityIcons
                  style={[styleCanvas.icons, state.isDrawing ? styleCanvas.iconsSelected : styleCanvas.icons]}
                  name="pencil" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEditColor}>
               <MaterialCommunityIcons style={styleCanvas.icons} name="palette" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEditSize}>
               <Ionicons style={styleCanvas.icons} name="options" />
            </TouchableOpacity>

         </View>
      </View>
   );
};



const styles = StyleSheet.create({
   centeredView: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
   },
   modalView: {
      marginVertical: Dimensions.get('screen').height / 2 - 100,
      marginHorizontal: 20,
      backgroundColor: '#000',
      borderRadius: 20,
      paddingVertical: 20,
      height: 300,
      alignItems: 'center',
      justifyContent: 'space-around',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
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
});


export default Canvas;

