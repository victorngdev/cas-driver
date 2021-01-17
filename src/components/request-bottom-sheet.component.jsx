import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { acceptRequest, fetchRequests } from "../redux/request/request.actions";
import { clearStatusCode } from "../redux/message/message.action";
import { selectCurrentUser, selectToken } from "../redux/user/user.selectors";
import { selectRequestList } from "../redux/request/request.selectors";
import { selectStatusCode } from "../redux/message/message.selectors";
import { firestore } from "../firebase/firebase.utils";
import { configureTask } from "../uitls/background-task.services";

import RequestItem from "./request-item.component";
import ArrageContainer from "./arrage-container.component";

const RequestBottomSheet = ({
    token,
    currentUser,
    requestRef,
    requestList,
    statusCode,
    fetchRequests,
    acceptRequest,
    clearStatusCode,
    navigation
}) => {
    const [sortBy, setSortBy] = useState("Khoảng cách");
    const [arrage, setArrage] = useState("Giảm dần");
    const [opacity, setOpacity] = useState(0);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const requestDocumentRef = firestore.collection("confirmations").doc(currentUser.username);
    const [requests] = useDocumentData(requestDocumentRef);

    useEffect(() => {
        initLocation();
        fetchRequestsInit();
        const timer = setInterval(() => {
            initLocation();
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (statusCode === 206) {
            clearStatusCode();
            configureTask({ username: currentUser.username, inRequest: true });
            setLoading(false);
            requestRef.current.snapTo(2);
            navigation.replace("Request");
        }
    }, [statusCode]);

    useEffect(() => {
        fetchRequestsInit();
    }, [requests]);

    const initLocation = () => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        });
    };

    const fetchRequestsInit = () => {
        if (requests && requests.requestIds) {
            const requestIds = requests.requestIds;
            const preRequestIds =
                (requestList && requestList.map(request => request.requestId)) || [];
            const difference = findDifference(requestIds, preRequestIds);

            difference.length && fetchRequests(token, difference);
        }
    };

    const findDifference = (source, target) => {
        return (target.length && source.filter(d => !target.some(pd => pd === d))) || source;
    };

    const handleAcceptRequest = request => {
        setLoading(true);
        setTimeout(() => {
            acceptRequest(token, currentUser.id, request.requestId, currentUser.username, request);
        }, 1500);
    };

    const renderContent = () => (
        <ScrollView
            style={styles.sheet}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
            scrollEnabled={!loading}
        >
            {loading && (
                <View style={[styles.spinner, { height: requestList.length > 2 ? "80%" : "100%" }]}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require("../../assets/icons/loading.gif")}
                    />
                </View>
            )}
            {requestList.map(request => (
                <RequestItem
                    location={location}
                    onAccept={() => handleAcceptRequest(request)}
                    key={request.requestId}
                    request={request}
                />
            ))}
        </ScrollView>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={{ width: 80 }}>
                <Text style={styles.action}>Xóa tất cả</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", position: "relative" }}>
                <Icon
                    style={{ position: "absolute", top: 32, elevation: 10, opacity: opacity }}
                    size={20}
                    color="#555990"
                    name="caretup"
                />
                <TouchableOpacity onPress={() => setOpacity(opacity ? 0 : 1)}>
                    <Text style={styles.arrage}>Sắp xếp</Text>
                </TouchableOpacity>
                <View style={[styles.arrangeOption, { opacity: opacity }]}>
                    <ArrageContainer
                        title="Sắp xếp theo"
                        current={sortBy}
                        onValueChange={setSortBy}
                        options={["Khoảng cách", "Loại yêu cầu", "Thời gian chờ"]}
                    />
                    <ArrageContainer
                        title="Thứ tự"
                        current={arrage}
                        onValueChange={setArrage}
                        options={["Tăng dần", "Giảm dần"]}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ width: 80, alignItems: "flex-end" }}
                onPress={() => requestRef.current.snapTo(2)}
            >
                <Icon size={18} name="close" />
            </TouchableOpacity>
        </View>
    );

    return (
        <BottomSheet
            ref={requestRef}
            snapPoints={["85%", "45%", 0]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={2}
            enabledContentGestureInteraction={false}
        />
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken,
    requestList: selectRequestList,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    fetchRequests: (token, requestIds) => dispatch(fetchRequests(token, requestIds)),
    acceptRequest: (token, driverId, requestId, username, request) =>
        dispatch(acceptRequest(token, driverId, requestId, username, request)),
    clearStatusCode: () => dispatch(clearStatusCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestBottomSheet);

const styles = StyleSheet.create({
    sheet: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        display: "flex"
    },
    spinner: {
        position: "absolute",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 10
    },
    action: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        paddingTop: 10,
        paddingBottom: 5,
        flexBasis: "25%"
    },
    arrage: {
        fontFamily: "Texgyreadventor-regular",
        backgroundColor: "rgba(85, 89, 144, 0.25)",
        paddingVertical: 7,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    arrangeOption: {
        flexDirection: "row",
        position: "absolute",
        top: 45,
        justifyContent: "space-between",
        backgroundColor: "#555990",
        elevation: 8,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#757f80"
    }
});
