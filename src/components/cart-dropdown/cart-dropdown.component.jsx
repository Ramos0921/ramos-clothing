import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart-context/cart.context';

const CartDropdown = () => {    
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    }

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                }
            </div>
            <Button title="GO TO CHECKOUT" onClick={goToCheckout}/>
        </div>
    )
}

export default CartDropdown;