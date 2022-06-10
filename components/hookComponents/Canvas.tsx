import React, { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ onOK }) => {
  const ref = useRef();

  const handleOK = (signature) => {
    console.log(signature);
    onOK(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
      <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="undo" onPress={()=>ref.current.undo()} />
        <Button title="change" onPress={()=>ref.current.changePenColor('red')} />
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});