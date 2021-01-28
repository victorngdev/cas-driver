import React, { useState, useEffect } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import getDistance from "geolib/es/getDistance";

import { selectToken, selectUsername } from "../redux/user/user.selectors";
import { selectRequestTimeout } from "../redux/request/request.selectors";
import { rejectRequest } from "../redux/request/request.actions";

import RequestInfoItem from "./request-info-item.component";
import Spinner from "./spinner.component";

const RequestItem = ({
    token,
    username,
    request: {
        requestId,
        pickUp,
        createdDate,
        createdTime,
        destination,
        healthInformation,
        isEmergency,
        isOther,
        morbidity,
        morbidityNote,
        patientName,
        patientPhone,
        requester,
        distance
    },
    onAccept,
    rejectRequest,
    requestTimeout
}) => {
    const viewStateIcon = {
        false: require("../../assets/icons/details.png"),
        true: require("../../assets/icons/less.png")
    };
    const [viewState, setViewState] = useState(false);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rDistance, setRDistance] = useState(0);

    useEffect(() => {
        const current = new Date().toISOString();
        const start = `${createdDate}T${createdTime}Z`;
        const diff = 25200 - (new Date(start).getTime() - new Date(current).getTime()) / 1000 - 3;
        const distance =
            getDistance(
                { latitude: destination.latitude, longitude: destination.longitude },
                { latitude: pickUp.latitude, longitude: pickUp.longitude }
            ) / 1000;

        setRDistance(distance.toFixed(1));
        setTimer(Number.parseInt(requestTimeout) * 60 - Math.round(diff));
    }, []);

    const children = remainingTime => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            {loading && <Spinner style={{ height: "115%", width: "110%" }} />}
            <View style={styles.overview}>
                <View style={{ marginRight: 5 }}>
                    <Text style={styles.title}>Cách bạn:</Text>
                    <View style={styles.distance}>
                        <Text style={styles.distanceValue}>{distance ? distance : "..."}</Text>
                        <Text style={styles.distanceUnit}>km</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Loại yêu cầu:</Text>
                    <Text style={[styles.title, { fontSize: 9 }]}>{`${createdTime} ${new Date(
                        createdDate
                    ).toLocaleDateString()}`}</Text>
                    <View style={styles.requestType}>
                        <Icon size={14} color="#333" name="taxi" />
                        <Text
                            style={[
                                styles.requestTypeValue,
                                !isEmergency && { backgroundColor: "#6ad4d2" }
                            ]}
                        >
                            {isEmergency ? "Đến bệnh viện" : "Đi về nhà"}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    {timer > 0 && (
                        <CountdownCircleTimer
                            isPlaying
                            duration={Number.parseInt(requestTimeout) * 60}
                            initialRemainingTime={timer}
                            strokeWidth={3}
                            size={55}
                            colors="#09acfe"
                        >
                            {({ remainingTime }) => (
                                <Animated.Text style={styles.timeout}>
                                    {children(remainingTime)}
                                </Animated.Text>
                            )}
                        </CountdownCircleTimer>
                    )}
                    <View style={{ flexDirection: "column", marginLeft: 2 }}>
                        <TouchableOpacity onPress={onAccept}>
                            <Text style={styles.action}>Chấp nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true);
                                rejectRequest(token, [requestId], username);
                            }}
                        >
                            <Text style={[styles.action, { color: "#666", marginTop: 3 }]}>
                                Xóa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.locationOverview}>
                <View style={styles.iconContainer}>
                    <Icon size={18} color="#09acfe" name="chevron-circle-up" />
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Text style={styles.requestDistanceValue}>{rDistance}km</Text>
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Icon size={18} color="#f9650c" name="chevron-circle-down" />
                </View>
                <View style={{ width: "90%" }}>
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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
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
                                    content={
                                        isOther
                                            ? patientName || "Không có thông tin"
                                            : requester.displayName
                                    }
                                    icon="user-injured"
                                />
                                <RequestInfoItem
                                    content={
                                        isOther
                                            ? patientPhone || "Không có thông tin"
                                            : requester.phone
                                    }
                                    icon="old-phone"
                                    enabledNormalIcon
                                />
                            </View>
                        )}
                    </View>
                    {healthInformation && (
                        <>
                            <Text style={styles.infoTitle}>Thông tin sức khỏe</Text>
                            <RequestInfoItem content={healthInformation} />
                        </>
                    )}
                    {morbidity && (
                        <>
                            <Text style={styles.infoTitle}>Tình trạng</Text>
                            <RequestInfoItem content={morbidity} />
                        </>
                    )}
                    {morbidityNote && (
                        <>
                            <Text style={styles.infoTitle}>Ghi chú</Text>
                            <RequestInfoItem content={morbidityNote} />
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

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    username: selectUsername,
    requestTimeout: selectRequestTimeout
});

const mapDispatchToProps = dispatch => ({
    rejectRequest: (token, requestIds, username) =>
        dispatch(rejectRequest(token, requestIds, username))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        paddingBottom: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b3b9c8",
        marginTop: 10,
        overflow: "hidden"
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
        flexBasis: "80%",
        fontSize: 10,
        color: "#6c7fa6",
        marginBottom: 5,
        fontFamily: "Texgyreadventor-bold"
    },
    overview: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginBottom: 5
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 11,
        color: "#6c7fa6"
    },
    requestDistanceValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 10,
        lineHeight: 14,
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
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: "#f5f5f3",
        textAlign: "center",
        color: "#09acfe"
    }
});
