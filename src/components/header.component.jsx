import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Header = (props) => {
    const Icon = props.passedIcon;
    const title = props.title;

    const { text } = styles;
    const combineStylesText = StyleSheet.flatten([text, props.styleText]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Icon />
            </View>
            <View style={{ flex: 9, flexDirection: "row" }}>
                <Text style={combineStylesText}>{title}</Text>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#522289",
        marginLeft: 50,
    },
});

export default Header;
