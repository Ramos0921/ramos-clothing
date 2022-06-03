import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = user => {
    return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }
};

export const checkUserSession = () => {
    return { type: USER_ACTION_TYPES.CHECK_USER_SESSION };
};

export const noCurrentUserSession = () => {
    return { type: USER_ACTION_TYPES.NO_CURRENT_USER_SESSION};
};

export const googleSignInStart = () => {
    return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START};
};

export const emailSignInStart = (email, password) => {
    return { type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: {email, password}};
};

export const signInSucces = user => {
    return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user };
};

export const signInFail = error => {
    return { type: USER_ACTION_TYPES.SIGN_IN_FAIL, payload: error };
};