import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import CustomModal from "./custom-modal.componet";

const MessageModal = ({ action, message: { message }, onClose }) => (
    <CustomModal>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.action}>
            {onClose && (
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.button}>Đóng</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={action}>
                <Text style={styles.button}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    </CustomModal>
);

export default MessageModal;

const styles = StyleSheet.create({
    requestStatus: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16,
        textTransform: "uppercase"
    },
    message: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14,
        color: "#444",
        marginVertical: 20,
        paddingHorizontal: 10
    },
    action: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 0.5,
        paddingVertical: 5
    },
    button: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 14
    }
});
