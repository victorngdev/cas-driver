import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TextLinking = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.contentText}</Text>
            <Text style={styles.link} onPress={props.link}>
                {props.contentLink}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 16,
        fontFamily: "Texgyreadventor-regular",
        color: "#FFF",
        marginRight: 7
    },
    link: {
        fontSize: 14,
        fontFamily: "Texgyreadventor-regular",
        textDecorationLine: "underline",
        color: "#0038FD"
    }
});

export default TextLinking;
