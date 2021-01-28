import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";

const ImageCapture = ({ label, source, action, isWarning, showWarning }) => {
    const launchCamera = () => {
        launchCameraAsync({ base64: true, allowsEditing: true, aspect: [16, 9] }).then(response =>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.imgDescription}>{label}</Text>
                {isWarning && (
                    <TouchableOpacity onPress={showWarning}>
                        <Icon
                            style={{ marginTop: 5, marginLeft: 2 }}
                            size={12}
                            color="#ff0000"
                            name="exclamation-triangle"
                        />
                    </TouchableOpacity>
                )}
            </View>
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
