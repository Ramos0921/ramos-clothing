import { createContext, useEffect, useReducer} from "react";

export const CART_ACTION_TYPES = {
    SET_CURRENT_CART_ITEMS: 'SET_CURRENT_CART',
    SET_CURRENT_ISCARTOPEN: 'SET_CURRENT_ISCARTOPEN',
    SET_CURRENT_CART_COUNT: 'SET_CURRENT_CART_COUNT', 
    SET_CURRENT_COST_TOTAL: 'SET_CURRENT_COST_TOTAL',
};

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    costTotal: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN: 
            return { ...state, isCartOpen: payload };
        case CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS: 
            return { ...state, cartItems: payload };
        case CART_ACTION_TYPES.SET_CURRENT_CART_COUNT: 
            return { ...state, cartCount: payload};
        case CART_ACTION_TYPES.SET_CURRENT_COST_TOTAL: 
            return { ...state, costTotal: payload};
        default: 
        return new Error(`Unhandled type ${type} in cartReducer`);
    }
};

const addCartItem = (cartItems, product) => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity ? itemFound.quantity++ : itemFound['quantity'] = 1;
        return [...cartItems];
    }
    return [ ...cartItems, { ...product, quantity: 1}];
};

const removeCartItem = (cartItems, product) => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity >= 2 ? itemFound.quantity-- : itemFound.quantity = 0;
        return cartItems.filter(item => item.quantity > 0);
    }
    return [...cartItems];
};

const removeItemFromCart = (cartItems, product) => cartItems.filter(item => item.id !== product.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeFromCart: () => {},
    clearItemFromCart: () => {},
    costTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [ { isCartOpen, cartItems, cartCount, costTotal }, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        const itemSum = cartItems.reduce((total, item) => total + item.quantity, 0);
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_CART_COUNT, payload: itemSum });
    },[cartItems]);

    useEffect(() => {
        const costSum = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_COST_TOTAL, payload: costSum});
    },[cartItems])

    const addItemToCart = (product) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: addCartItem(cartItems, product)})
    }

    const removeFromCart = (product) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: removeCartItem(cartItems, product)});
    }

    const clearItemFromCart = (product) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_CART_ITEMS, payload: removeItemFromCart(cartItems, product)});
    }

    const setIsCartOpen = (cartToogle) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CURRENT_ISCARTOPEN, payload: cartToogle})
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeFromCart, clearItemFromCart, costTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}