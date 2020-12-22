import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Modal = ({ children, title, visible }) => (
    <View style={[styles.modal, visible ? styles.visible : null]}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            {children}
        </View>
    </View>
);

export default Modal;

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: -1,
        opacity: 0
    },
    visible: {
        zIndex: 10,
        opacity: 1
    },
    modalContent: {
        width: "90%",
        height: "auto",
        maxHeight: "90%",
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 5
    },
    groupTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    modalTitle: {
        fontFamily: "Texgyreadventor-bold",
        color: "#000",
        fontSize: 16,
        textTransform: "uppercase"
    }
});
