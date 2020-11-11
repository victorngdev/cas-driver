import RequestActionTypes from "./request.types";

export const fetchRequest = (token, requestId) => ({
    type: RequestActionTypes.FETCH_REQUEST_START,
    payload: {
        token,
        requestId
    }
});

export const fetchRequestSuccess = request => ({
    type: RequestActionTypes.FETCH_REQUEST_SUCCESS,
    payload: request
});

export const fetchRequestFail = error => ({
    type: RequestActionTypes.FETCH_REQUEST_FAIL,
    payload: error
});

export const clearRequest = () => ({
    type: RequestActionTypes.CLEAR_REQUEST
});

export const acceptRequest = (token, driverId, requestId) => ({
    type: RequestActionTypes.ACCEPT_REQUEST_START,
    payload: { token, driverId, requestId }
});

export const acceptRequestSuccess = () => ({
    type: RequestActionTypes.ACCEPT_REQUEST_SUCCESS
});

export const acceptRequestFail = error => ({
    type: RequestActionTypes.ACCEPT_REQUEST_FAIL,
    payload: error
});

export const cancelRequest = (token, requestId, reason) => ({
    type: RequestActionTypes.CANCEL_REQUEST_START,
    payload: { token, requestId, reason }
});

export const cancelRequestSuccess = () => ({
    type: RequestActionTypes.CANCEL_REQUEST_SUCCESS
});

export const cancelRequestFail = error => ({
    type: RequestActionTypes.CANCEL_REQUEST_FAIL,
    payload: error
});

export const pickedPatient = (token, requestId) => ({
    type: RequestActionTypes.PICKED_PATIENT_START,
    payload: { token, requestId }
});

export const pickedPatientSuccess = () => ({
    type: RequestActionTypes.PICKED_PATIENT_SUCCESS
});

export const pickedPatientFail = error => ({
    type: RequestActionTypes.PICKED_PATIENT_FAIL,
    payload: error
});

export const finishRequest = (token, requestId) => ({
    type: RequestActionTypes.FINISH_REQUEST_START,
    payload: { token, requestId }
});

export const finishRequestSuccess = () => ({
    type: RequestActionTypes.FINISH_REQUEST_SUCCESS
});

export const finishRequestFail = error => ({
    type: RequestActionTypes.FINISH_REQUEST_FAIL,
    payload: error
});
