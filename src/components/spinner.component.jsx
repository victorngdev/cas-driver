import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Spinner = () => (
    <View style={styles.spinner}>
        <View style={styles.overplay}>
            <Image style={styles.image} source={{ uri: "https://i.ibb.co/ZmKX8PR/loading.gif" }} />
            <Text style={styles.message}>Đang xử lí yêu cầu</Text>
        </View>
    </View>
);

export default Spinner;

const styles = StyleSheet.create({
    spinner: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 10
    },
    overplay: {
        width: "90%",
        height: "25%",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10
    },
    image: {
        width: 75,
        height: 75
    },
    message: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 16,
        marginTop: 30
    }
});
