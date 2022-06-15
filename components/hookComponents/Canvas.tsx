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
import * as MediaLibrary from 'expo-media-library';

// style 
import { styleCanvas, styleCssCanvas } from "../../styles/styleCanvas";
import styleModal from '../../styles/styleModal';
import styleCamera from '../../styles/styleCamera'

// utils permission
import { _requestCameraPermission, _requestLibraryPermission } from '../../utils/permissions';
// utils localstorare 
import { getObjFromLocalStorage, setLocalStorageObj } from '../../utils/localStorage'


interface State {
   editSize: boolean,
   editColor: boolean,
   sizePen: number,
   urlImg: undefined | string,
   widthImg: number | undefined,
   heightImg: number | undefined,
   isDrawing: boolean,
   signature: string,
   saveModalVisible: boolean,
   cameraPermission: boolean,
   isCameraOpen: boolean,
   type: CameraType,
   libraryPermission: boolean,
   heightSignature: number
}
const initialState: State = {
   editSize: false,
   editColor: false,
   sizePen: 1,
   urlImg: undefined,
   widthImg: undefined,
   heightImg: undefined,
   isDrawing: true,
   signature: '',
   saveModalVisible: false,
   cameraPermission: false,
   isCameraOpen: false,
   type: CameraType.back,
   libraryPermission: false,
   heightSignature: Dimensions.get('screen').height / 6 * 4
}






let camera: Camera | null;
let widthImgCss = styleCssCanvas.styleDraw;


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
      let copyState = Object.assign({}, state)
      if (!state.editSize) {
         copyState.editSize = true,
            copyState.editColor = false,
            copyState.heightSignature = Dimensions.get('screen').height / 6 * 3
      } else {
         copyState.editSize = false,
            copyState.editColor = false,
            copyState.heightSignature = Dimensions.get('screen').height / 6 * 4
      }
      setState(copyState)
   }

   // function to change color of pen 
   const onColorChange = (value: string) => {
      ref.current?.changePenColor(value)
   }

   // function to handle edit color 
   const handleEditColor = () => {
      let copyState = Object.assign({}, state)
      if (!state.editColor) {
         copyState.editSize = false,
            copyState.editColor = true,
            copyState.heightSignature = Dimensions.get('screen').height / 6 * 1
      } else {
         copyState.editSize = false,
            copyState.editColor = false,
            copyState.heightSignature = Dimensions.get('screen').height / 6 * 4
      }
      setState(copyState)
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
   const saveCapture = (whereWeWillSave: string) => async () => {
      let capture = await captureRef(canvasRef.current);
      let myGallery: Array<object> = await getObjFromLocalStorage('images')()
      let objCapture = {
         url: capture
      }
      myGallery?.push(objCapture)
      setLocalStorageObj('images', myGallery)()
      setState({
         ...state,
         saveModalVisible: false,
         signature: '',
         urlImg: undefined
      })
      if (whereWeWillSave === 'all') {
         const asset = await MediaLibrary.createAssetAsync(capture);
      }
      props.callback();

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

      let ratio = photo.height / photo.width;
      let newHeight = Dimensions.get('screen').height / 6 * 4;
      let newWidth = newHeight / ratio;

      setState({
         ...state,
         isCameraOpen: false,
         urlImg: `data:image/jpg;base64,${photo.base64}`,
         widthImg: newWidth,
         heightImg: newHeight
      })
   }

   // function to select photo from gallery 
   const selectPhotoFromGallery = async () => {
      let permission = await _requestLibraryPermission()
      let obj = Object.assign({}, state)

      obj.libraryPermission = permission;

      if (permission) {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 0.5,
         });

         if (!result.cancelled) {

            let ratio = result.height / result.width;
            let newHeight = Dimensions.get('screen').height / 6 * 4;
            let newWidth = newHeight / ratio;
            obj.urlImg = `data:image/png;base64,${result.base64}`;
            obj.widthImg = newWidth;
            obj.heightImg = newHeight;

            if (newWidth > Dimensions.get('screen').width) {
               widthImgCss = widthImgCss + `
               .m-signature-pad--body img {
                   left: -${(newWidth - Dimensions.get('screen').width) / 2}px!important;
                  }`
            } else {
               widthImgCss = widthImgCss + `
               .m-signature-pad--body img {
                   left: ${(Dimensions.get('screen').width - newWidth) / 2}px!important;
                  }`
            }
         }

      }
      setState(obj)

   }

   // if camera is not open 
   if (!state.isCameraOpen)

      return (
         <>
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
                  <View style={{
                     width: Dimensions.get('screen').width,
                     height: state.heightSignature
                  }}>

                     {
                        (state.urlImg && state.widthImg) &&
                        <SignatureScreen
                           ref={ref}
                           webStyle={widthImgCss}
                           onOK={handleOK}
                           bgSrc={state.urlImg}
                           bgWidth={state.widthImg}
                           bgHeight={state.heightImg}
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
                  </View>

                  :

                  <View ref={canvasRef} style={{
                     backgroundColor: 'white',
                     width: Dimensions.get('screen').width,
                     height: Dimensions.get('screen').height / 6 * 4
                  }}
                  >
                     {
                        (state.urlImg && state.widthImg) ?
                           <ImageBackground
                              style={{
                                 width: Dimensions.get('screen').width,
                                 height: Dimensions.get('screen').height / 6 * 4,
                              }}
                              source={{ uri: state.urlImg }}
                              resizeMode={state.widthImg > Dimensions.get('screen').width ? 'cover' : 'contain'}
                           >
                              <Image
                                 style={styleCanvas.drawing}
                                 source={{ uri: state.signature }}
                                 width={Dimensions.get('screen').width}
                                 height={Dimensions.get('screen').height / 6 * 4}

                              />
                           </ImageBackground> :
                           <Image
                              style={styleCanvas.drawing}
                              source={{ uri: state.signature }}
                              width={Dimensions.get('screen').width}
                              height={Dimensions.get('screen').height / 6 * 4}

                           />
                     }
                  </View>

               }



               {//editor size pen
                  state.editSize &&
                  <View style={styleCanvas.editSize}>
                     <Slider
                        value={state.sizePen}
                        style={{ width: 200 }}
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
                        onPress={saveCapture('')}>
                        <Text style={styleModal.textStyle}>Save in App</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={{ borderColor: '#007AFF', borderWidth: 2, padding: 8, borderRadius: 6 }}
                        onPress={saveCapture('all')}>
                        <Text style={styleModal.textStyle}>Save in App and Device</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
         </>
      );
   else {
      return (
         <>
            <View style={styleCanvas.row}></View>
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
            <View style={styleCanvas.row}></View>
         </>
      )
   }
};

export default Canvas;

