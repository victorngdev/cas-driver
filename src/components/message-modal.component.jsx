import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { clearStatusCode } from "../redux/message/message.action";

import CustomModal from "./custom-modal.componet";

const MessageModal = ({ message, clearStatusCode }) => {
    useEffect(() => {
        setTimeout(() => {
            clearStatusCode();
        }, 2000);
    }, [message]);

    return (
        <CustomModal>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.action}>
                <TouchableOpacity onPress={clearStatusCode}>
                    <Text style={styles.button}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </CustomModal>
    );
};

const mapDispatchToProps = dispatch => ({
    clearStatusCode: () => dispatch(clearStatusCode())
});

export default connect(null, mapDispatchToProps)(MessageModal);

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
