import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Text, View, Image, StyleSheet, Platform, TouchableOpacity } from "react-native";
import rem from "./constant.unit";

const AvatarNameCol = ({
    linkImage,
    setLinkImage,
    textContent,
    contStyle,
    imgStyle,
    textStyle
}) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            //Anh tra ve thanh cong
            setLinkImage(result.uri);
        }
    };

    return (
        <View style={[styles.container, contStyle]}>
            <TouchableOpacity onPress={pickImage}>
                <Image style={[styles.image, imgStyle]} source={{ uri: linkImage }} />
            </TouchableOpacity>
            <Text style={[styles.text, textStyle]}>{textContent}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    image: {
        width: 11 * rem,
        height: 11 * rem,
        borderRadius: 100,
        marginBottom: 10
    },
    text: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 22,
        color: "#494958"
    }
});

export default AvatarNameCol;
