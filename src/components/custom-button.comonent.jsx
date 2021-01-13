import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ action, label, type, style }) => {
    const mapKey = {
        reject: styles.reject,
        finish: styles.finish
    };

    return (
        <TouchableOpacity onPress={action}>
            <Text style={[styles.action, mapKey[type], style]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    reject: {
        color: "#666"
    },
    finish: {
        paddingHorizontal: 30
    },
    action: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        borderRadius: 25,
        color: "#0a1b8a",
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#e4e6eb"
    },

    counter: {
        fontFamily: "Texgyreadventor-bold"
    }
});
