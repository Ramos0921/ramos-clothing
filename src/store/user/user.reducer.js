import { createContext, useEffect, useReducer} from "react";
import { USER_ACTION_TYPES } from "./user.types";
import { USER_INITIAL_STATE } from "./user.types";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const userReducer = (state = USER_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            return state;
    }

};