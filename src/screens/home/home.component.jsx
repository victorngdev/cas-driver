import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";

import { clearConfirmationRequest } from "../../firebase/firebase.utils";
import { clearRequest } from "../../redux/request/request.actions";
import { handleApprovedRegisterAmbulance } from "../../redux/user/user.actions";
import { selectUsername } from "../../redux/user/user.selectors";
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
    currentAmbulance,
    username,
    handleApprovedRegisterAmbulance,
    statusCode,
    navigation
}) => {
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const settingRef = useRef(null);
    const requestRef = useRef(null);

    useEffect(() => {
        if (currentAmbulance && currentAmbulance.ambulance_status === "ACIVE") {
            Location.startLocationUpdatesAsync("syncLocation", {
                accuracy: Location.Accuracy.Balanced,
                distanceInterval: 1,
                timeInterval: 5
            });
        }
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setLocation(latitude, longitude);
        });
        configureTask({ username });
        initBackgroundTask(false);
    }, [currentAmbulance]);

    const initBackgroundTask = async inRequest => {
        configureTask({ username, inRequest });
        await Location.startLocationUpdatesAsync("syncLocation", {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 1,
            timeInterval: 5
        });
    };

    const handleAmbulanceApproved = () => {
        setConfirmationStatus(null);
        handleApprovedRegisterAmbulance();
        clearConfirmationRequest(username);
    };

    const handleAmbulanceRejected = () => {
        setConfirmationStatus(null);
        clearConfirmationRequest(username);
    };

    return (
        <View style={styles.container}>
            <SettingBottomSheet settingRef={settingRef} />
            <RequestBottomSheet navigation={navigation} requestRef={requestRef} />
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
                                confirmationStatus === "approved"
                                    ? handleAmbulanceApproved
                                    : handleAmbulanceRejected
                            }
                            content={messages[confirmationStatus]}
                        />
                    )}
                    <Header title="Chờ yêu cầu" gotoScreen={() => navigation.openDrawer()} />
                    <View style={{ flex: 12, marginTop: 5, borderRadius: 10 }}>
                        <Map source={location} setLocation={setLocation} />
                    </View>
                    <View style={styles.info}>
                        <HomeDriverInfo
                            toggleRequestSheet={() => requestRef.current.snapTo(0)}
                            toggleSettingSheet={() => settingRef.current.snapTo(0)}
                            addressValue={location.address || "Đang cập nhật..."}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    username: selectUsername,
    statusCode: selectStatusCode,
    currentAmbulance: selectCurrentAmbulance
});

const mapDispatchToProps = dispatch => ({
    clearRequest: () => dispatch(clearRequest()),
    handleApprovedRegisterAmbulance: () => dispatch(handleApprovedRegisterAmbulance())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
