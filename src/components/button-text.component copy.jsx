import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonText = ({ onPress, textContent, styleButton, styleText }) => {
    const { button, text } = styles;
    const combineStylesButton = StyleSheet.flatten([button, styleButton]); // sử dụng đê thay thế một số thuộc tính style cụ thể (vd: áp dụng width ở màn hình history)
    const combineStylesText = StyleSheet.flatten([text, styleText]);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={combineStylesButton} onPress={onPress}>
                <Text style={combineStylesText}>{textContent}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    button: {
        backgroundColor: "#FFF",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 18,
        color: "red",
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});
export default ButtonText;
