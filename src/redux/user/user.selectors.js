import { create } from "react-native-extended-stylesheet";
import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectToken = createSelector(
    [selectCurrentUser],
    currentUser => `Bearer ${currentUser.token}`
);

export const selectUsername = createSelector(
    [selectCurrentUser],
    currentUser => currentUser.username
);
