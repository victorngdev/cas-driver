import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import LabelIcon from "./label-icon.component";

const screen = Dimensions.get("screen");
const widthDevice = screen.width;
const heightDevice = screen.height;

const HistoryComponent = ({ image_url, title, address, goToDetails }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchButton} onPress={goToDetails}>
                <View style={{ width: "25%" }}>
                    <Image source={{ uri: image_url }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{address}</Text>
                    <View style={styles.container_date_time}>
                        <LabelIcon
                            iconSrc={require("../../assets/icons/date-icon.png")}
                            title="21/09/2020"
                            titleStyle={styles.date}
                        />
                        <LabelIcon
                            iconSrc={require("../../assets/icons/time-icon.png")}
                            title="10:50"
                            titleStyle={styles.time}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: widthDevice,
        height: heightDevice * 0.15,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    touchButton: {
        width: widthDevice,
        height: heightDevice * 0.15,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        height: widthDevice / 5,
        width: widthDevice / 5,
        borderRadius: 15
    },
    details: {
        width: "70%",
        backgroundColor: "#fff",
        opacity: 0.75,
        borderRadius: 10,
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        fontFamily: "Texgyreadventor-bold",
        color: "#26324A",
        marginBottom: 2
    },
    description: {
        fontSize: 14,
        color: "#3E5075",
        fontFamily: "Texgyreadventor-regular"
    },
    container_date_time: {
        flex: 1,
        flexDirection: "row"
    },
    date: {
        fontFamily: "Texgyreadventor-regular",
        width: 120,
        marginRight: 10
    },
    time: {
        fontFamily: "Texgyreadventor-regular"
    }
});

export default HistoryComponent;
