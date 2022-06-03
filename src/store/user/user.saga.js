import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { signInSucces, signInFail, noCurrentUserSession } from './user.action';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
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

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
 };

 export function* onSignInWithEmailAndPassword(){
     yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
 };

 
export function* userSagas(){
    yield all([call(onCheckUserSession), call(onSignInWithEmailAndPassword), call(onGoogleSignIn)]);
};