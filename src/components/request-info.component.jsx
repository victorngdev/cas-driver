import React from "react";
import { View, Text, StyleSheet } from "react-native";

import RequestInfoItem from "./request-info-item.component";

const mapKey = {};

const RequestInfo = ({ title, items }) => (
    <View style={styles.requesterInfo}>
        <Text style={styles.infoTitle}>{title}</Text>
        {items.map(
            ({ label, content }, index) =>
                content && <RequestInfoItem key={index} label={label} content={content} />
        )}
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
