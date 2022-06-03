import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { 
    signInSucces, 
    signInFail, 
    noCurrentUserSession, 
    signUpSuccess, 
    signUpFail,
    signOutSuccess,
    signOutFail
} from './user.action';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser, 
} from '../../utils/firebase/firebase.utils';


export function* getSnapShotFromUserAuth(userAuth, additionalUserInfo) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalUserInfo);
        yield put(signInSucces({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch(e) {
        yield put(signInFail(e));
    }
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return yield put(noCurrentUserSession());
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch(e) {
        yield put(signInFail(e));
    }   
};

export function* signInWithEmailAndPassword({payload: { email, password }}) {
    try {
        const { user } = yield call(signInUserWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth, user);
    } catch(e) {
        yield put(signInFail(e));
    }    
};

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch(e) {
        yield put(signInFail(e));
    }
};

export function* signUpUser({payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }))
    } catch(e) {
        yield put(signUpFail(e));
    }
};

export function* signOutCurrentUser() {
    try {
        const t = yield call(signOutUser);
        console.log(t);
        yield put(signOutSuccess());
    } catch(e) {
        yield put(signOutFail(e));
    }
};

export function* signInAfterSignUp({payload: { user, additionalUserInfo}}) {
    yield call(getSnapShotFromUserAuth, user, additionalUserInfo)
};

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
 };

 export function* onSignInWithEmailAndPassword() {
     yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
 };

 export function* onSignupStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
 };

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
};

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutCurrentUser);
};
 
export function* userSagas(){
    yield all([
        call(onCheckUserSession), 
        call(onSignInWithEmailAndPassword), 
        call(onGoogleSignIn), 
        call(onSignupStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
};