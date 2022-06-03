import { CART_ACTION_TYPES, CART_INITIAL_STATE } from "./cart.types";


export const cartReducer = (state = CART_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN: 
            return { ...state, isCartOpen: payload };
        case CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS: 
            return { ...state, cartItems: payload };
        case CART_ACTION_TYPES.CLEAR_CART: 
            return CART_INITIAL_STATE;
        default: 
        return state;
    }
};