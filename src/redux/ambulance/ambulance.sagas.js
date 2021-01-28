import { takeLatest, all, call, put, take } from "redux-saga/effects";

import {
    fetchAmbulance,
    getAmbulanceNote,
    registerAmbulance,
    unregisterAmbulance,
    updateAmbulance
} from "../../apis/ambulance.apis";
import { updateStatusCode } from "../message/message.action";
import {
    handleUnregisterAmbulance,
    handleUpdateAmbulance,
    updateConfirmingStatus
} from "../user/user.actions";
import {
    fetchAmbulanceFail,
    fetchAmbulanceSuccess,
    getAmbulanceNoteFail,
    getAmbulanceNoteSuccess,
    registerAmbulanceFail,
    registerAmbulanceSuccess,
    unregisterAmbulanceFail,
    unregisterAmbulanceSuccess,
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
        yield put(updateStatusCode(201));
    } catch (error) {
        yield put(registerAmbulanceFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* updateAmbulanceStart({ payload: { token, userId, ambulance } }) {
    try {
        const response = yield call(updateAmbulance, token, userId, ambulance);

        yield put(updateAmbulanceSuccess({ ...response.data, ambulance_status: "CONFIRMING" }));
        yield put(updateStatusCode(203));
    } catch (error) {
        yield put(updateAmbulanceFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
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

function* unregisterAmbulanceStart({ payload: { token, ambulanceId } }) {
    try {
        yield call(unregisterAmbulance, token, ambulanceId);
        yield put(unregisterAmbulanceSuccess());
        yield put(handleUnregisterAmbulance());
        yield put(updateStatusCode(202));
    } catch (error) {
        yield put(unregisterAmbulanceFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
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

export function* onUnregisterAmbulance() {
    yield takeLatest(AmbulanceActionTypes.UNREGISTER_AMBULANCE_START, unregisterAmbulanceStart);
}

export default function* ambulanceSagas() {
    yield all([
        call(onRegisterAmbulance),
        call(onUpdateAmbulance),
        call(onFetchAmbulance),
        call(onGetAmbulanceNote),
        call(onUnregisterAmbulance)
    ]);
}
