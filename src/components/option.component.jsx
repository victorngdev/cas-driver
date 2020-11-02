import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const CustomOption = ({ value, label }) => (
    <View style={styles.option}>
        <RadioButton value={value} />
        <Text style={styles.optionValue}>{label}</Text>
    </View>
);

export default CustomOption;

const styles = StyleSheet.create({
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    optionValue: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14,
        color: "#444"
    }
});
