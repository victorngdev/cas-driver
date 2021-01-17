import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import getDistance from "geolib/es/getDistance";
import Icon from "react-native-vector-icons/FontAwesome5";

import RequestInfoItem from "../components/request-info-item.component";
import Rating from "../components/rating.component";

const HistoryItem = ({ label, content }) => (
    <>
        <Text style={styles.infoTitle}>{label}</Text>
        <RequestInfoItem content={content} />
    </>
);

const HistoryComponent = ({
    pickUp,
    destination,
    isEmergency,
    isOther,
    request_status,
    patientName,
    patientPhone,
    requester,
    morbidity,
    morbidityNote,
    feedbackDriver,
    ratingDriver
}) => {
    const viewStateIcon = {
        false: require("../../assets/icons/details.png"),
        true: require("../../assets/icons/less.png")
    };
    const mapStatus = {
        SUCCESS: "Thành công",
        FAIL: "Không thành công"
    };
    const [viewState, setViewState] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.overview}>
                <View style={[styles.overviewItem, { flexBasis: "25%", marginRight: 30 }]}>
                    <Text style={styles.title}>Điểm đón:</Text>
                    <Text style={[styles.title, { fontSize: 9 }]}>
                        {pickUp.time} {pickUp.date}
                    </Text>
                    <View style={styles.requestType}>
                        <Icon size={14} color="#333" name="taxi" />
                        <Text style={styles.requestTypeValue}>
                            {isEmergency ? "Đi cấp cứu" : "Đi về nhà"}
                        </Text>
                    </View>
                </View>
                <View style={[styles.overviewItem, { flexBasis: "35%" }]}>
                    <Text style={styles.title}>Điểm đến:</Text>
                    <Text style={[styles.title, { fontSize: 9 }]}>
                        {destination.time} {destination.date}
                    </Text>
                    <View style={styles.requestType}>
                        <Icon size={14} color="#333" name="street-view" />
                        <Text style={[styles.requestTypeValue, { backgroundColor: "#118539" }]}>
                            {mapStatus[request_status]}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Lộ trình:</Text>
                    <View style={styles.distance}>
                        <Text style={styles.distanceValue}>
                            {(
                                getDistance(
                                    { latitude: pickUp.latitude, longitude: pickUp.longitude },
                                    {
                                        latitude: destination.latitude,
                                        longitude: destination.longitude
                                    }
                                ) / 1000
                            ).toFixed(1)}
                        </Text>
                        <Text style={styles.distanceUnit}>km</Text>
                    </View>
                </View>
            </View>
            <View style={styles.locationOverview}>
                <View style={styles.iconContainer}>
                    <Icon size={18} color="#09acfe" name="chevron-circle-up" />
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Icon size={18} color="#f9650c" name="chevron-circle-down" />
                </View>
                <View>
                    <View style={[styles.location, { marginBottom: 10 }]}>
                        <Text style={styles.name}>{pickUp.name}</Text>
                        <Text style={styles.address}>{pickUp.address}</Text>
                    </View>
                    <View style={styles.location}>
                        <Text style={styles.name}>{destination.name}</Text>
                        <Text style={styles.address}>{destination.address}</Text>
                    </View>
                </View>
            </View>
            {viewState && (
                <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.infoTitle}>Thông tin người gọi</Text>
                            <RequestInfoItem content={requester.displayName} icon="user-clock" />
                            <RequestInfoItem
                                content={requester.phone}
                                icon="old-phone"
                                enabledNormalIcon
                            />
                        </View>
                        {isOther && (
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.infoTitle}>Thông tin người bệnh</Text>
                                <RequestInfoItem
                                    content={patientName || "Không có thông tin"}
                                    icon="user-injured"
                                />
                                <RequestInfoItem
                                    content={patientPhone || "Không có thông tin"}
                                    icon="old-phone"
                                    enabledNormalIcon
                                />
                            </View>
                        )}
                    </View>
                    {morbidity && <HistoryItem label="Tình trạng" content={morbidity} />}
                    {morbidityNote && <HistoryItem label="Ghi chú" content={morbidityNote} />}
                    {(ratingDriver || feedbackDriver) && (
                        <>
                            <Text style={styles.infoTitle}>Đánh giá</Text>
                            <Rating level={ratingDriver} size={8} />
                            <RequestInfoItem
                                content={feedbackDriver || "Không có đánh giá về bạn"}
                            />
                        </>
                    )}
                </>
            )}
            <TouchableOpacity
                onPress={() => setViewState(!viewState)}
                style={{ alignItems: "center", marginTop: 8 }}
            >
                <Image style={styles.more} source={viewStateIcon[viewState]} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default HistoryComponent;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b3b9c8",
        marginVertical: 5
    },
    locationOverview: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: 10
    },
    location: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    name: {
        color: "#26324a",
        fontFamily: "Texgyreadventor-bold"
    },
    address: {
        fontSize: 10,
        color: "#6c7fa6",
        marginBottom: 5,
        fontFamily: "Texgyreadventor-bold"
    },
    overview: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 5
    },
    overviewItem: {
        justifyContent: "flex-start"
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 11,
        color: "#6c7fa6"
    },
    distance: {
        flexDirection: "row",
        alignItems: "flex-end",
        height: 35
    },
    distanceValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 23
    },
    distanceUnit: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        lineHeight: 26,
        color: "#333"
    },
    requestType: {
        flexDirection: "row",
        alignItems: "center"
    },
    feedback: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 10
    },
    requestTypeValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 10,
        marginLeft: 2,
        backgroundColor: "#ff9d00",
        color: "#fff",
        paddingHorizontal: 8,
        borderRadius: 8
    },
    timeout: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 18,
        color: "#09acfe"
    },
    infoTitle: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#6c7fa6",
        marginTop: 5
    },
    more: {
        width: 55,
        height: 9
    },
    action: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        paddingHorizontal: 13,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: "rgba(52, 133, 13, 0.2)",
        color: "#34850d"
    },
    clear: {
        color: "#e7524d",
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: "rgba(231, 82, 77, 0.2)"
    }
});
