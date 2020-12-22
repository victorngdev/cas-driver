import * as TaskManager from "expo-task-manager";

import { initLocation, firestore, syncLocationToRequest } from "../firebase/firebase.utils";

export const configureTask = ({ currentUser, isReady, inRequest }) => {
    TaskManager.defineTask("syncLocation", ({ data, error }) => {
        if (error) {
            return;
        }
        if (data) {
            const { latitude, longitude } = data.locations[0].coords;
            if (inRequest) {
                syncLocationToRequest(currentUser.username, latitude, longitude);
            } else {
                isReady && currentUser && initLocation(currentUser.username, latitude, longitude);
            }
        }
    });
};
