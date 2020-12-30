import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeDriverInfo = ({ addressName, addressValue }) => (
    <View style={styles.driverInfo}>
        <View style={styles.currentLocation}>
            <Text style={styles.locationTitle}>{addressName}</Text>
            <Text style={styles.value}>{addressValue}</Text>
        </View>
    </View>
);

export default HomeDriverInfo;

const styles = StyleSheet.create({
    driverInfo: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    },
    currentLocation: {
        flex: 4,
        // flexBasis: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    locationTitle: {
        fontSize: 16,
        marginVertical: 5,
        fontFamily: "Texgyreadventor-bold",
        color: "#444444"
    },
    value: {
        fontSize: 12,
        fontFamily: "Texgyreadventor-regular",
        color: "#444444"
    },
    rating: {
        // flexBasis: "25%",
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    ratingTitle: {
        fontSize: 16,
        fontFamily: "Texgyreadventor-bold",
        color: "#444444",
        textAlign: "center"
    }
});
