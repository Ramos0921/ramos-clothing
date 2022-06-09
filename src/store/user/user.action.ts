import { USER_ACTION_TYPES } from './user.types';
import { createAction, withMatcher, Action, ActionWithPayload } from '../../utils/reducer-utils/reducer-utils';
import { AdditionalUserInfo, UserData } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type NoCurrentUserSession = Action<USER_ACTION_TYPES.NO_CURRENT_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
export type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIL, Error>
export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>;
export type SignUpFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAIL, Error>
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: User, additionalUserInfo: AdditionalUserInfo}>
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIL, Error>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser  => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});

export const checkUserSession = withMatcher((): CheckUserSession => {
    return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
});

export const noCurrentUserSession = withMatcher((): NoCurrentUserSession => {
    return createAction(USER_ACTION_TYPES.NO_CURRENT_USER_SESSION);
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
    return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
});

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart=> {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password})
});

export const signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
});

export const signInFail = withMatcher((error: Error): SignInFail  => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error)
});

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName});
});

export const signUpFail = withMatcher((error: Error): SignUpFail => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_FAIL, error);
});

export const signUpSuccess = withMatcher((user: User, additionalUserInfo: AdditionalUserInfo): SignUpSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalUserInfo});
});

export const signOutStart = withMatcher((): SignOutStart => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutFail = withMatcher((error: Error): SignOutFail => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error);
});
