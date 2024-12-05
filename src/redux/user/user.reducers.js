import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    setting: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                setting: action.payload.setting
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
        case UserActionTypes.HANDLE_UNREGISTER_AMBULANCE:
            return {
                ...state,
                currentUser: { ...state.currentUser, confirming: false, registered: false }
            };
        case UserActionTypes.HANDLE_UPDATE_AMBULANCE:
            return {
                ...state,
                currentUser: { ...state.currentUser, confirming: true, registered: false }
            };
        case UserActionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    imageUrl: action.payload.imageUrl,
                    displayName: action.payload.displayName,
                    phone: action.payload.phone
                }
            };
        case UserActionTypes.UPDATE_SETTING_SUCCESS:
            return {
                ...state,
                setting: action.payload
            };
        case UserActionTypes.UPDATE_SETTING_FAIL:
        case UserActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
