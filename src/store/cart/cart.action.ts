import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";
import { addCartItem, removeCartItem, removeItemFromCart } from "./cartUtils";
import { createAction, withMatcher, ActionWithPayload, Action} from "../../utils/reducer-utils/reducer-utils";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, CartItem[]>;
export type SuccessfulPaymentClearCart = Action<CART_ACTION_TYPES.SUCCESSFUL_PAYMENT_CLEAR_CART>;


export const setIsCartOpen = withMatcher((toogleBool: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN, toogleBool);
});

export const setCartItems = withMatcher((items: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, items));

export const addItemToCart = (currentCartItems: CartItem[], item: CategoryItem) => {
    return setCartItems(addCartItem(currentCartItems, item));
}

export const removeFromCart = (currentCartItems: CartItem[], item: CategoryItem) => {
    return setCartItems(removeCartItem(currentCartItems, item));
}

export const clearItemFromCart = (currentCartItems: CartItem[], item: CategoryItem) => {
    return setCartItems(removeItemFromCart(currentCartItems, item));
}

export const successfulPaymentClearCart = withMatcher((): SuccessfulPaymentClearCart  => {
    return createAction(CART_ACTION_TYPES.SUCCESSFUL_PAYMENT_CLEAR_CART);
});

