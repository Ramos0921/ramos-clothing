import { createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, product) => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity ? itemFound.quantity++ : itemFound['quantity'] = 1;
        return [...cartItems];
    }
    return [ ...cartItems, { ...product, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const sum = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(sum);
    },[cartItems])

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}