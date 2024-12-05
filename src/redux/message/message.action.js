import MessageActionType from "./message.types";

export const updateStatusCode = statusCode => ({
    type: MessageActionType.SUCCESS_ACTION_MESSAGE,
    payload: statusCode
});

export const clearStatusCode = () => ({
    type: MessageActionType.CLEAR_STATUS_CODE
});
