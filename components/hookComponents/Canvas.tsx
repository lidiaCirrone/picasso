import React, { useRef, useState } from "react";

// components 
import { captureRef } from "react-native-view-shot";
import { Dimensions, Image, ImageBackground, Modal, Text, View, TouchableOpacity } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';

// style 
import { styleCanvas, styleCssCanvas } from "../../styles/styleCanvas";
import styleModal from '../../styles/styleModal';
import styleCamera from '../../styles/styleCamera'

// utils permission
import { _requestCameraPermission, _requestLibraryPermission } from '../../utils/permissions';

interface State {
   editSize: boolean,
   editColor: boolean,
   sizePen: number,
   urlImg: undefined | string,
   isDrawing: boolean,
   signature: string,
   saveModalVisible: boolean,
   cameraPermission: boolean,
   isCameraOpen: boolean,
   type: CameraType,
   libraryPermission: boolean,
}
const initialState: State = {
   editSize: false,
   editColor: false,
   sizePen: 1,
   urlImg: undefined,
   isDrawing: true,
   signature: '',
   saveModalVisible: false,
   cameraPermission: false,
   isCameraOpen: false,
   type: CameraType.back,
   libraryPermission: false,
}






let camera: Camera | null;

const Canvas = (props: any) => {

   const ref = useRef<SignatureViewRef>(null);
   // ref to change color 
   const refColor: any = useRef();
   // to make screenshot with bg image 
   const canvasRef: any = useRef();


   const [state, setState] = useState<State>(initialState)


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

   // function to open modal and save drawing 
   const handleOK = async (signature: any) => {
      setState({
         ...state,
         signature: signature,
         saveModalVisible: true
      })
   };

   // function to take a screenshot 
   const saveCapture = async () => {
      console.log('click sul bottone');
      let capture = await captureRef(canvasRef.current);
      props.callback(capture)();
      setState({
         ...state,
         saveModalVisible: false,
         signature: '',
         urlImg: undefined
      })
   }

   // function to open camera 
   const openCamera = async () => {
      let permission = await _requestCameraPermission()
      let obj = Object.assign({}, state)
      obj.cameraPermission = permission;
      if (permission) {
         obj.isCameraOpen = true;
      }
      setState(obj)

   }

   // function to take a picture 
   const takePic = async () => {
      if (!camera) return;
      let option = {
         base64: true
      }
      const photo = await camera.takePictureAsync(option);

      setState({
         ...state,
         isCameraOpen: false,
         urlImg: `data:image/jpg;base64,${photo.base64}`,
      })
   }
   const selectPhotoFromGallery = async () => {
      let permission = await _requestLibraryPermission()
      let obj = Object.assign({}, state)
      obj.libraryPermission = permission;
      if (permission) {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            // aspect: [4, 3],
            base64: true,
            quality: 0.5,
         });

         console.log(result);

         if (!result.cancelled) {
            obj.urlImg = `data:image/png;base64,${result.base64}`
         }
      }
      setState(obj)

   }
   // if camera is not open 
   if (!state.isCameraOpen)

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

               <TouchableOpacity onPress={selectPhotoFromGallery}>
                  <MaterialIcons style={styleCanvas.icons} name="photo-library" />
               </TouchableOpacity>

               <TouchableOpacity onPress={openCamera}>
                  <MaterialCommunityIcons style={styleCanvas.icons} name="camera" />
               </TouchableOpacity>

               <TouchableOpacity onPress={save}>
                  <MaterialCommunityIcons style={styleCanvas.icons} name="content-save" />
               </TouchableOpacity>

            </View>

            {/* if signature is not saved and finished */}
            {!state.signature ?
               <>
                  {
                     state.urlImg &&
                     <SignatureScreen
                        ref={ref}
                        webStyle={styleCssCanvas.styleDraw}
                        onOK={handleOK}
                        bgSrc={state.urlImg}
                        bgWidth={Dimensions.get('screen').width}
                        bgHeight={'100%'}

                     />
                  }

                  {
                     !state.urlImg &&
                     <SignatureScreen
                        ref={ref}
                        webStyle={styleCssCanvas.styleDraw}
                        onOK={handleOK}
                     />
                  }
               </>


               :

               <>
                  <View ref={canvasRef} style={{ flex: 1, backgroundColor: 'white' }} collapsable={false}>
                     {
                        state.urlImg ?
                           <ImageBackground
                              style={{ height: '100%', width: '100%' }}
                              source={{ uri: state.urlImg }}
                           >
                              <Image
                                 style={styleCanvas.drawing}
                                 source={{ uri: state.signature }}

                              />
                           </ImageBackground> :
                           <Image
                              style={styleCanvas.drawing}
                              source={{ uri: state.signature }}

                           />
                     }

                  </View>

                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={state.saveModalVisible}
                     onRequestClose={() => {
                        setState({ ...state, saveModalVisible: !state.saveModalVisible });
                     }}>
                     <View style={styleModal.modalView}>
                        <Text style={styleModal.modalText}>Choice where</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                           <TouchableOpacity
                              style={{ borderColor: '#007AFF', borderWidth: 2, padding: 8, borderRadius: 6 }}
                              onPress={saveCapture}>
                              <Text style={styleModal.textStyle}>save photo</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              style={{ borderColor: '#007AFF', borderWidth: 2, padding: 8, borderRadius: 6 }}
                              onPress={saveCapture}>
                              <Text style={styleModal.textStyle}>save photo</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </Modal>

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

               <TouchableOpacity onPress={handleClear}>
                  <MaterialCommunityIcons style={styleCanvas.icons} name="trash-can" />
               </TouchableOpacity>

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
   else {
      return (
         <Camera ref={(r) => { camera = r }} style={styleCamera.camera} type={state.type}>
            <View style={styleCamera.buttonContainer}>
               <TouchableOpacity
                  style={styleCamera.buttonCamera}
                  onPress={() => {
                     setState({
                        ...state,
                        type: state.type === CameraType.back ? CameraType.front : CameraType.back
                     });
                  }}>
                  <Text style={styleCamera.text}> Flip </Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styleCamera.buttonCamera}
                  onPress={takePic}>
                  <Text style={styleCamera.text}> Take a pic </Text>
               </TouchableOpacity>
            </View>
         </Camera>
      )
   }
};

export default Canvas;

