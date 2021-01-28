import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import MapDirection from "./map-direction.component";

const Map = ({ destination }) => {
    const mapRef = useRef(null);
    const [region, setRegion] = useState(null);

    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            let { latitude, longitude } = position.coords;
            setRegion({ latitude, longitude, latitudeDelta: 0.0043, longitudeDelta: 0.0024 });
            setLocation({ latitude, longitude });
        });
    }, []);

    return (
        <View style={styles.container_mapview}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                onRegionChange={region => setRegion(region)}
                showsMyLocationButton={true}
                showsUserLocation={true}
                loadingEnabled
                followsUserLocation={true}
                style={styles.map__view}
                onUserLocationChange={coordinate =>
                    setLocation({
                        latitude: coordinate.nativeEvent.coordinate.latitude,
                        longitude: coordinate.nativeEvent.coordinate.longitude
                    })
                }
                onMapReady={() =>
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                }
            >
                <MapDirection
                    origin={location}
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
                <Marker
                    tracksViewChanges={false}
                    icon={require("../../assets/icons/location.png")}
                    coordinate={destination}
                />
            </MapView>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container_mapview: {
        alignItems: "center"
    },
    map__view: {
        width: "100%",
        height: "100%"
    }
});
