import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
    const dispatch = useDispatch();    
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckout = () => {
        dispatch(setIsCartOpen(false));
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>) :
                    <EmptyMessage>Cart Empty</EmptyMessage>
                }
            </CartItems>
            <Button title="GO TO CHECKOUT" onClick={goToCheckout}/>
        </CartDropdownContainer>
    )
}

export default CartDropdown;