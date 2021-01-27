import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectRequestCount } from "../redux/request/request.selectors";
import { selectCurrentAmbulance } from "../redux/ambulance/ambulance.selectors";

const HomeDriverInfo = ({
    currentAmbulance,
    requestCount,
    addressValue,
    toggleSettingSheet,
    toggleRequestSheet,
    navigation
}) => {
    const registered = currentAmbulance && currentAmbulance.ambulance_status === "ACTIVE";
    const confirming = currentAmbulance && currentAmbulance.ambulance_status === "CONFIRMING";

    return (
        <>
            <View style={styles.container}>
                <View style={styles.currentLocation}>
                    <Text style={styles.locationTitle}>Vị trí của bạn</Text>
                    <Text style={styles.value}>{addressValue}</Text>
                </View>
                {registered ? (
                    <TouchableOpacity style={styles.action} onPress={toggleSettingSheet}>
                        <Icon style={styles.icon} size={18} name="ios-settings" />
                        <Text style={[styles.setting, { marginVertical: 10, paddingVertical: 10 }]}>
                            Thiết lập nhận yêu cầu
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={[
                            styles.message,
                            { marginVertical: 15, width: "100%", textAlign: "center" }
                        ]}
                    >
                        {confirming
                            ? "Yêu cầu đăng ký xe đang chờ phê duyệt!"
                            : "Bạn cần đăng ký xe để nhận yêu cầu"}
                    </Text>
                )}
            </View>
            <View style={[styles.container, styles.requestInfo]}>
                {registered ? (
                    <TouchableOpacity onPress={toggleRequestSheet}>
                        <Text style={styles.message}>
                            {requestCount
                                ? `${requestCount} yêu cầu đang chờ xác nhận`
                                : "Không có yêu cầu mới"}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.action}
                        onPress={() => navigation.navigate("Đăng ký xe")}
                    >
                        <Text
                            style={[styles.setting, { paddingVertical: 10, paddingHorizontal: 65 }]}
                        >
                            {confirming ? "Xem thông tin đăng ký" : "Đăng ký xe"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    requestCount: selectRequestCount,
    currentAmbulance: selectCurrentAmbulance
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
        paddingVertical: 7,
        alignItems: "center"
    },
    message: {
        fontFamily: "Texgyreadventor-bold",
        color: "#444444",
        paddingVertical: 6
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
    },
    registered: {
        fontFamily: "Texgyreadventor-bold",
        color: "#333",
        fontSize: 13,
        backgroundColor: "#e7ecf9"
    }
});
