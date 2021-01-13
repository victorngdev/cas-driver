import * as TaskManager from "expo-task-manager";

import { initLocation, syncLocationToRequest } from "../firebase/firebase.utils";

export const configureTask = ({ username, inRequest }) => {
    TaskManager.defineTask("syncLocation", ({ data, error }) => {
        if (error) {
            return;
        }
        if (data) {
            const { latitude, longitude } = data.locations[0].coords;
            if (inRequest) {
                syncLocationToRequest(username, latitude, longitude);
            } else {
                username && initLocation(username, latitude, longitude);
            }
        }
    });
};
