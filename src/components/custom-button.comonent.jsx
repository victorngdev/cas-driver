import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ action, label, type, style, counter, onTimeout }) => {
    const [timer, setTimer] = useState(counter * 60);
    const [minute, setMinute] = useState(counter);
    const [second, setSecond] = useState(0);

    useEffect(() => {
        if (counter && !timer) {
            onTimeout();
        }

        const interval = setTimeout(() => {
            setMinute(Math.floor(timer / 60));
            setSecond(Math.floor(timer % 60));
            setTimer(timer - 1);
        }, 1000);

        return () => clearTimeout(interval);
    });

    const mapKey = {
        reject: styles.reject,
        finish: styles.finish
    };

    return (
        <TouchableOpacity onPress={action}>
            <Text style={[styles.action, mapKey[type], style]}>
                {label}
                {timer ? (
                    <Text style={styles.counter}>{`${String(minute).padStart(2, "0")}:${String(
                        second
                    ).padStart(2, "0")}`}</Text>
                ) : null}
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
        paddingHorizontal: 30
    },
    action: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 15,
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
