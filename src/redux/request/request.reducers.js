import RequestActionTypes from "./request.types";

const INITIAL_STATE = {
    requestList: [],
    currentRequest: null,
    error: null,
    isAccepted: false,
    isArrived: false,
    history: null,
    config: null
};

const mapKey = {
    1: "requestTimeout",
    2: "confirmationTimeout",
    3: "radius",
    4: "numOfDrivers",
    5: "extraRadius"
};

const requestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RequestActionTypes.FETCH_REQUESTS_SUCCESS:
            return {
                ...state,
                requestList: action.payload
            };
        case RequestActionTypes.VIEW_HISTORY:
            return {
                ...state,
                history: action.payload
            };
        case RequestActionTypes.FETCH_REQUESTS_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                isAccepted: true,
                currentRequest: action.payload,
                requestList: []
            };
        case RequestActionTypes.PICKED_PATIENT_SUCCESS:
            return {
                ...state,
                isArrived: true
            };
        case RequestActionTypes.FINISH_REQUEST_SUCCESS:
        case RequestActionTypes.CANCEL_REQUEST_SUCCESS:
            return {
                ...state,
                isArrived: false,
                isAccepted: false,
                currentRequest: null,
                error: null
            };
        case RequestActionTypes.CLEAR_REQUEST:
            return {
                ...state,
                currentRequest: null,
                isAccepted: false,
                isArrived: false
            };
        case RequestActionTypes.FETCH_SYSTEM_CONFIG_SUCCESS:
            return {
                ...state,
                config: action.payload.reduce((acc, cur) => {
                    return {
                        ...acc,
                        [mapKey[cur.itemId]]: cur.value
                    };
                }, {})
            };
        case RequestActionTypes.ACCEPT_REQUEST_FAIL:
        case RequestActionTypes.CANCEL_REQUEST_FAIL:
        case RequestActionTypes.PICKED_PATIENT_FAIL:
        case RequestActionTypes.FINISH_REQUEST_FAIL:
        case RequestActionTypes.FETCH_SYSTEM_CONFIG_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default requestReducer;
