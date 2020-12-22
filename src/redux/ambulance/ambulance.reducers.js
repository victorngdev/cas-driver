import AmbulanceActionTypes from "./ambulance.types";

const INITIAL_STATE = {
    currentAmbulance: null,
    error: null
};

const ambulanceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AmbulanceActionTypes.FETCH_AMBULANCE_SUCCESS:
            return {
                ...state,
                currentAmbulance: action.payload
            };
        case AmbulanceActionTypes.FETCH_AMBULANCE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case AmbulanceActionTypes.REGISTER_AMBULANCE_SUCCESS:
            return {
                ...state,
                currentAmbulance: action.payload
            };
        case AmbulanceActionTypes.REGISTER_AMBULANCE_FAIL:
        case AmbulanceActionTypes.GET_AMBULANCE_NOTE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case AmbulanceActionTypes.GET_AMBULANCE_NOTE_SUCCESS:
            return {
                ...state,
                currentAmbulance: { ...state.currentAmbulance, note: action.payload }
            };
        default:
            return state;
    }
};

export default ambulanceReducer;
