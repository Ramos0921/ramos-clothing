import { useContext } from 'react';
import { CartContext } from "../../contexts/cart-context/cart.context";
import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
    const {addItemToCart, removeFromCart, clearItemFromCart} = useContext(CartContext);
    const {id, name, quantity, price, imageUrl} = item;

    const handleClearItem = () => {
        clearItemFromCart(item);
    }

    const handleIncrement = () => {
        addItemToCart(item);
    }

    const handleDecrement = () => {
        removeFromCart(item);
    }

    return (
        <div className='checkout-item-container'>
            <div className="image-container">
                <img src={imageUrl} alt="Picture" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={handleDecrement}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={handleIncrement}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={handleClearItem}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;