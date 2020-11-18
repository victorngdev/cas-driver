import { takeLatest, all, call, put, take } from "redux-saga/effects";

import { fetchAmbulance, registerAmbulance, updateAmbulance } from "../../apis/ambulance.apis";
import { updateConfirmingStatus } from "../user/user.actions";
import {
    fetchAmbulanceFail,
    fetchAmbulanceSuccess,
    registerAmbulanceFail,
    registerAmbulanceSuccess,
    updateAmbulanceFail,
    updateAmbulanceSuccess
} from "./ambulance.actions";

import AmbulanceActionTypes from "./ambulance.types";

function* fetchAmbulanceStart({ payload: { token, userId } }) {
    try {
        const response = yield call(fetchAmbulance, token, userId);

        yield put(fetchAmbulanceSuccess(response.data));
    } catch (error) {
        yield put(fetchAmbulanceFail(error));
    }
}

function* registerAmbulanceStart({ payload: { token, userId, ambulance } }) {
    try {
        const response = yield call(registerAmbulance, token, userId, ambulance);

        yield put(registerAmbulanceSuccess(response.data));
        yield put(updateConfirmingStatus(!!response.data));
    } catch (error) {
        yield put(registerAmbulanceFail(error));
    }
}

function* updateAmbulanceStart({ payload: { token, userId, ambulance } }) {
    try {
        const response = yield call(updateAmbulance, token, userId, ambulance);

        yield put(updateAmbulanceSuccess(response.data));
    } catch (error) {
        yield put(updateAmbulanceFail(error));
    }
}

export function* onRegisterAmbulance() {
    yield takeLatest(AmbulanceActionTypes.REGISTER_AMBULANCE_START, registerAmbulanceStart);
}

export function* onUpdateAmbulance() {
    yield takeLatest(AmbulanceActionTypes.UPDATE_AMBULANCE_START, updateAmbulanceStart);
}

export function* onFetchAmbulance() {
    yield takeLatest(AmbulanceActionTypes.FETCH_AMBULANCE_START, fetchAmbulanceStart);
}

export default function* ambulanceSagas() {
    yield all([call(onRegisterAmbulance), call(onUpdateAmbulance), call(onFetchAmbulance)]);
}
