import { UserInitialState, USER_INITIAL_STATE } from "./user.types";
import { 
    signInSuccess, 
    signOutSuccess, 
    signOutFail, 
    signInFail, 
    signUpFail, 
    emailSignInStart,
    googleSignInStart, 
    checkUserSession, 
    noCurrentUserSession, 
    signUpStart,
    signUpSuccess,
    signOutStart
} from "./user.action";
import { AnyAction } from "redux";

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserInitialState => {
    if(signInSuccess.match(action)) return {
        ...state,
        currentUser: action.payload,
        isLoading: false
    };

    if(emailSignInStart.match(action)) return {
        ...state,
        isLoading: true
    };

    if(googleSignInStart.match(action)) return {
        ...state, 
        isLoading: true,
    };

    if(signInFail.match(action)) return {
        ...state,
        isLoading: false,
        error: action.payload
    };

    if(checkUserSession.match(action)) return {
        ...state,
        isLoading: true
    };

    if(noCurrentUserSession.match(action)) return {
        ...state,
        isLoading: false,
    };

    if(signUpStart.match(action)) return {
        ...state,
        isLoading: true,
    };

    if(signUpSuccess.match(action)) return {
        ...state,
        isLoading: true,
    };

    if(signUpFail.match(action)) return {
        ...state,
        isLoading: false,
        error: action.payload,
    };

    if(signOutStart.match(action)) return {
        ...state,
        isLoading: true,
    };

    if(signOutSuccess.match(action)) return USER_INITIAL_STATE;

    if(signOutFail.match(action)) return {
        ...state,
        isLoading: false,
        error: action.payload,
    };
    
    return state;
};