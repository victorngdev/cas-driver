import { put, all, call, takeLatest, take } from "redux-saga/effects";

import { login, updateSetting, updateUser } from "../../apis/user.apis";
import { fetchAmbulance } from "../ambulance/ambulance.actions";
import { updateStatusCode } from "../message/message.action";
import {
    signInFail,
    signInSuccess,
    updateSettingFail,
    updateSettingSuccess,
    updateUserFail,
    updateUserSuccess
} from "./user.actions";
import { uploadImageToS3 } from "../../apis/core.apis";

import UserActionTypes from "./user.types";

export function* signInStart({ payload: { username, password } }) {
    try {
        const response = yield call(login, username, password);
        const result = yield response.data;

        yield put(signInSuccess(result));
        yield put(fetchAmbulance(`Bearer ${result.user.token}`, result.user.id));
    } catch (error) {
        yield put(signInFail(error));
        yield put(updateStatusCode(401));
    }
}

function* updateUserStart({ payload: { userId, token, user } }) {
    try {
        let _user = null;

        if (user.image.uri) {
            const _response = yield call(uploadImageToS3, user.image);
            _user = { ...user, imageUrl: _response.body.postResponse.location };
        } else {
            _user = user;
        }
        const response = yield call(updateUser, userId, token, _user);

        yield put(updateUserSuccess(response.data));
        yield put(updateStatusCode(204));
    } catch (error) {
        yield put(updateUserFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* updateSettingStart({ payload: setting }) {
    try {
        const response = yield call(updateSetting, setting);

        yield put(updateSettingSuccess(response.data));
        yield put(updateStatusCode(205));
    } catch (error) {
        yield put(updateSettingFail(error));
        yield put(updateStatusCode(updateStatusCode(error.message.includes("401") ? 700 : 402)));
    }
}

export function* onLogin() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart);
}

export function* onUpdateUser() {
    yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUserStart);
}

export function* onUpdateSetting() {
    yield takeLatest(UserActionTypes.UPDATE_SETTING_START, updateSettingStart);
}

export default function* userSagas() {
    yield all([call(onLogin), call(onUpdateUser), call(onUpdateSetting)]);
}
