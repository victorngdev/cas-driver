import { takeLatest, all, call, put, take } from "redux-saga/effects";

import {
    fetchAmbulance,
    getAmbulanceNote,
    registerAmbulance,
    updateAmbulance
} from "../../apis/ambulance.apis";
import { updateConfirmingStatus } from "../user/user.actions";
import {
    fetchAmbulanceFail,
    fetchAmbulanceSuccess,
    getAmbulanceNoteFail,
    getAmbulanceNoteSuccess,
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

function* getAmbulanceNoteStart({ payload: { token, ambulanceId } }) {
    try {
        const response = yield call(getAmbulanceNote, token, ambulanceId);

        yield put(getAmbulanceNoteSuccess(response.data));
    } catch (error) {
        yield put(getAmbulanceNoteFail(error));
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

export function* onGetAmbulanceNote() {
    yield takeLatest(AmbulanceActionTypes.GET_AMBULANCE_NOTE_START, getAmbulanceNoteStart);
}

export default function* ambulanceSagas() {
    yield all([
        call(onRegisterAmbulance),
        call(onUpdateAmbulance),
        call(onFetchAmbulance),
        call(onGetAmbulanceNote)
    ]);
}
