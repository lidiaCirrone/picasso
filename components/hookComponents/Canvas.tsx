import React, { useRef, useState } from "react";

// components 
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";

import { captureRef } from 'react-native-view-shot';
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
      isDrawing: true
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
      // setState({
      //    ...state,
      //    urlImg: signature
      // })
      const result = await captureRef(canvasRef, {
         result: 'data-uri',
         // height: pixels,
         // width: pixels,
         // quality: 1,
         // format: 'png',
      });
      props.callback(result)()
   };

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

         <View ref={canvasRef} style={{ flex: 1 }}>
            <SignatureScreen
               ref={ref}
               webStyle={styleCssCanvas.styleDraw}
               onOK={handleOK}
               bgSrc={state.urlImg ? state.urlImg : 'https://it.seaicons.com/wp-content/uploads/2015/07/Homer-Simpson-02-Donut-icon.png'}
               // backgroundColor={'red'}
               // bgSrc={'https://it.seaicons.com/wp-content/uploads/2015/07/Homer-Simpson-02-Donut-icon.png'}
               bgHeight={'100%'}
               bgWidth={'100%'}
               // dataURL={state.urlImg ? state.urlImg : ""}
            />
         </View>



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

export default Canvas;

