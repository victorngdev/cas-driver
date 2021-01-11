import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = ({ title, style, gotoScreen }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.container_back_button}>
                <Icon onPress={gotoScreen} size={20} color="#666" name="keyboard-backspace" />
            </View>
            <View style={styles.container_header_title}>
                <Text style={styles.text_content}>{title}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    //css for parents:
    container: {
        flexDirection: "row",
        paddingTop: 20,
        justifyContent: "center",
        marginLeft: 10
    },
    container_back_button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    container_header_title: {
        flex: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    //css for child:
    image: {
        width: 21,
        height: 21
    },
    text_content: {
        fontSize: 15,
        fontFamily: "Texgyreadventor-bold",
        color: "#494958",
        textAlign: "center"
    }
});

export default Header;
