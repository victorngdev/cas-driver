import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Geocoder from "react-native-geocoding";

import { firestore } from "../firebase/firebase.utils";
import { selectIsArrived, selectRequestId } from "../redux/request/request.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";

import MapDirection from "./map-direction.component";

Geocoder.init("AIzaSyA3wjgHRZGPb4I96XDM-Eev7f1QQM_Mpp8", { language: "vi" });

const Map = ({ source, setLocation, requestId, isArrived }) => {
    const mapRef = useRef(null);
    const [region, setRegion] = useState(null);

    const [destination, setDestination] = useState(null);
    const positionRef = firestore.collection("requests").doc(`${requestId}`);
    const [request] = useDocumentData(positionRef);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setRegion({ latitude, longitude, latitudeDelta: 0.0043, longitudeDelta: 0.0024 });
        });
    }, []);

    useEffect(() => {
        if (request && !isArrived) {
            setDestination({
                latitude: request.sourceLatitude,
                longitude: request.sourceLongitude
            });
        }
        if (isArrived && request) {
            setDestination({
                latitude: request.destinationLatitude,
                longitude: request.destinationLongitude
            });
        }
    }, [request, isArrived]);

    useEffect(() => {
        !requestId && setDestination(null);
    });

    const onRegionChange = region => {
        setRegion(region);
    };

    const handleLocationChange = (latitude, longitude) => {
        Geocoder.from(latitude, longitude).then(json =>
            setLocation({
                address: json.results[0].formatted_address,
                latitude,
                longitude
            })
        );
    };

    return (
        <View style={[styles.container_mapview]}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                onRegionChange={onRegionChange}
                showsMyLocationButton={true}
                showsUserLocation={true}
                loadingEnabled
                followsUserLocation={true}
                style={styles.map__view}
                onUserLocationChange={coordinate =>
                    handleLocationChange(
                        coordinate.nativeEvent.coordinate.latitude,
                        coordinate.nativeEvent.coordinate.longitude
                    )
                }
                onMapReady={() =>
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                }
            >
                {destination && (
                    <>
                        <MapDirection
                            origin={source}
                            destination={destination}
                            onReady={results =>
                                mapRef.current.fitToCoordinates(results.coordinates, {
                                    edgePadding: {
                                        top: 20,
                                        bottom: 550,
                                        left: 50,
                                        right: 50
                                    }
                                })
                            }
                        />
                        <Marker coordinate={destination} pinColor="red" />
                    </>
                )}
            </MapView>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    requestId: selectRequestId,
    currentUser: selectCurrentUser,
    isArrived: selectIsArrived
});

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
    container_mapview: {
        alignItems: "center"
    },
    map__view: {
        width: "100%",
        height: "100%"
    }
});
