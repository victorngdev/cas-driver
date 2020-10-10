import React from "react";
import { View, Linking, Text, StyleSheet } from "react-native";

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
        fontFamily: "Roboto_500Medium",
        color: "#FFF",
        marginRight: 7
    },
    link: {
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
        textDecorationLine: "underline",
        color: "#0038FD"
    }
});

export default TextLinking;
