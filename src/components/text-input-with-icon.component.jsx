import React from "react";
import { View, Image, StyleSheet, TextInput, Dimensions } from "react-native";
import rem from "./constant.unit";
const TextInputIcon = ({ placeholder, secureTextEntry, imgSrc }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bgr_image}>
                <Image source={imgSrc} style={styles.image} />
            </View>
            <TextInput
                style={styles.text_input}
                placeholder={placeholder}
                placeholderTextColor="#FFF"
                secureTextEntry={secureTextEntry} //true/false
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,0.4)",
        flexDirection: "row",
        width: "80%",
        borderRadius: 60,
        marginBottom: 15,
    },
    bgr_image: {
        backgroundColor: "#FFF",
        padding: 13,
        borderRadius: 70,
    },
    image: {
        width: 16,
        height: 16,
    },
    text_input: {
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
        color: "#FFF",
        marginLeft: 7,
        width: 15 * rem,
    },
});
export default TextInputIcon;
