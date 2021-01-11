import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { launchCameraAsync } from "expo-image-picker";

const ImageCapture = ({ label, source, action }) => {
    const launchCamera = () => {
        launchCameraAsync({ base64: true, allowsEditing: true }).then(response =>
            action({ uri: response.uri, base64: response.base64 })
        );
    };

    return (
        <View style={styles.imageInfo}>
            <TouchableOpacity onPress={launchCamera}>
                <Image
                    style={styles.image}
                    source={{ uri: source || "https://i.ibb.co/ypNxXzD/cap-picture.png" }}
                />
            </TouchableOpacity>
            <Text style={styles.imgDescription}>{label}</Text>
        </View>
    );
};

export default ImageCapture;

const styles = StyleSheet.create({
    imageInfo: {
        width: "45%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 20
    },
    image: {
        marginLeft: 5,
        width: 100,
        height: 100,
        borderRadius: 20
    },
    imgDescription: {
        textAlign: "center",
        color: "#666",
        fontFamily: "Texgyreadventor-regular",
        fontSize: 13,
        marginTop: 5
    }
});
