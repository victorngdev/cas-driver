import { all, call, put, takeLatest } from "redux-saga/effects";

import RequestActionTypes from "./request.types";
import {
    acceptRequestFail,
    acceptRequestSuccess,
    cancelRequestFail,
    cancelRequestSuccess,
    fetchConfigFail,
    fetchConfigSuccess,
    fetchRequestsFail,
    fetchRequestsSuccess,
    finishRequestFail,
    finishRequestSuccess,
    pickedPatientFail,
    rejectRequestFail,
    rejectRequestSuccess
} from "./request.actions";
import {
    acceptRequest,
    cancelRequest,
    fetchRequest,
    pickedPatient,
    finishRequest,
    rejectRequest
} from "../../apis/request.apis";
import { updateStatusCode } from "../message/message.action";
import { fetchConfig } from "../../apis/core.apis";

function* fetchRequestsStart({ payload: { token, requestIds } }) {
    try {
        const queryParams = "requestId=" + requestIds.join("&requestId=");
        const response = yield call(fetchRequest, token, queryParams);

        yield put(fetchRequestsSuccess(response.data));
    } catch (error) {
        yield put(fetchRequestsFail(error));
    }
}

function* acceptRequestStart({ payload: { token, driverId, requestId, username, request } }) {
    try {
        yield call(acceptRequest, token, driverId, requestId, username);
        yield put(acceptRequestSuccess(request));
        yield put(updateStatusCode(206));
    } catch (error) {
        yield put(acceptRequestFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* cancelRequestStart({ payload: { token, driverId, requestId, reason } }) {
    try {
        yield call(cancelRequest, token, driverId, requestId, reason);
        yield put(cancelRequestSuccess());
        yield put(updateStatusCode(207));
    } catch (error) {
        yield put(cancelRequestFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* pickedPatientStart({ payload: { token, requestId } }) {
    try {
        yield call(pickedPatient, token, requestId);
        yield put(updateStatusCode(200));
    } catch (error) {
        yield put(pickedPatientFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* finishRequestStart({ payload: { token, requestId } }) {
    try {
        yield call(finishRequest, token, requestId);
        yield put(finishRequestSuccess());
        yield put(updateStatusCode(209));
    } catch (error) {
        yield put(finishRequestFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* rejectRequestStart({ payload: { token, requestIds, username } }) {
    try {
        const queryParams = "requestId=" + requestIds.join("&requestId=");

        yield call(rejectRequest, token, queryParams, username);
        yield put(rejectRequestSuccess(requestIds));
    } catch (error) {
        yield put(rejectRequestFail(error));
        yield put(updateStatusCode(error.message.includes("401") ? 700 : 402));
    }
}

function* fetchConfigStart({ payload: { token } }) {
    try {
        const response = yield call(fetchConfig, token);

        yield put(fetchConfigSuccess(response.data));
    } catch (error) {
        yield put(fetchConfigFail(error));
    }
}

export function* onFetchRequests() {
    yield takeLatest(RequestActionTypes.FETCH_REQUESTS_START, fetchRequestsStart);
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

export function* onRejectRequest() {
    yield takeLatest(RequestActionTypes.REJECT_REQUEST_START, rejectRequestStart);
}

export function* onFetchConfig() {
    yield takeLatest(RequestActionTypes.FETCH_SYSTEM_CONFIG_START, fetchConfigStart);
}

export default function* requestSagas() {
    yield all([
        call(onFetchRequests),
        call(onAcceptRequest),
        call(onCancelRequest),
        call(onPickedPatient),
        call(onFinishRequest),
        call(onRejectRequest),
        call(onFetchConfig)
    ]);
}
