import RequestActionTypes from "./request.types";

const INITIAL_STATE = {
    requestList: [],
    currentRequest: null,
    error: null,
    isAccepted: false,
    isArrived: false,
    config: null
};

const mapKey = {
    1: "requestTimeout",
    2: "termTimeout",
    3: "radius",
    4: "extraRadius",
    5: "maxRadius"
};

const requestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RequestActionTypes.FETCH_REQUESTS_SUCCESS:
            return {
                ...state,
                requestList: state.requestList.concat(action.payload)
            };
        case RequestActionTypes.REMOVE_REQUESTS:
            return {
                ...state,
                requestList: action.payload
            };
        case RequestActionTypes.FETCH_REQUESTS_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case RequestActionTypes.ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                currentRequest: action.payload,
                requestList: []
            };
        case RequestActionTypes.FINISH_REQUEST_SUCCESS:
        case RequestActionTypes.CANCEL_REQUEST_SUCCESS:
            return {
                ...state,
                currentRequest: null,
                error: null
            };
        case RequestActionTypes.CLEAR_REQUEST:
            return {
                ...state,
                currentRequest: null
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
        case RequestActionTypes.REJECT_REQUEST_SUCCESS:
            return {
                ...state,
                requestList: state.requestList.filter(r => !action.payload.includes(r.requestId))
            };
        case RequestActionTypes.ACCEPT_REQUEST_FAIL:
        case RequestActionTypes.CANCEL_REQUEST_FAIL:
        case RequestActionTypes.PICKED_PATIENT_FAIL:
        case RequestActionTypes.FINISH_REQUEST_FAIL:
        case RequestActionTypes.FETCH_SYSTEM_CONFIG_FAIL:
        case RequestActionTypes.REJECT_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default requestReducer;
