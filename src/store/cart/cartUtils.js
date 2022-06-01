

export const addCartItem = (cartItems, product) => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity ? itemFound.quantity++ : itemFound['quantity'] = 1;
        return [...cartItems];
    }
    return [ ...cartItems, { ...product, quantity: 1}];
};

export const removeCartItem = (cartItems, product) => {
    const itemFound = cartItems.find(item => item.id === product.id);
    if(itemFound){ 
        itemFound.quantity >= 2 ? itemFound.quantity-- : itemFound.quantity = 0;
        return cartItems.filter(item => item.quantity > 0);
    }
    return [...cartItems];
};

export const removeItemFromCart = (cartItems, product) => cartItems.filter(item => item.id !== product.id);

export const cartItemAmountSum = cartItems => cartItems?.reduce((total, item) => total + item.quantity, 0);

export const cartItemTotalSum = cartItems => cartItems?.reduce((total, item) => total + (item.quantity * item.price), 0);