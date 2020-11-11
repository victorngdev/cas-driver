import { combineReducers } from "redux";

import userReducer from "./user/user.reducers";
import requestReducer from "./request/request.reducers";

const rootReducer = combineReducers({
    user: userReducer,
    request: requestReducer
});

export default rootReducer;
