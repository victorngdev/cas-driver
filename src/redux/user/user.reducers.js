import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
        case UserActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case UserActionTypes.UPDATE_CONFIRMING_STATUS:
            return {
                ...state,
                currentUser: { ...state.currentUser, confirming: action.payload }
            };
        case UserActionTypes.HANDLE_APPROVED_REGISTER_AMBULANCE:
            return {
                ...state,
                currentUser: { ...state.currentUser, confirming: false, registered: true }
            };
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }
};

export default userReducer;
