import { all, call, put, takeLatest } from "redux-saga/effects";

import RequestActionTypes from "./request.types";
import {
    acceptRequestFail,
    acceptRequestSuccess,
    cancelRequestFail,
    cancelRequestSuccess,
    fetchRequestFail,
    fetchRequestSuccess,
    finishRequestFail,
    finishRequestSuccess,
    pickedPatientFail,
    pickedPatientSuccess
} from "./request.actions";
import {
    acceptRequest,
    cancelRequest,
    fetchRequest,
    pickedPatient,
    finishRequest
} from "../../apis/request.apis";

function* fetchRequestStart({ payload: { token, requestId } }) {
    try {
        const response = yield call(fetchRequest, token, requestId);

        yield put(fetchRequestSuccess(response.data));
    } catch (error) {
        yield put(fetchRequestFail(error));
    }
}

function* acceptRequestStart({ payload: { token, driverId, requestId } }) {
    try {
        yield call(acceptRequest, token, driverId, requestId);
        yield put(acceptRequestSuccess());
    } catch (error) {
        yield put(acceptRequestFail(error));
    }
}

function* cancelRequestStart({ payload: { token, requestId, reason } }) {
    try {
        yield call(cancelRequest, token, requestId, reason);
        yield put(cancelRequestSuccess());
    } catch (error) {
        yield put(cancelRequestFail(error));
    }
}

function* pickedPatientStart({ payload: { token, requestId } }) {
    try {
        yield call(pickedPatient, token, requestId);
        yield put(pickedPatientSuccess());
    } catch (error) {
        yield put(pickedPatientFail(error));
    }
}

function* finishRequestStart({ payload: { token, requestId } }) {
    try {
        yield call(finishRequest, token, requestId);
        yield put(finishRequestSuccess());
    } catch (error) {
        yield put(finishRequestFail(error));
    }
}

export function* onFetchRequest() {
    yield takeLatest(RequestActionTypes.FETCH_REQUEST_START, fetchRequestStart);
}

export function* onAcceptRequest() {
    yield takeLatest(RequestActionTypes.ACCEPT_REQUEST_START, acceptRequestStart);
}

export function* onCancelRequest() {
    yield takeLatest(RequestActionTypes.CANCEL_REQUEST_START, cancelRequestStart);
}

export function* onPickedPatient() {
    yield takeLatest(RequestActionTypes.PICKED_PATIENT_START, pickedPatientStart);
}

export function* onFinishRequest() {
    yield takeLatest(RequestActionTypes.FINISH_REQUEST_START, finishRequestStart);
}

export default function* requestSagas() {
    yield all([
        call(onFetchRequest),
        call(onAcceptRequest),
        call(onCancelRequest),
        call(onPickedPatient),
        call(onFinishRequest)
    ]);
}
