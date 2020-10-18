import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ action, label, type, style, counter }) => {
    const mapKey = {
        reject: styles.reject,
        finish: styles.finish
    };

    return (
        <TouchableOpacity onPress={() => action()}>
            <Text style={[styles.action, mapKey[type], style]}>
                {label}
                {counter ? <Text style={styles.counter}>{counter}</Text> : null}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    reject: {
        color: "#ff0000",
        borderColor: "#ff0000"
    },
    finish: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 30
    },
    action: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 15,
        color: "#000",
        borderColor: "#00960F",
        borderWidth: 1,
        borderRadius: 25,
        color: "#00960F",
        paddingVertical: 5,
        paddingHorizontal: 15
    },

    counter: {
        fontFamily: "Texgyreadventor-bold"
    }
});
