import { takeLatest, all, call, put } from "redux-saga/effects";

import { registerAmbulance, updateAmbulance } from "../../apis/ambulance.apis";
import { updateConfirmingStatus } from "../user/user.actions";
import {
    registerAmbulanceFail,
    registerAmbulanceSuccess,
    updateAmbulanceFail,
    updateAmbulanceSuccess
} from "./ambulance.actions";

import AmbulanceActionTypes from "./ambulance.types";

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

export default function* ambulanceSagas() {
    yield all([call(onRegisterAmbulance), call(onUpdateAmbulance)]);
}
