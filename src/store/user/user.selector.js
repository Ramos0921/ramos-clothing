import { createSelector } from 'reselect';

const selectUserReducer = state => state.user.currentUser;

export const selectCurrentUser = createSelector(
    [selectUserReducer], 
    (user) => user
);