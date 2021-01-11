import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: { id: 102, username: "0931738872", displayName: "Victor" },
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
        default:
            return state;
    }
};

export default userReducer;
