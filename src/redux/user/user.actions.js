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

export const updateConfirmingStatus = status => ({
    type: UserActionTypes.UPDATE_CONFIRMING_STATUS,
    payload: status
});

export const handleApprovedRegisterAmbulance = () => ({
    type: UserActionTypes.HANDLE_APPROVED_REGISTER_AMBULANCE
});

export const handleUnregisterAmbulance = () => ({
    type: UserActionTypes.HANDLE_UNREGISTER_AMBULANCE
});

export const handleUpdateAmbulance = () => ({
    type: UserActionTypes.HANDLE_UPDATE_AMBULANCE
});

export const updateUser = (userId, token, user) => ({
    type: UserActionTypes.UPDATE_USER_START,
    payload: { userId, token, user }
});

export const updateUserSuccess = user => ({
    type: UserActionTypes.UPDATE_USER_SUCCESS,
    payload: user
});

export const updateUserFail = error => ({
    type: UserActionTypes.UPDATE_USER_FAIL,
    payload: error
});

export const updateSetting = setting => ({
    type: UserActionTypes.UPDATE_SETTING_START,
    payload: setting
});

export const updateSettingSuccess = setting => ({
    type: UserActionTypes.UPDATE_SETTING_SUCCESS,
    payload: setting
});

export const updateSettingFail = error => ({
    type: UserActionTypes.UPDATE_SETTING_FAIL,
    payload: error
});
