import { createContext, useEffect, useState} from "react";

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [costTotal, setCostTotal] = useState(0);

    useEffect(() => {
        const itemSum = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(itemSum);
    },[cartItems]);

    useEffect(() => {
        const costSum = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        setCostTotal(costSum);
    },[cartItems])

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    const removeFromCart = (product) => {
        setCartItems(removeCartItem(cartItems, product));
    }

    const clearItemFromCart = (product) => {
        setCartItems(removeItemFromCart(cartItems, product));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeFromCart, clearItemFromCart, costTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}