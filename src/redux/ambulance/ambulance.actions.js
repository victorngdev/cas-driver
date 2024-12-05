import AmbulanceActionTypes from "./ambulance.types";

export const fetchAmbulance = (token, userId) => ({
    type: AmbulanceActionTypes.FETCH_AMBULANCE_START,
    payload: { token, userId }
});

export const fetchAmbulanceSuccess = ambulance => ({
    type: AmbulanceActionTypes.FETCH_AMBULANCE_SUCCESS,
    payload: ambulance
});

export const fetchAmbulanceFail = error => ({
    type: AmbulanceActionTypes.FETCH_AMBULANCE_FAIL,
    payload: error
});

export const registerAmbulance = (token, userId, ambulance) => ({
    type: AmbulanceActionTypes.REGISTER_AMBULANCE_START,
    payload: { token, userId, ambulance }
});

export const registerAmbulanceSuccess = ambulance => ({
    type: AmbulanceActionTypes.REGISTER_AMBULANCE_SUCCESS,
    payload: ambulance
});

export const registerAmbulanceFail = error => ({
    type: AmbulanceActionTypes.REGISTER_AMBULANCE_FAIL,
    payload: error
});

export const updateAmbulance = (token, userId, ambulance) => ({
    type: AmbulanceActionTypes.UPDATE_AMBULANCE_START,
    payload: { token, userId, ambulance }
});

export const updateAmbulanceSuccess = ambulance => ({
    type: AmbulanceActionTypes.UPDATE_AMBULANCE_SUCCESS,
    payload: ambulance
});

export const updateAmbulanceFail = error => ({
    type: AmbulanceActionTypes.UPDATE_AMBULANCE_FAIL,
    payload: error
});

export const getAmbulanceNote = (token, ambulanceId) => ({
    type: AmbulanceActionTypes.GET_AMBULANCE_NOTE_START,
    payload: { token, ambulanceId }
});

export const getAmbulanceNoteSuccess = note => ({
    type: AmbulanceActionTypes.GET_AMBULANCE_NOTE_SUCCESS,
    payload: note
});

export const getAmbulanceNoteFail = error => ({
    type: AmbulanceActionTypes.GET_AMBULANCE_NOTE_FAIL,
    payload: error
});

export const unregisterAmbulance = (token, ambulanceId) => ({
    type: AmbulanceActionTypes.UNREGISTER_AMBULANCE_START,
    payload: { token, ambulanceId }
});

export const unregisterAmbulanceSuccess = () => ({
    type: AmbulanceActionTypes.UNREGISTER_AMBULANCE_SUCCESS
});

export const unregisterAmbulanceFail = error => ({
    type: AmbulanceActionTypes.UNREGISTER_AMBULANCE_FAIL,
    payload: error
});

export const clearAmbulanceNote = () => ({
    type: AmbulanceActionTypes.CLEAR_AMBULANCE_NOTE
});
