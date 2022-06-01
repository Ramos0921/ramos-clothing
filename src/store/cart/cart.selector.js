import { createSelector } from 'reselect';
import { cartItemAmountSum, cartItemTotalSum } from './cartUtils';

const selectCartReducer = state => state.cart;

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen,
);


export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);


export const selectCartItemCount = createSelector(
    [selectCartReducer], 
    (cart) => cartItemAmountSum(cart.cartItems),
);


export const selectCartItemTotal = createSelector(
    [selectCartReducer], 
    (cart) => cartItemTotalSum(cart.cartItems),
);
