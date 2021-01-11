import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

import RequestInfoItem from "./request-info-item.component";

const place = {
    name: "Benh vien Tu Du",
    address: "284 Cống Quỳnh, P.Phạm Ngũ Lão, Q.1, Hồ Chí Minh"
};

const RequestItem = () => {
    const viewStateIcon = {
        false: require("../../assets/icons/details.png"),
        true: require("../../assets/icons/less.png")
    };
    const [viewState, setViewState] = useState(false);
    const [timer, setTimer] = useState(899);
    const [minute, setMinute] = useState(14);
    const [second, setSecond] = useState(59);

    useEffect(() => {
        const event = setInterval(() => {
            if (!timer) {
                setTimer(899);
            } else {
                setTimer(timer - 1);
            }

            setMinute(Math.floor(timer / 60));
            setSecond(Math.floor(timer % 60));
        }, 1000);

        return () => clearInterval(event);
    });

    return (
        <View style={styles.container}>
            <View style={styles.overview}>
                <View style={styles.overviewItem}>
                    <Text style={styles.title}>Cách bạn:</Text>
                    <View style={styles.distance}>
                        <Text style={styles.distanceValue}>15</Text>
                        <Text style={styles.distanceUnit}>km</Text>
                    </View>
                </View>
                <View style={[styles.overviewItem, { flexBasis: "32%" }]}>
                    <Text style={styles.title}>Loại yêu cầu:</Text>
                    <Text style={[styles.title, { fontSize: 9 }]}>14:38 10/01/2021</Text>
                    <View style={styles.requestType}>
                        <Icon size={14} color="#333" name="taxi" />
                        <Text style={styles.requestTypeValue}>Đi cấp cứu</Text>
                    </View>
                </View>
                <View style={[styles.overviewItem, { flex: 1 }]}>
                    <Text style={styles.timeout}>{`${String(minute).padStart(2, "0")}:${String(
                        second
                    ).padStart(2, "0")}`}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            <Text style={styles.action}>Chấp nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.clear}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.locationOverview}>
                <View style={styles.iconContainer}>
                    <Icon size={18} color="#09acfe" name="chevron-circle-up" />
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Text style={styles.requestDistanceValue}>25km</Text>
                    <Icon size={12} color="#555" name="ellipsis-v" />
                    <Icon size={18} color="#f9650c" name="chevron-circle-down" />
                </View>
                <View>
                    <View style={[styles.location, { marginBottom: 10 }]}>
                        <Text style={styles.name}>{place.name}</Text>
                        <Text style={styles.address}>{place.address}</Text>
                    </View>
                    <View style={styles.location}>
                        <Text style={styles.name}>{place.name}</Text>
                        <Text style={styles.address}>{place.address}</Text>
                    </View>
                </View>
            </View>
            {viewState && (
                <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.infoTitle}>Thông tin người gọi</Text>
                            <RequestInfoItem content="Ngô Hoàng Nam" icon="user-clock" />
                            <RequestInfoItem
                                content="0988635032"
                                icon="old-phone"
                                enabledNormalIcon
                            />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.infoTitle}>Thông tin người bệnh</Text>
                            <RequestInfoItem content="Trịnh Hoàng Kim Anh" icon="user-injured" />
                            <RequestInfoItem
                                content="0931738872"
                                icon="old-phone"
                                enabledNormalIcon
                            />
                        </View>
                    </View>
                    <Text style={styles.infoTitle}>Tình trạng</Text>
                    <RequestInfoItem content="Bị tai nạn giao thông rất nghiêm trọng" />
                    <Text style={styles.infoTitle}>Ghi chú</Text>
                    <RequestInfoItem content="Cần dụng cụ sơ cứu tại chỗ" />
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

export default RequestItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#b3b9c8",
        marginTop: 10
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
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginBottom: 5
    },
    overviewItem: {
        flexBasis: "23%"
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
