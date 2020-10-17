import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RequestInfoItem from "./request-item-info.component";

const RequestInfo = ({ title, items }) => (
    <View style={styles.requesterInfo}>
        <Text style={styles.infoTitle}>{title}</Text>
        {items.map(({ id, ...otherProps }) => (
            <RequestInfoItem key={id} {...otherProps} />
        ))}
    </View>
);

export default RequestInfo;

const styles = StyleSheet.create({
    requesterInfo: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 0.5,
        marginVertical: 2
    },
    infoTitle: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#26324A"
    }
});
