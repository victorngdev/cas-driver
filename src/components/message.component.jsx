import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { clearStatusCode } from "../redux/message/message.action";

const Message = ({ message, clearStatusCode, isMessage }) => {
    useEffect(() => {
        setTimeout(() => {
            clearStatusCode();
        }, 3000);
    }, [message]);

    return (
        <View style={[styles.container]}>
            <View style={styles.content}>
                <View style={styles.error}>
                    <Image
                        style={[styles.image, isMessage ? { width: 50, height: 50 } : null]}
                        source={{
                            uri: isMessage
                                ? "https://i.ibb.co/RPz5nPW/checked.png"
                                : "https://i.ibb.co/bgs5cKK/wrench.png"
                        }}
                    />
                    <Text style={styles.errorMessage}>
                        {isMessage ? "Thành công!" : "Đã xảy ra lỗi!"}
                    </Text>
                </View>
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    clearStatusCode: () => dispatch(clearStatusCode())
});

export default connect(null, mapDispatchToProps)(Message);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: "90%",
        height: "auto",
        backgroundColor: "#fff",
        borderRadius: 5
    },
    message: {
        fontFamily: "Texgyreadventor-regular",
        color: "#0c0d22",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    confirm: {
        fontFamily: "Texgyreadventor-bold"
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        borderTopWidth: 0.5,
        borderColor: "#0c0d22",
        paddingVertical: 10
    },
    button: {
        fontFamily: "Texgyreadventor-bold"
    },
    error: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 35,
        height: 35
    },
    errorMessage: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16,
        marginLeft: 10,
        color: "#363636"
    }
});
