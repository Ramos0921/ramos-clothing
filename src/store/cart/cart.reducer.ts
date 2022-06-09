import { CART_INITIAL_STATE, CartInitialState } from "./cart.types";
import { AnyAction } from "redux";
import { setIsCartOpen, setCartItems, successfulPaymentClearCart } from "./cart.action";


export const cartReducer = (
    state = CART_INITIAL_STATE, 
    action: AnyAction
): CartInitialState  => {
    if(setIsCartOpen.match(action)) return { ...state, isCartOpen: action.payload };
    if(setCartItems.match(action)) return { ...state, cartItems: action.payload };
    if(successfulPaymentClearCart.match(action)) return CART_INITIAL_STATE;
     
    return state;
};