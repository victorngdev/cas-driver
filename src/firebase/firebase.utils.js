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

export const saveSetting = async (username, distance, requestType) => {
    await firestore
        .collection("drivers")
        .doc(username)
        .set(
            { distance, emergency: !(requestType % 3), home: !(requestType % 2) },
            { merge: true }
        );
};

export const syncLocationToRequest = async (poolId, latitude, longitude) => {
    if (latitude && longitude) {
        const driverRef = firestore.collection("drivers").doc(`${poolId}`);

        await driverRef.set(
            {
                latitude,
                longitude
            },
            { merge: true }
        );
    }
};

export const initLocation = async (userId, latitude, longitude) => {
    geocollection.doc(`${userId}`).set(
        {
            coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
            latitude,
            longitude
        },
        { merge: true }
    );
};

export const clearConfirmationStatus = async username => {
    const driverRef = firestore.collection("drivers").doc(`${username}`);

    driverRef.update({ confirmationStatus: null });
};

export default firebase;
