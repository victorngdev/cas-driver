import MessageActionType from "./message.types";

const INITIAL_STATE = {
    statusCode: null
};

const messageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessageActionType.SUCCESS_ACTION_MESSAGE:
            return {
                ...state,
                statusCode: action.payload
            };
        case MessageActionType.CLEAR_STATUS_CODE:
            return {
                ...state,
                statusCode: null
            };
        default:
            return state;
    }
};

export default messageReducer;
