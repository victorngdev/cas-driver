import React from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

function GoogleMapScreen() {
    return <Image style={styles.container} source={require("../../../assets/images/googlemap.jpg")} />;
}

export default GoogleMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        width: null,
        marginTop: 30
    }
});
