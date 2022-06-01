import { CART_ACTION_TYPES } from "./cart.types";
import { addCartItem, removeCartItem, removeItemFromCart } from "./cartUtils";

export const setIsCartOpen = toogleBool => {
    return {type: CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN, payload: toogleBool};
}

export const addItemToCart = (curretnCartItem, item) => {
    return {type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: addCartItem(curretnCartItem, item)}
}

export const removeFromCart = (curretnCartItem, item) => {
    return {type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: removeCartItem(curretnCartItem, item)}
}

export const clearItemFromCart = (curretnCartItem, item) => {
    return {type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: removeItemFromCart(curretnCartItem, item)}
}
