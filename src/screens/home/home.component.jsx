import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import * as BackgroundFetch from "expo-background-fetch";

import {
    finishRequestFirestore,
    firestore,
    initLocation,
    rejectRequest,
    syncLocationToRequest,
    updateRequest,
    clearConfirmationRequest,
    addToBlacklist,
    pickUpPatient
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
    fetchConfig,
    fetchRequest,
    finishRequest,
    pickedPatient
} from "../../redux/request/request.actions";
import { handleApprovedRegisterAmbulance } from "../../redux/user/user.actions";
import { getAmbulanceNote } from "../../redux/ambulance/ambulance.actions";
import messages from "../../uitls/message.data";
import { configureTask } from "../../uitls/background-task.services";
import { selectCurrentAmbulance } from "../../redux/ambulance/ambulance.selectors";
import { selectStatusCode } from "../../redux/message/message.selectors";

import BackgroundImage from "../../components/background-screen.component";
import HomeHeader from "../../components/home-header.component";
import HomeDriverInfo from "../../components/home-driver-info.component";
import RejectModal from "../../components/reject-modal.component";
import MessageModal from "../../components/message-modal.component";
import RequestModal from "../../components/request-modal.component";
import TransportationInfo from "../../components/transportation-info.component";
import ProblemModal from "../../components/problem-modal.component";
import Map from "../../components/map.component";
import Message from "../../components/message.component";

import styles from "./home.style";

Geocoder.init("AIzaSyA3wjgHRZGPb4I96XDM-Eev7f1QQM_Mpp8", { language: "vi" });

