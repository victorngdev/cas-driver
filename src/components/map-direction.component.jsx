import React from "react";
import MapViewDirections from "react-native-maps-directions";

const MapDirection = ({ origin, destination, onReady }) => {
    return (
        <MapViewDirections
            apikey="AIzaSyA3wjgHRZGPb4I96XDM-Eev7f1QQM_Mpp8"
            origin={origin}
            destination={destination}
            onReady={onReady}
            strokeWidth={4}
            strokeColor="#315bef"
            language="vi"
            resetOnChange={false}
        />
    );
};

export default MapDirection;
