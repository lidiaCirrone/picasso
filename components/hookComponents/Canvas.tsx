import React, { useRef, useState } from "react";
// components 
import { View, Button } from "react-native";
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
    sizePen: 1
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


  return (
    <View style={styleCanvas.container}>

      {/* top editor  */}
      <View style={styleCanvas.row}>
        <Button title="Clear all " onPress={handleClear} />
        <Button title="eraser" onPress={erase} />
        <Button title="add photo" onPress={() => console.log('pressed')} />
        <Button title="save" onPress={() => console.log('pressed')} />
      </View>


      <SignatureScreen
        ref={ref}
        webStyle={styleCssCanvas.styleDraw}
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
        <Button title="redo" onPress={redo} />
        <Button title="undo" onPress={undo} />
        <Button title="change color" onPress={handleEditColor} />
        <Button title="change size" onPress={handleEditSize} />
      </View>
    </View>
  );
};

export default Canvas;

