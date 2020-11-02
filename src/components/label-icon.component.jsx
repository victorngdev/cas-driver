import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const LabelIcon = ({ iconSrc, title, titleStyle }) => {
    return (
        <View style={styles.container}>
            <Image source={iconSrc} style={styles.icon} />
            <Text style={titleStyle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 30,
        height: 30
    }
});

export default LabelIcon;
