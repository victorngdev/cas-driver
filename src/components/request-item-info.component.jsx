import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RequestInfoItem = ({ label, content }) => (
    <View style={styles.itemInfo}>
        {label ? <Text style={styles.itemLabel}>{label}</Text> : null}
        <Text style={styles.itemValue}>{content}</Text>
    </View>
);

export default RequestInfoItem;

const styles = StyleSheet.create({
    itemInfo: {
        marginVertical: 2
    },
    infoTitle: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#26324A"
    },
    itemLabel: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 12,
        color: "#000"
    },
    itemValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        color: "#000"
    }
});
