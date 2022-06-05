import { CART_ACTION_TYPES, CART_INITIAL_STATE } from "./cart.types";
import { USER_ACTION_TYPES } from "../user/user.types";


export const cartReducer = (state = CART_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN: 
            return { ...state, isCartOpen: payload };
        case CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS: 
            return { ...state, cartItems: payload };
        case CART_ACTION_TYPES.SUCCESSFUL_PAYMENT_CLEAR_CART:
            return CART_INITIAL_STATE;
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS: 
            return CART_INITIAL_STATE;
        default: 
        return state;
    }
};