import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

const RequestInfoItem = ({ content, icon, enabledNormalIcon }) => (
    <View style={styles.itemInfo}>
        {enabledNormalIcon
            ? icon && <Entypo style={{ marginRight: 7 }} size={14} color="#333" name={icon} />
            : icon && <Icon style={{ marginRight: 7 }} size={12} color="#333" name={icon} />}
        <Text style={styles.itemValue}>{content}</Text>
    </View>
);

export default RequestInfoItem;

const styles = StyleSheet.create({
    itemInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3
    },
    infoTitle: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#26324A"
    },
    itemValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#4d5970"
    }
});
