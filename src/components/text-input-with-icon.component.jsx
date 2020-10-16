import React from "react";
import { View, Image, StyleSheet, TextInput, Dimensions } from "react-native";
import rem from "./constant.unit";
<<<<<<< HEAD
const TextInputIcon = props => {
    return (
        <View style={styles.container}>
            <View style={styles.bgr_image}>
                <Image source={props.imgSrc} style={styles.image} />
            </View>
            <TextInput style={styles.text_input} placeholder={props.placeholder} placeholderTextColor="#FFF" />
=======
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
>>>>>>> dev/phung-xinh-gai
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,0.4)",
        flexDirection: "row",
        width: "80%",
        borderRadius: 60,
<<<<<<< HEAD
        marginBottom: 15
=======
        marginBottom: 15,
>>>>>>> dev/phung-xinh-gai
    },
    bgr_image: {
        backgroundColor: "#FFF",
        padding: 13,
<<<<<<< HEAD
        borderRadius: 70
    },
    image: {
        width: 16,
        height: 16
=======
        borderRadius: 70,
    },
    image: {
        width: 16,
        height: 16,
>>>>>>> dev/phung-xinh-gai
    },
    text_input: {
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
        color: "#FFF",
        marginLeft: 7,
<<<<<<< HEAD
        width: 15 * rem
    }
=======
        width: 15 * rem,
    },
>>>>>>> dev/phung-xinh-gai
});
export default TextInputIcon;
