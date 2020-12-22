import { put, all, call, takeLatest } from "redux-saga/effects";

import { login } from "../../apis/user.apis";
import { fetchAmbulance } from "../ambulance/ambulance.actions";
import { updateStatusCode } from "../message/message.action";
import { signInFail, signInSuccess } from "./user.actions";

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

export function* onLogin() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart);
}

export default function* userSagas() {
    yield all([call(onLogin)]);
}
