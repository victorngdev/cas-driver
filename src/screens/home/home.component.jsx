import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { useDocumentData } from "react-firebase-hooks/firestore";

import {
    finishRequestFirestore,
    firestore,
    initLocation,
    syncLocationToRequest,
    updateRequest
} from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import {
    selectCurrentRequest,
    selectIsAccepted,
    selectIsArrived
} from "../../redux/request/request.selectors";
import {
    acceptRequest,
    cancelRequest,
    clearRequest,
    fetchRequest,
    finishRequest,
    pickedPatient
} from "../../redux/request/request.actions";

import BackgroundImage from "../../components/background-screen.component";
import HomeHeader from "../../components/home-header.component";
import HomeDriverInfo from "../../components/home-driver-info.component";
import RejectModal from "../../components/reject-modal.component";
import MessageModal from "../../components/message-modal.component";
import RequestModal from "../../components/request-modal.component";
import TransportationInfo from "../../components/transportation-info.component";
import ProblemModal from "../../components/problem-modal.component";

import styles from "./home.style";
import Map from "../../components/map.component";

const HomeScreen = ({
    navigation,
    currentUser,
    token,
    isAccepted,
    isArrived,
    fetchRequest,
    currentRequest,
    acceptRequest,
    cancelRequest,
    pickedPatient,
    finishRequest
}) => {
    const [isReady, setIsReady] = useState(false);
    const [title, setTitle] = useState("Chưa sẵn sàng");
    const [isToggle, setIsToggle] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [rejectOption, setRejectOption] = useState("Bấm nhầm chấp nhận yêu cầu");
    const [isProblem, setIsProblem] = useState(false);
    const [problem, setProblem] = useState("first");
    const [location, setLocation] = useState(null);
    const documentDriverRef = firestore.collection("drivers").doc(currentUser.username);
    const [request] = useDocumentData(documentDriverRef);

    const documentRequestRef = firestore
        .collection("requests")
        .doc((currentRequest && `${currentRequest.requestId}`) || "0");

    const [requestStatus] = useDocumentData(documentRequestRef);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        });
    }, []);

    useEffect(() => {
        if (isReady && request && request.requestId) {
            fetchRequest(token, request.requestId);
            setIsToggle(true);
        }
    }, [isReady, request]);

    useEffect(() => {
        if (
            requestStatus &&
            requestStatus.status &&
            requestStatus.driverId !== currentUser.userId
        ) {
            clearRequest();
            setIsToggle(false);
        }
    }, [requestStatus]);

    const toggleAction = () => {
        setIsReady(!isReady);
        setTitle(!isReady ? "Đang sẵn sàng" : "Chưa sẵn sàng");
    };

    const handleAccept = () => {
        setIsToggle(false);
        syncLocationToRequest(currentUser.username, location.latitude, location.longitude);
        updateRequest(
            currentUser.userId,
            currentUser.username,
            currentRequest.requestId,
            "accepted"
        );
        acceptRequest(token, currentUser.userId, currentRequest.requestId);
        setTitle("Đang đón bệnh nhân");
    };

    const handelReject = () => {
        cancelRequest(token, currentRequest.requestId, rejectOption);
        initLocation(currentUser.username, location.latitude, location.longitude);
        setIsReject(false);
    };

    const handleArrived = () => {
        pickedPatient(token, currentRequest.requestId);
        setTitle("Đang chở bệnh nhân");
    };

    const handleFinish = () => {
        initLocation(currentUser.username, location.latitude, location.longitude);
        finishRequest(token, currentRequest.requestId);
        finishRequestFirestore(currentRequest.requestId);
        setIsFinish(false);
    };

    const handleReport = () => {
        cancelRequest(token, currentRequest.requestId, problem);
        initLocation(currentUser.username, location.latitude, location.longitude);
        setIsProblem(false);
    };

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flex: 1 }}>
                    <HomeHeader
                        title={title}
                        isReady={isReady}
                        toggleAction={toggleAction}
                        navigation={navigation}
                    />
                </View>
                <RejectModal
                    rejectOption={rejectOption}
                    setRejectOption={setRejectOption}
                    isReject={isReady}
                    isVisible={isReject}
                    setIsReject={setIsReject}
                    handleReject={() => handelReject()}
                />
                {currentRequest && (
                    <RequestModal handleAccept={handleAccept} isVisible={isToggle} />
                )}
                <MessageModal action={handleFinish} isVisible={isFinish} />
                <ProblemModal
                    isVisible={isProblem}
                    setIsProblem={setIsProblem}
                    handleReport={handleReport}
                    problemOption={problem}
                    setProblemOption={setProblem}
                />
                {/* Map screen */}
                <View style={isAccepted ? (isArrived ? { flex: 6 } : { flex: 5 }) : { flex: 7 }}>
                    <Map source={location} setLocation={setLocation} />
                </View>
                {!isAccepted ? (
                    <View style={{ flex: 2 }}>
                        <HomeDriverInfo
                            ratingLevel={5}
                            addressName="Vị trí hiện tại"
                            addressValue="1141/15/7, Nguyễn Ảnh Thủ, P. Trung Mỹ Tây, Quận 12"
                        />
                    </View>
                ) : (
                    <TransportationInfo
                        isArrived={isArrived}
                        request={currentRequest}
                        handleArrived={handleArrived}
                        setIsFinish={setIsFinish}
                        setIsReject={setIsReject}
                        setIsProblem={setIsProblem}
                    />
                )}
            </BackgroundImage>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    currentRequest: selectCurrentRequest,
    currentUser: selectCurrentUser,
    isAccepted: selectIsAccepted,
    isArrived: selectIsArrived
});

const mapDispatchToProps = dispatch => ({
    fetchRequest: (token, requestId) => dispatch(fetchRequest(token, requestId)),
    acceptRequest: (token, driverId, requestId) =>
        dispatch(acceptRequest(token, driverId, requestId)),
    clearRequest: () => dispatch(clearRequest()),
    cancelRequest: (token, requestId, reason) => dispatch(cancelRequest(token, requestId, reason)),
    pickedPatient: (token, requestId) => dispatch(pickedPatient(token, requestId)),
    finishRequest: (token, requestId) => dispatch(finishRequest(token, requestId))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
