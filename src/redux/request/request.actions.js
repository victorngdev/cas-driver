import RequestActionTypes from "./request.types";

export const fetchRequests = (token, requestIds) => ({
    type: RequestActionTypes.FETCH_REQUESTS_START,
    payload: { token, requestIds }
});

export const fetchRequestsSuccess = requestList => ({
    type: RequestActionTypes.FETCH_REQUESTS_SUCCESS,
    payload: requestList
});

export const fetchRequestsFail = error => ({
    type: RequestActionTypes.FETCH_REQUESTS_FAIL,
    payload: error
});

export const clearRequest = () => ({
    type: RequestActionTypes.CLEAR_REQUEST
});

export const removeRequests = requestList => ({
    type: RequestActionTypes.REMOVE_REQUESTS,
    payload: requestList
});

export const acceptRequest = (token, driverId, requestId, username, request) => ({
    type: RequestActionTypes.ACCEPT_REQUEST_START,
    payload: { token, driverId, requestId, username, request }
});

export const acceptRequestSuccess = request => ({
    type: RequestActionTypes.ACCEPT_REQUEST_SUCCESS,
    payload: request
});

export const acceptRequestFail = error => ({
    type: RequestActionTypes.ACCEPT_REQUEST_FAIL,
    payload: error
});

export const cancelRequest = (token, driverId, requestId, reason) => ({
    type: RequestActionTypes.CANCEL_REQUEST_START,
    payload: { token, driverId, requestId, reason }
});

export const cancelRequestSuccess = () => ({
    type: RequestActionTypes.CANCEL_REQUEST_SUCCESS
});

export const cancelRequestFail = error => ({
    type: RequestActionTypes.CANCEL_REQUEST_FAIL,
    payload: error
});

export const rejectRequest = (token, requestIds, username) => ({
    type: RequestActionTypes.REJECT_REQUEST_START,
    payload: { token, requestIds, username }
});

export const rejectRequestSuccess = requestIds => ({
    type: RequestActionTypes.REJECT_REQUEST_SUCCESS,
    payload: requestIds
});

export const rejectRequestFail = error => ({
    type: RequestActionTypes.REJECT_REQUEST_FAIL,
    payload: error
});

export const pickedPatient = (token, requestId) => ({
    type: RequestActionTypes.PICKED_PATIENT_START,
    payload: { token, requestId }
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

export const fetchConfig = token => ({
    type: RequestActionTypes.FETCH_SYSTEM_CONFIG_START,
    payload: token
});

export const fetchConfigSuccess = config => ({
    type: RequestActionTypes.FETCH_SYSTEM_CONFIG_SUCCESS,
    payload: config
});

export const fetchConfigFail = error => ({
    type: RequestActionTypes.FETCH_SYSTEM_CONFIG_FAIL,
    payload: error
});
