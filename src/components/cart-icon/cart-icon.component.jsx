import { ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context/cart.context";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer>
            <ShoppingIcon className='shopping-icon' onClick={toggleCart}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;