import React from "react";
import { KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";

const KeyboardAvoiding = ({ style, children }) => (
    <KeyboardAvoidingView style={styles.keyboardContainer} behavior="height">
        <ScrollView style={style} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
);

export default KeyboardAvoiding;

const styles = StyleSheet.create({
    keyboardContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});
