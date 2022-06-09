import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import { 
    signInSuccess, 
    signInFail, 
    noCurrentUserSession, 
    signUpSuccess, 
    signUpFail,
    signOutSuccess,
    signOutFail,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from './user.action';
import { User } from 'firebase/auth';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalUserInfo,
} from '../../utils/firebase/firebase.utils';


export function* getSnapShotFromUserAuth(userAuth: User, additionalUserInfo?: AdditionalUserInfo) {
    try {
        const userSnapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalUserInfo);
        if(userSnapShot) yield* put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch(e) {
        yield* put(signInFail(e as Error));
    }
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return yield* put(noCurrentUserSession());
        yield* call(getSnapShotFromUserAuth, userAuth);
    } catch(e) {
        yield* put(signInFail(e as Error));
    }   
};

export function* signInWithEmailAndPassword({payload: { email, password }}: EmailSignInStart) {
    try {
        const userCred = yield* call(signInUserWithEmailAndPassword, email, password);
        if(userCred) {
            const { user } = userCred;
            yield* call(getSnapShotFromUserAuth, user);
        }
    } catch(e) {
        yield* put(signInFail(e as Error));
    }    
};

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapShotFromUserAuth, user);
    } catch(e) {
        yield* put(signInFail(e as Error));
    }
};

export function* signUpUser({payload: { email, password, displayName }}: SignUpStart) {
    try {
        const userCred = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if(userCred){
            const { user } = userCred;
            yield* put(signUpSuccess(user, { displayName }))
        }
    } catch(e) {
        yield* put(signUpFail(e as Error));
    }
};

export function* signOutCurrentUser() {
    try {
         yield* call(signOutUser);
      
        yield* put(signOutSuccess());
    } catch(e) {
        yield put(signOutFail(e as Error));
    }
};

export function* signInAfterSignUp({payload: { user, additionalUserInfo}}: SignUpSuccess) {
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