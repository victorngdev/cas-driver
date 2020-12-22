import { createSelector } from "reselect";

const selectMessage = state => state.message;

export const selectStatusCode = createSelector([selectMessage], message => message.statusCode);
