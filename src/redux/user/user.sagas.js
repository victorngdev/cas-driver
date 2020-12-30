import { put, all, call, takeLatest } from "redux-saga/effects";

import { login, updateUser } from "../../apis/user.apis";
import { fetchAmbulance } from "../ambulance/ambulance.actions";
import { updateStatusCode } from "../message/message.action";
import { signInFail, signInSuccess, updateUserFail } from "./user.actions";
import { uploadImageToS3 } from "../../apis/core.apis";

import UserActionTypes from "./user.types";

export function* signInStart({ payload: { username, password } }) {
    try {
        const response = yield call(login, username, password);
        const user = yield response.data;

        yield put(signInSuccess(user));
        yield put(fetchAmbulance(`${user.type} ${user.token}`, user.userId));
    } catch (error) {
        yield put(signInFail(error));
        yield put(updateStatusCode(401));
    }
}

function* updateUserStart({ payload: { userId, token, user } }) {
    try {
        const _response = yield call(uploadImageToS3, user.image);
        const _user = { ...user, imageUrl: _response.body.postResponse.location };
        const response = yield call(updateUser, userId, token, _user);

        yield put(updateUserSuccess(response.data));
        yield put(updateStatusCode(204));
    } catch (error) {
        yield put(updateUserFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

export function* onLogin() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart);
}

export function* onUpdateUser() {
    yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUserStart);
}

export default function* userSagas() {
    yield all([call(onLogin), call(onUpdateUser)]);
}
