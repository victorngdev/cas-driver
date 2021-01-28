import React, { useState, useEffect, useRef } from "react";
import { View, PermissionsAndroid } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { createStructuredSelector } from "reselect";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { clearConfirmationStatus, firestore } from "../../firebase/firebase.utils";
import { clearRequest } from "../../redux/request/request.actions";
import { updateStatusCode } from "../../redux/message/message.action";
import { fetchAmbulance } from "../../redux/ambulance/ambulance.actions";
import { selectToken, selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentAmbulance } from "../../redux/ambulance/ambulance.selectors";
import { selectStatusCode } from "../../redux/message/message.selectors";
import { configureTask } from "../../uitls/background-task.services";
import messages from "../../uitls/message.data";

import HomeDriverInfo from "../../components/home-driver-info.component";
import Message from "../../components/message.component";
import RequestBottomSheet from "../../components/request-bottom-sheet.component";
import SettingBottomSheet from "../../components/setting-bottom-sheet.componet";
import Header from "../../components/header.component";

import styles from "./home.style";

Geocoder.init("AIzaSyA3wjgHRZGPb4I96XDM-Eev7f1QQM_Mpp8", { language: "vi" });

const HomeScreen = ({
    token,
    currentAmbulance,
    statusCode,
    currentUser,
    updateStatusCode,
    fetchAmbulance,
    navigation,
}) => {
    const driverRef = firestore.collection("drivers").doc(`${currentUser.username}`);
    const [driverStatus] = useDocumentData(driverRef);
    const [location, setLocation] = useState(null);
    const settingRef = useRef(null);
    const requestRef = useRef(null);

    useEffect(() => {
        initLocation();
        const timer = setInterval(() => {
            initLocation();
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (driverStatus && driverStatus.confirmationStatus) {
            if (driverStatus.confirmationStatus === "approved") {
                fetchAmbulance(token, currentUser.id);
                clearConfirmationStatus(currentUser.username);
                updateStatusCode(102);
            } else {
                clearConfirmationStatus(currentUser.username);
                fetchAmbulance(token, currentUser.id);
                updateStatusCode(403);
            }
        }
    }, [driverStatus]);

    useEffect(() => {
        async () => {
            if (currentAmbulance && currentAmbulance.ambulance_status === "ACTIVE") {
                initBackgroundTask();
            } else {
                await Location.stopLocationUpdatesAsync("syncLocation");
            }
        };
    }, [currentAmbulance]);

    const initBackgroundTask = async () => {
        configureTask({ username: currentUser.username });
        await Location.startLocationUpdatesAsync("syncLocation", {
            timeInterval: 500,
        });
    };

    const initLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let { latitude, longitude } = position.coords;
            Geocoder.from(latitude, longitude).then((json) =>
                setLocation({
                    address: json.results[0].formatted_address,
                    latitude,
                    longitude,
                })
            );
        });
    };

    return (
        <View style={styles.container}>
            <SettingBottomSheet settingRef={settingRef} />
            <RequestBottomSheet navigation={navigation} requestRef={requestRef} />
            {statusCode && <Message message={messages[statusCode]} isMessage={statusCode < 400} />}
            <Header title="Chờ yêu cầu" />
            <View style={{ flex: 12, marginTop: 5, borderRadius: 10 }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0023,
                    }}
                    showsMyLocationButton
                    showsUserLocation
                    loadingEnabled
                    followsUserLocation
                    style={{ width: "100%", height: "100%" }}
                    onMapReady={() => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)}
                >
                    {location && <Marker coordinate={location} image={require("../../../assets/icons/location.png")} />}
                </MapView>
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
    statusCode: selectStatusCode,
    currentAmbulance: selectCurrentAmbulance,
    currentUser: selectCurrentUser,
    token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
    clearRequest: () => dispatch(clearRequest()),
    handleApprovedRegisterAmbulance: () => dispatch(handleApprovedRegisterAmbulance()),
    updateStatusCode: (statusCode) => dispatch(updateStatusCode(statusCode)),
    fetchAmbulance: (token, userId) => dispatch(fetchAmbulance(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
