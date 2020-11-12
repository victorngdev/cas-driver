import { all, call } from "redux-saga/effects";

import userSagas from "./user/user.sagas";
import requestSagas from "./request/request.sagas";

export default function* rootSaga() {
    yield all([call(userSagas), call(requestSagas)]);
}
