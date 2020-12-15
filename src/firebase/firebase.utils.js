import firebase from "firebase/app";
import "firebase/firestore";
import * as geofirestore from "geofirestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1akYjqm5cVgCJvcgAFVguS0sw70hv4ds",
    authDomain: "charitym-ambulance.firebaseapp.com",
    databaseURL: "https://charitym-ambulance.firebaseio.com",
    projectId: "charitym-ambulance",
    storageBucket: "charitym-ambulance.appspot.com",
    messagingSenderId: "801731513492",
    appId: "1:801731513492:web:30978d836981cb9b6d3881"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection("drivers");

export const updateRequest = async (driverId, poolId, requestId, status) => {
    const requestRef = firestore.collection("requests").doc(`${requestId}`);
    await requestRef.update({
        status,
        driverId,
        poolId
    });
};

export const finishRequestFirestore = async requestId => {
    const requestRef = firestore.collection("requests").doc(`${requestId}`);
    await requestRef.update({
        status: "finished"
    });
};

export const clearConfirmationRequest = async poolId => {
    const confirmationRef = firestore.collection("confirmations").doc(`${poolId}`);
    await confirmationRef.set({
        requestId: 0,
        confirmationStatus: ""
    });
};

export const syncLocationToRequest = async (poolId, latitude, longitude) => {
    if (latitude && longitude) {
        const driverRef = firestore.collection("drivers").doc(`${poolId}`);

        await driverRef.set({
            latitude,
            longitude
        });
    }
};

export const initLocation = async (userId, latitude, longitude) => {
    geocollection.doc(`${userId}`).set({
        coordinates: new firebase.firestore.GeoPoint(latitude, longitude)
    });
};

export const rejectRequest = async requestId => {
    const requestRef = firestore.collection("requests").doc(`${requestId}`);

    await requestRef.update({
        status: "rejected"
    });
};

export default firebase;
