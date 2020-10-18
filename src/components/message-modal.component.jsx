import React from "react";
import { Text, StyleSheet } from "react-native";

import CustomButton from "./custom-button.comonent";
import CustomModal from "./custom-modal.componet";

const MessageModal = ({ action, isVisible }) => (
    <CustomModal visible={isVisible} contentSize={{ height: "26%", paddingHorizontal: 20 }}>
        <Text style={styles.requestStatus}>Yêu cầu hoàn thành</Text>
        <Text style={styles.message}>
            Cảm ơn bạn đã giúp đỡ bệnh nhân! Bạn có thể xem lại yêu cầu và phần đánh giá trong mục Lịch sử.
        </Text>
        <CustomButton action={action} label="Đóng" style={{ paddingHorizontal: 30 }} />
    </CustomModal>
);

export default MessageModal;

const styles = StyleSheet.create({
    requestStatus: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 18
    },
    message: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14,
        color: "#444",
        marginVertical: 10
    }
});
