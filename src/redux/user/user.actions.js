import UserActionTypes from "./user.types";

export const signIn = user => ({
    type: UserActionTypes.SIGN_IN_START,
    payload: user
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFail = error => ({
    type: UserActionTypes.SIGN_IN_FAIL,
    payload: error
});

export const logout = () => ({
    type: UserActionTypes.LOGOUT
});

export const updateUser = user => ({
    type: UserActionTypes.UPDATE_USER,
    payload: user
});

export const updateConfirmingStatus = status => ({
    type: UserActionTypes.UPDATE_CONFIRMING_STATUS,
    payload: status
});

export const handleApprovedRegisterAmbulance = () => ({
    type: UserActionTypes.HANDLE_APPROVED_REGISTER_AMBULANCE
});
