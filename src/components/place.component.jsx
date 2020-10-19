import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const Place = ({ place: { name, address, date, time }, icon }) => (
    <View style={styles.place}>
        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
        <View style={styles.location}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.dateTime}>
                <View style={styles.item}>
                    <Image style={styles.icon} source={require("../../assets/icons/date-icon.png")} />
                    <Text style={styles.value}>{date}</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.icon} source={require("../../assets/icons/time-icon.png")} />
                    <Text style={styles.value}>{time}</Text>
                </View>
            </View>
        </View>
    </View>
);

export default Place;

const styles = StyleSheet.create({
    place: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        opacity: 0.75,
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    name: {
        fontSize: 14,
        color: "#26324A",
        fontFamily: "Texgyreadventor-bold"
    },
    address: {
        fontSize: 12,
        color: "#4F5C77",
        marginBottom: 5,
        fontFamily: "Texgyreadventor-regular"
    },
    dateTime: {
        width: "80%",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center"
    },
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    value: {
        color: "#26324A",
        fontSize: 13,
        fontFamily: "Texgyreadventor-regular"
    }
});
