import React, { useState, useEffect, useRef } from "react";
import { View, PermissionsAndroid } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { createStructuredSelector } from "reselect";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

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
        initLocation();
        const timer = setInterval(() => {
            initLocation();
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentAmbulance && currentAmbulance.ambulance_status === "ACTIVE") {
            initBackgroundTask(false);
        }
    }, [currentAmbulance]);

    const initBackgroundTask = async inRequest => {
        configureTask({ username, inRequest });
        await Location.startLocationUpdatesAsync("syncLocation", {
            deferredUpdatesDistance: 2000,
            distanceInterval: 2000
        });
    };

    const initLocation = () => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            Geocoder.from(latitude, longitude).then(json =>
                setLocation({
                    address: json.results[0].formatted_address,
                    latitude,
                    longitude
                })
            );
        });
    };

    return (
        <View style={styles.container}>
            <SettingBottomSheet settingRef={settingRef} />
            <RequestBottomSheet navigation={navigation} requestRef={requestRef} />
            {confirmationStatus && <MessageModal content={messages[confirmationStatus]} />}
            <Header title="Chờ yêu cầu" />
            <View style={{ flex: 12, marginTop: 5, borderRadius: 10 }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0024
                    }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    loadingEnabled
                    followsUserLocation={true}
                    style={{ width: "100%", height: "100%" }}
                    onMapReady={() =>
                        PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        )
                    }
                />
            </View>
            <View style={styles.info}>
                <HomeDriverInfo
                    toggleRequestSheet={() => requestRef.current.snapTo(0)}
                    toggleSettingSheet={() => settingRef.current.snapTo(0)}
                    addressValue={location ? location.address : "Đang cập nhật..."}
                    navigation={navigation}
                />
            </View>
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
