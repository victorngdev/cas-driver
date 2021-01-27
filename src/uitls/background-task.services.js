import * as TaskManager from "expo-task-manager";

import { initLocation } from "../firebase/firebase.utils";

export const configureTask = ({ username }) => {
    TaskManager.defineTask("syncLocation", ({ data, error }) => {
        if (error) {
            return;
        }
        if (data) {
            const { latitude, longitude } = data.locations[0].coords;

            username && initLocation(username, latitude, longitude);
        }
    });
};
