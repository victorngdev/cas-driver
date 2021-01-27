import { createSelector } from "reselect";

const selectRequest = state => state.request;

export const selectCurrentRequest = createSelector(
    [selectRequest],
    request => request.currentRequest
);

export const selectRequestId = createSelector(
    [selectCurrentRequest],
    currentRequest => (currentRequest && currentRequest.requestId) || 0
);

export const selectIsAccepted = createSelector([selectRequest], request => request.isAccepted);

export const selectIsArrived = createSelector([selectRequest], request => request.isArrived);

export const selectHistory = createSelector([selectRequest], request => request.history);

export const selectRequestTimeout = createSelector(
    [selectRequest],
    request => request.config.requestTimeout
);

export const selectRequestList = createSelector([selectRequest], request => request.requestList);

export const selectRequestCount = createSelector(
    [selectRequest],
    request => request.requestList.length
);
