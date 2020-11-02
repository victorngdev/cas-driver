import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./custom-button.comonent";

const GroupButton = ({ items }) => (
    <View style={styles.groupAction}>
        {items.map(({ itemId, ...otherProps }) => (
            <CustomButton key={itemId} {...otherProps} />
        ))}
    </View>
);

export default GroupButton;

const styles = StyleSheet.create({
    groupAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 10
    }
});
