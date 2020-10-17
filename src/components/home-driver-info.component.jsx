import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Rating from "./rating.component";

const HomeDriverInfo = ({ ratingLevel, addressName, addressValue }) => (
    <View style={styles.driverInfo}>
        <View style={styles.rating}>
            <Text style={styles.ratingTitle}> Đánh giá</Text>
            <Rating level={ratingLevel} size={13} />
        </View>
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
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    },
    currentLocation: {
        flexBasis: "70%",
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
        flexBasis: "25%",
        justifyContent: "center"
    },
    ratingTitle: {
        fontSize: 16,
        fontFamily: "Texgyreadventor-bold",
        marginVertical: 5,
        color: "#444444"
    }
});
