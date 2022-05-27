import './cart-icon.styles.scss';
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from '../../assets/logos/shopping-cart-icon/shopping-bag.svg'
import { CartContext } from "../../contexts/cart-context/cart.context";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleCart}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;