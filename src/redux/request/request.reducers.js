import RequestActionTypes from "./request.types";

const INITIAL_STATE = {
    currentRequest: null,
    error: null,
    isAccepted: false,
    isArrived: false
};

const requestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RequestActionTypes.FETCH_REQUEST_SUCCESS:
            return {
                ...state,
                currentRequest: action.payload
            };
        case RequestActionTypes.FETCH_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                isAccepted: true
            };
        case RequestActionTypes.ACCEPT_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.CANCEL_REQUEST_SUCCESS:
            return {
                ...state,
                isAccepted: false,
                currentRequest: null
            };
        case RequestActionTypes.CANCEL_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.PICKED_PATIENT_SUCCESS:
            return {
                ...state,
                isArrived: true
            };
        case RequestActionTypes.PICKED_PATIENT_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.FINISH_REQUEST_SUCCESS:
            return {
                ...state,
                isArrived: false,
                isAccepted: false,
                currentRequest: null,
                error: null
            };
        case RequestActionTypes.FINISH_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.CLEAR_REQUEST:
            return {
                ...state,
                currentRequest: null,
                isAccepted: false,
                isArrived: false
            };
        default:
            return state;
    }
};

export default requestReducer;
