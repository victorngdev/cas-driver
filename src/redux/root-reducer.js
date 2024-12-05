import { combineReducers } from "redux";

import userReducer from "./user/user.reducers";
import requestReducer from "./request/request.reducers";
import ambulanceReducer from "./ambulance/ambulance.reducers";
import messageReducer from "./message/message.reducers";

const rootReducer = combineReducers({
    user: userReducer,
    request: requestReducer,
    ambulance: ambulanceReducer,
    message: messageReducer
});

export default rootReducer;
