import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const Place = ({ place: { name, address }, icon, title }) => (
    <View style={styles.place}>
        <View style={styles.icon}>
            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
            {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>
        <View style={styles.location}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
        </View>
    </View>
);

export default Place;

const styles = StyleSheet.create({
    place: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    icon: {
        flexBasis: "25%",
        alignItems: "center"
    },
    title: {
        color: "#26324A",
        fontFamily: "Texgyreadventor-regular",
        fontSize: 12
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 5
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
    }
});
