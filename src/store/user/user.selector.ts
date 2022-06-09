import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserInitialState } from './user.types';

const selectUserReducer = (state: RootState): UserInitialState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer], 
    (user) => user.currentUser
);