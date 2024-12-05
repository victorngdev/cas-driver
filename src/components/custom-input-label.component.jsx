import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInputLabel = ({ label, isRequire, ...otherProps }) => (
    <View style={styles.group}>
        <Text style={styles.label}>
            {label} {isRequire ? <Text style={styles.require}>*</Text> : null}
        </Text>
        <TextInput {...otherProps} style={styles.value} />
    </View>
);

export default CustomInputLabel;

const styles = StyleSheet.create({
    group: {
        width: "100%",
        zIndex: -1
    },
    label: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 13,
        color: "#787881"
    },
    value: {
        width: "100%",
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        marginVertical: 5,
        fontFamily: "Texgyreadventor-regular",
        color: "#444",
        zIndex: -1,
        fontSize: 14
    },

    require: {
        color: "#ff0000"
    }
});
