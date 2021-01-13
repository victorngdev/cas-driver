import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectRequestCount } from "../redux/request/request.selectors";

const HomeDriverInfo = ({ requestCount, addressValue, toggleSettingSheet, toggleRequestSheet }) => (
    <>
        <View style={styles.container}>
            <View style={styles.currentLocation}>
                <Text style={styles.locationTitle}>Vị trí của bạn</Text>
                <Text style={styles.value}>{addressValue}</Text>
            </View>
            <TouchableOpacity style={styles.action} onPress={toggleSettingSheet}>
                <Icon style={styles.icon} size={18} name="ios-settings" />
                <Text style={styles.setting}>Thiết lập nhận yêu cầu</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.container, styles.requestInfo]}>
            <TouchableOpacity onPress={toggleRequestSheet}>
                <Text style={styles.message}>{requestCount} yêu cầu đang chờ xác nhận</Text>
            </TouchableOpacity>
        </View>
    </>
);

const mapStateToProps = createStructuredSelector({
    requestCount: selectRequestCount
});

export default connect(mapStateToProps)(HomeDriverInfo);

const styles = StyleSheet.create({
    container: {
        width: "97%",
        height: "auto",
        flexDirection: "column",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 2,
        zIndex: 1
    },
    requestInfo: {
        paddingVertical: 15,
        alignItems: "center"
    },
    message: {
        fontFamily: "Texgyreadventor-bold",
        color: "#444444"
    },
    currentLocation: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    locationTitle: {
        fontSize: 14,
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
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    ratingTitle: {
        fontSize: 16,
        fontFamily: "Texgyreadventor-bold",
        color: "#444444",
        textAlign: "center"
    },
    action: {
        width: "100%",
        alignItems: "center",
        position: "relative",
        justifyContent: "center"
    },
    setting: {
        width: "95%",
        textAlign: "center",
        marginVertical: 10,
        paddingVertical: 10,
        backgroundColor: "#e7ecf9",
        borderRadius: 20,
        fontFamily: "Texgyreadventor-bold",
        color: "#333",
        fontSize: 13
    },
    icon: {
        position: "absolute",
        zIndex: 1,
        left: "22%"
    }
});
