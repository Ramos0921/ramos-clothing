import { UserData } from "../../utils/firebase/firebase.utils";

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = 'USER/SET_CURRENT_USER',
    CHECK_USER_SESSION = 'USER/CHECK_USER_SESSION',
    NO_CURRENT_USER_SESSION = 'USER/NO_CURRENT_USER_SESSION',
    GOOGLE_SIGN_IN_START = 'USER/GOOGLE_SIGN_IN_START', 
    EMAIL_SIGN_IN_START = 'USER/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS = 'USER/SIGN_IN_SUCCESS',
    SIGN_IN_FAIL = 'USER/SIGN_IN_FAIL', 
    SIGN_UP_START = 'USER/SIGN_UP_START',
    SIGN_UP_SUCCESS = 'USER/SIGN_UP_SUCCESS',
    SIGN_UP_FAIL = 'USER/SIGN_UP_FAIL',
    SIGN_OUT_START = 'USER/SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'USER/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAIL = 'USER/SIGN_OUT_FAIL',
}

export type UserInitialState = {
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: Error | null,
};
export const USER_INITIAL_STATE: UserInitialState = {
    currentUser: null, 
    isLoading: false, 
    error: null,
};