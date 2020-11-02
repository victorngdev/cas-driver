import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const LogoName = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/icons/logo.png")} style={styles.app_logo} />
            <Text style={styles.app_name}>CharityAmbulance</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    app_logo: {
        width: 100,
        height: 100,
        borderRadius: 18
    },
    app_name: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 30,
        marginTop: 10,
        color: "#FFFFFF"
    }
});

export default LogoName;
