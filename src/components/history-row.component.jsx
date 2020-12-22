import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";

import LabelIcon from "./label-icon.component";

const screen = Dimensions.get("screen");
const widthDevice = screen.width;
const heightDevice = screen.height;

const HistoryComponent = ({
    requestId,
    userImage,
    destinationName,
    status,
    address,
    dateCreated,
    timeCreated,
    onPress
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchButton} onPress={onPress}>
                <View style={{ flexBasis: "20%", marginLeft: 15 }}>
                    <Image source={{ uri: userImage }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{destinationName}</Text>
                        <Text style={[styles.status, status !== "Thành công" && styles.fail]}>
                            {status}
                        </Text>
                    </View>
                    <Text style={styles.description}>{address}</Text>
                    <View style={styles.container_date_time}>
                        <LabelIcon
                            iconSrc={require("../../assets/icons/date-icon.png")}
                            title={dateCreated}
                            titleStyle={styles.date}
                        />
                        <LabelIcon
                            iconSrc={require("../../assets/icons/time-icon.png")}
                            title={timeCreated}
                            titleStyle={styles.time}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default HistoryComponent;

const styles = StyleSheet.create({
    container: {
        width: widthDevice * 0.95,
        height: heightDevice * 0.15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: 10
    },
    touchButton: {
        width: widthDevice,
        height: heightDevice * 0.15,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 35
    },
    details: {
        flexBasis: "70%",
        opacity: 0.75,
        borderRadius: 10,
        paddingLeft: 10
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        color: "#26324A",
        marginBottom: 2
    },
    description: {
        fontSize: 12,
        color: "#3E5075",
        fontFamily: "Texgyreadventor-regular"
    },
    container_date_time: {
        flexDirection: "row",
        marginTop: 5
    },
    date: {
        fontFamily: "Texgyreadventor-regular",
        width: 120,
        marginRight: 10
    },
    time: {
        fontFamily: "Texgyreadventor-regular"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    status: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 12,
        borderWidth: 0.5,
        paddingHorizontal: 5,
        borderRadius: 15,
        marginLeft: 5,
        borderColor: "#00960F",
        color: "#00960F"
    },
    fail: {
        borderColor: "#FFAB2E",
        color: "#FFAB2E"
    }
});
