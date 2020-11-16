import React from "react";
import { Text, StyleSheet } from "react-native";

import CustomButton from "./custom-button.comonent";
import CustomModal from "./custom-modal.componet";

const MessageModal = ({ action, isVisible, message: { title, message } }) => (
    <CustomModal visible={isVisible}>
        <Text style={styles.requestStatus}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <CustomButton
            action={action}
            label="Đóng"
            style={{ paddingHorizontal: 30, marginBottom: 10 }}
        />
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
    }
});
