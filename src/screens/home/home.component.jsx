import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";

import { firestore, clearConfirmationRequest } from "../../firebase/firebase.utils";
import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { selectCurrentRequest } from "../../redux/request/request.selectors";
import { clearRequest, fetchConfig, fetchRequest } from "../../redux/request/request.actions";
import { handleApprovedRegisterAmbulance } from "../../redux/user/user.actions";
import { getAmbulanceNote } from "../../redux/ambulance/ambulance.actions";
import { selectCurrentAmbulance } from "../../redux/ambulance/ambulance.selectors";
import { selectStatusCode } from "../../redux/message/message.selectors";
import { configureTask } from "../../uitls/background-task.services";
import messages from "../../uitls/message.data";

import HomeDriverInfo from "../../components/home-driver-info.component";
import MessageModal from "../../components/message-modal.component";
import Map from "../../components/map.component";
import Message from "../../components/message.component";
import RequestBottomSheet from "../../components/request-bottom-sheet.component";
import SettingBottomSheet from "../../components/setting-bottom-sheet.componet";
import Header from "../../components/header.component";

import styles from "./home.style";

Geocoder.init("AIzaSyA3wjgHRZGPb4I96XDM-Eev7f1QQM_Mpp8", { language: "vi" });

const HomeScreen = ({
    currentUser,
    token,
    currentRequest,
    currentAmbulance,
    handleApprovedRegisterAmbulance,
    getAmbulanceNote,
    statusCode,
    fetchConfig,
    navigation
}) => {
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const documentConfirmationRef = firestore.collection("confirmations").doc(currentUser.username);
    const [confirmation] = useDocumentData(documentConfirmationRef);
    const settingRef = useRef(null);
    const requestRef = useRef(null);

    const documentRequestRef = firestore
        .collection("requests")
        .doc((currentRequest && `${currentRequest.requestId}`) || "0");

    const [requestStatus] = useDocumentData(documentRequestRef);

    useEffect(() => {
        if (currentUser.registered) {
            Location.startLocationUpdatesAsync("syncLocation", {
                accuracy: Location.Accuracy.Balanced,
                distanceInterval: 1,
                timeInterval: 5
            });
            configureTask({ currentUser });
        }
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setLocation(latitude, longitude);
        });
        initBackgroundTask(false);
    }, []);

    useEffect(() => {
        if (confirmation && confirmation.requestId) {
            fetchConfig(token);
        }
        if (confirmation && confirmation.confirmationStatus) {
            setConfirmationStatus(confirmation.confirmationStatus);
        }
    }, [confirmation]);

    useEffect(() => {
        if (!requestStatus) return;
        if (
            currentRequest &&
            requestStatus.status === "accepted" &&
            requestStatus.driverId !== currentUser.userId
        ) {
            clearConfirmationRequest(currentUser.username);
            // Clear request from confirmation pool data
        }
    }, [requestStatus]);

    const initBackgroundTask = async inRequest => {
        configureTask({ currentUser, inRequest });
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

    return (
        <View style={styles.container}>
            <SettingBottomSheet
                settingRef={settingRef}
                onSubmit={() => settingRef.current.snapTo(2)}
            />
            <RequestBottomSheet requestRef={requestRef} />
            {location && (
                <>
                    <Message
                        message={messages[statusCode]}
                        visible={statusCode}
                        isMessage={statusCode < 400}
                    />
                    {confirmationStatus && (
                        <MessageModal
                            action={
                                confirmationStatus === "approved" ? handleApproved : handleRejected
                            }
                            content={messages[confirmationStatus]}
                        />
                    )}
                    <Header title="Chờ yêu cầu" gotoScreen={() => navigation.goBack()} />
                    <View style={{ flex: 12, marginTop: 5, borderRadius: 10 }}>
                        <Map source={location} setLocation={setLocation} />
                    </View>
                    <View style={styles.info}>
                        <HomeDriverInfo
                            toggleRequestSheet={() => requestRef.current.snapTo(0)}
                            toggleSettingSheet={() => settingRef.current.snapTo(0)}
                            addressName="Vị trí của bạn"
                            addressValue={location.address || "Đang cập nhật..."}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    currentRequest: selectCurrentRequest,
    currentUser: selectCurrentUser,
    currentAmbulance: selectCurrentAmbulance,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    fetchRequest: (token, requestId) => dispatch(fetchRequest(token, requestId)),
    clearRequest: () => dispatch(clearRequest()),
    handleApprovedRegisterAmbulance: () => dispatch(handleApprovedRegisterAmbulance()),
    getAmbulanceNote: (token, ambulanceId) => dispatch(getAmbulanceNote(token, ambulanceId)),
    fetchConfig: token => dispatch(fetchConfig(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
