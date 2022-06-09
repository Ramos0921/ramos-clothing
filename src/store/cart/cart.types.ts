import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    SET_CURRENT_CART_ITEMS= 'CART/SET_CURRENT_CART',
    SET_CURRENT_ISCARTOPEN= 'CART/SET_CURRENT_ISCARTOPEN',
    SUCCESSFUL_PAYMENT_CLEAR_CART= 'CART/SUCCESSFUL_PAYMENT_CLEAR_CART',
};

export type CartItem = CategoryItem & {
    quantity: number;
};

export type CartInitialState = {
    readonly isCartOpen: boolean,
    readonly cartItems: CartItem[],
};
export const CART_INITIAL_STATE: CartInitialState = {
    isCartOpen: false,
    cartItems: [],
};