const HomeScreen = ({
    navigation,
    currentUser,
    token,
    isAccepted,
    isArrived,
    fetchRequest,
    currentRequest,
    currentAmbulance,
    acceptRequest,
    cancelRequest,
    pickedPatient,
    finishRequest,
    clearRequest,
    handleApprovedRegisterAmbulance,
    getAmbulanceNote,
    statusCode,
    fetchConfig
}) => {
    const [isReady, setIsReady] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [isProblem, setIsProblem] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [_isAccepted, setIsAccepted] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [title, setTitle] = useState("Chưa sẵn sàng");
    const [rejectOption, setRejectOption] = useState("Bấm nhầm chấp nhận yêu cầu");
    const [problem, setProblem] = useState("first");
    const [location, setLocation] = useState(null);
    const documentConfirmationRef = firestore.collection("confirmations").doc(currentUser.username);
    const [confirmation] = useDocumentData(documentConfirmationRef);

    const documentRequestRef = firestore
        .collection("requests")
        .doc((currentRequest && `${currentRequest.requestId}`) || "0");

    const [requestStatus] = useDocumentData(documentRequestRef);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setLocation(latitude, longitude);
        });
        initBackgroundTask(false);
    }, []);

    useEffect(() => {
        if (isReady && confirmation && confirmation.requestId) {
            fetchConfig(token);
            firestore
                .collection("requests")
                .doc(`${confirmation.requestId}`)
                .get()
                .then(result => {
                    const { status } = result.data();
                    if (!status) {
                        fetchRequest(token, confirmation.requestId);
                        syncLocationToRequest(
                            currentUser.username,
                            location.latitude,
                            location.longitude
                        );
                        setIsToggle(true);
                        initBackgroundTask(true);
                    }
                });
        }
        if (confirmation && !confirmation.requestId && currentRequest) {
            clearRequest();
            initLocation(currentUser.username, location.latitude, location.longitude);
        }
        if (confirmation && confirmation.confirmationStatus) {
            setConfirmationStatus(confirmation.confirmationStatus);
        }
    }, [isReady, confirmation]);

    useEffect(() => {
        if (!requestStatus) return;
        if (
            currentRequest &&
            requestStatus.status === "accepted" &&
            requestStatus.driverId !== currentUser.userId
        ) {
            clearConfirmationRequest(currentUser.username);
            initLocation(currentUser.username, location.latitude, location.longitude);
            clearRequest();
            setIsAccepted(true);
        }
        if (currentRequest && requestStatus.status === "cancelled") {
            clearConfirmationRequest(currentUser.username);
            initLocation(currentUser.username, location.latitude, location.longitude);
            clearRequest();
            setIsCancelled(true);
        }
    }, [requestStatus]);

    useEffect(() => {
        if (!currentUser.registered) {
            setIsReady(false);
            setTitle("Chưa sẵn sàng");
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser.registered) {
            setTitle(isReady ? "Đang sẵn sàng" : "Chưa sẵn sàng");
            if (isReady) {
                Location.startLocationUpdatesAsync("syncLocation", {
                    accuracy: Location.Accuracy.Balanced,
                    distanceInterval: 1,
                    timeInterval: 5
                });
                configureTask({ currentUser, isReady });
            } else {
                Location.stopLocationUpdatesAsync("syncLocation");
                syncLocationToRequest(currentUser.username, 1, 1);
            }
        } else {
            if (isReady) setIsValid(true);
            setIsReady(false);
        }
    }, [isReady]);

    const initBackgroundTask = async inRequest => {
        configureTask({ currentUser, isReady, inRequest });
        await Location.startLocationUpdatesAsync("syncLocation", {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 1,
            timeInterval: 5
        });
    };

    const handleApproved = () => {
        setConfirmationStatus(null);
        handleApprovedRegisterAmbulance();
        clearConfirmationRequest(currentUser.username);
    };

    const handleRejected = () => {
        setConfirmationStatus(null);
        clearConfirmationRequest(currentUser.username);
        getAmbulanceNote(token, currentAmbulance.ambulanceId);
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

    const handleUnaccept = () => {
        addToBlacklist(currentUser.username, currentRequest.requestId);
        clearRequest();
        clearConfirmationRequest(currentUser.username);
    };

    const handleReject = () => {
        cancelRequest(token, currentRequest.requestId, rejectOption);
        initLocation(currentUser.username, location.latitude, location.longitude);
        clearConfirmationRequest(currentUser.username);
        rejectRequest(currentRequest.requestId);
        setIsReject(false);
    };

    const handleArrived = () => {
        pickUpPatient(currentRequest.requestId);
        pickedPatient(token, currentRequest.requestId);
        setTitle("Đang chở bệnh nhân");
    };

    const handleFinish = () => {
        finishRequest(token, currentRequest.requestId);
        finishRequestFirestore(currentRequest.requestId);
        initLocation(currentUser.username, location.latitude, location.longitude);
        clearConfirmationRequest(currentUser.username);
        setIsFinish(false);
    };

    const handleReport = () => {
        cancelRequest(token, currentRequest.requestId, problem);
        initLocation(currentUser.username, location.latitude, location.longitude);
        clearConfirmationRequest(currentUser.username);
        rejectRequest(currentRequest.requestId);
        setIsProblem(false);
    };

    return (
        <View style={styles.container}>
            {location && (
                <BackgroundImage>
                    <View style={{ flex: 1 }}>
                        <HomeHeader
                            title={title}
                            isReady={isReady}
                            toggleAction={() => setIsReady(!isReady)}
                            navigation={navigation}
                        />
                    </View>
                    <Message
                        message={messages[statusCode]}
                        visible={statusCode}
                        isMessage={statusCode < 400}
                    />
                    {isReject && (
                        <RejectModal
                            rejectOption={rejectOption}
                            setRejectOption={setRejectOption}
                            isReject={isReady}
                            setIsReject={setIsReject}
                            handleReject={handleReject}
                        />
                    )}
                    {currentRequest && isToggle && (
                        <RequestModal
                            id={currentRequest.requestId}
                            currentLocation={location}
                            handleUnaccept={handleUnaccept}
                            handleAccept={handleAccept}
                        />
                    )}
                    {confirmationStatus && (
                        <MessageModal
                            action={
                                confirmationStatus === "approved" ? handleApproved : handleRejected
                            }
                            content={messages[confirmationStatus]}
                        />
                    )}
                    {isFinish && <MessageModal action={handleFinish} content={messages.finish} />}
                    {isCancelled && (
                        <MessageModal
                            action={() => setIsCancelled(false)}
                            content={messages.cancelled}
                        />
                    )}
                    {_isAccepted && (
                        <MessageModal
                            action={() => setIsAccepted(false)}
                            content={messages.acceptedRequest}
                        />
                    )}
                    {isValid && (
                        <MessageModal action={() => setIsValid(false)} content={messages.ready} />
                    )}
                    {isProblem && (
                        <ProblemModal
                            setIsProblem={setIsProblem}
                            handleReport={handleReport}
                            problemOption={problem}
                            setProblemOption={setProblem}
                        />
                    )}
                    <View
                        style={isAccepted ? (isArrived ? { flex: 6 } : { flex: 10 }) : { flex: 13 }}
                    >
                        <Map source={location} setLocation={setLocation} />
                    </View>
                    {!isAccepted ? (
                        <View style={{ flex: 3 }}>
                            <HomeDriverInfo
                                addressName="Vị trí của bạn"
                                addressValue={location.address || ""}
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
            )}
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    currentRequest: selectCurrentRequest,
    currentUser: selectCurrentUser,
    isAccepted: selectIsAccepted,
    isArrived: selectIsArrived,
    currentAmbulance: selectCurrentAmbulance,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    fetchRequest: (token, requestId) => dispatch(fetchRequest(token, requestId)),
    acceptRequest: (token, driverId, requestId) =>
        dispatch(acceptRequest(token, driverId, requestId)),
    clearRequest: () => dispatch(clearRequest()),
    cancelRequest: (token, requestId, reason) => dispatch(cancelRequest(token, requestId, reason)),
    pickedPatient: (token, requestId) => dispatch(pickedPatient(token, requestId)),
    finishRequest: (token, requestId) => dispatch(finishRequest(token, requestId)),
    handleApprovedRegisterAmbulance: () => dispatch(handleApprovedRegisterAmbulance()),
    getAmbulanceNote: (token, ambulanceId) => dispatch(getAmbulanceNote(token, ambulanceId)),
    fetchConfig: token => dispatch(fetchConfig(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
