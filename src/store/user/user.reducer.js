import { USER_ACTION_TYPES, USER_INITIAL_STATE } from "./user.types";


export const userReducer = (state = USER_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                isLoading: false
            };
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isLoading: true
            };
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START: 
            return {
                ...state, 
                isLoading: true,
            };
        case USER_ACTION_TYPES.SIGN_IN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        case USER_ACTION_TYPES.CHECK_USER_SESSION: 
            return {
                ...state,
                isLoading: true
            };
        case USER_ACTION_TYPES.NO_CURRENT_USER_SESSION:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }

};