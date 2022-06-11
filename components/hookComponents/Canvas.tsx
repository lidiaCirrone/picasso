import React, { useRef, useState } from "react";
// components 
import { Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';

// style 
import { styleCanvas, styleCssCanvas } from "../../styles/styleCanvas";


const Canvas = () => {
  const ref = useRef<SignatureViewRef>(null);
  const refColor: any = useRef()
  const [state, setState] = useState({
    editSize: false,
    editColor: false,
    sizePen: 1,
    urlImg: null
  })

  // function to clear all file 
  const handleClear = () => {
    ref.current?.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current?.readSignature();
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
    ref.current?.erase()
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
  };

  // function to save 
  const save = () => {
    console.log("end");
    ref.current?.readSignature();
  };
  const handleOK = (signature: any) => {
    setState({
      ...state,
      urlImg: signature
    })
    console.log(signature);
  };

  return (
    <View style={styleCanvas.container}>

      {/* top editor  */}
      <View style={styleCanvas.row}>
        {/* <Button title="Clear all " onPress={handleClear} /> */}
        <TouchableOpacity onPress={handleClear}>
          <Ionicons style={styleCanvas.icons} name="basket" />
        </TouchableOpacity>

        <TouchableOpacity onPress={erase}>
          <Ionicons style={styleCanvas.icons} name="remove" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignature}>
          <Ionicons style={styleCanvas.icons} name="pencil" />
        </TouchableOpacity>

        <TouchableOpacity onPress={erase}>
          <Ionicons style={styleCanvas.icons} name="camera" />
        </TouchableOpacity>

        <TouchableOpacity onPress={save}>
          <Ionicons style={styleCanvas.icons} name="save" />
        </TouchableOpacity>

      </View>


      <SignatureScreen
        ref={ref}
        webStyle={styleCssCanvas.styleDraw}
        onOK={handleOK}
        bgSrc={state.urlImg ? state.urlImg : undefined}
        bgHeight={'100%'}
        bgWidth={'100%'}
      />


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

        <TouchableOpacity onPress={redo}>
          <Ionicons style={styleCanvas.icons} name="arrow-redo" />
        </TouchableOpacity>

        <TouchableOpacity onPress={undo}>
          <Ionicons style={styleCanvas.icons} name="arrow-undo" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEditColor}>
          <Ionicons style={styleCanvas.icons} name="color-palette" />
        </TouchableOpacity>


        <TouchableOpacity onPress={handleEditSize}>
          <Ionicons style={styleCanvas.icons} name="pencil" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Canvas;

