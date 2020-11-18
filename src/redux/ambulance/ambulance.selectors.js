import { create } from "react-native-extended-stylesheet";
import { createSelector } from "reselect";

const selectAmbulance = state => state.ambulance;

export const selectCurrentAmbulance = createSelector(
    [selectAmbulance],
    ambulance => ambulance.currentAmbulance
);
