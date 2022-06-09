import { CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";

export const addCartItem = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity ? itemFound.quantity++ : itemFound['quantity'] = 1;
        return [...cartItems];
    }
    return [ ...cartItems, { ...product, quantity: 1}];
};

export const removeCartItem = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity >= 2 ? itemFound.quantity-- : itemFound.quantity = 0;
        return cartItems.filter(item => item.quantity > 0);
    }
    return [...cartItems];
};

export const removeItemFromCart = (cartItems: CartItem[], product: CategoryItem): CartItem[] => cartItems.filter(item => item.id !== product.id);

export const cartItemAmountSum = (cartItems: CartItem[]): number => cartItems?.reduce((total, item) => total + item.quantity, 0);

export const cartItemTotalSum = (cartItems: CartItem[]): number => cartItems?.reduce((total, item) => total + (item.quantity * item.price), 0);