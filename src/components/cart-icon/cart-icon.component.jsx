import { ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';
import { useDispatch, useSelector } from 'react-redux'; 
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartItemCount } from '../../store/cart/cart.selector';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartItemCount);
    
    const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;