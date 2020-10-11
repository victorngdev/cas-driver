import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import rem from "./constant.unit";
const ButtonText = ({ gotoScreen, textContent, styleButton, styleText }) => {
  const { button, text } = styles;
  const combineStylesButton = StyleSheet.flatten([button, styleButton]); // sử dụng đê thay thế một số thuộc tính style cụ thể (vd: áp dụng width ở màn hình history)
  const combineStylesText = StyleSheet.flatten([text, styleText]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={combineStylesButton} onPress={gotoScreen}>
        <Text style={combineStylesText}>{textContent}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FFF",
    width: 18 * rem,
    height: 3.8 * rem,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "red",
  },
});
export default ButtonText;
