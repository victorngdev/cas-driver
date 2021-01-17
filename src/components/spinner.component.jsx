import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Spinner = ({ style }) => (
    <View style={[styles.spinner, style]}>
        <View style={styles.overplay}>
            <Image style={styles.image} source={require("../../assets/icons/loading.gif")} />
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
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        zIndex: 10
    },
    overplay: {
        width: "90%",
        height: "auto",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10
    },
    image: {
        width: 150,
        height: 150
    }
});
