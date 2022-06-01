import { useSelector } from 'react-redux';
import './checkout.styles.scss';
import { selectCartItems, selectCartItemTotal } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const costTotal = useSelector(selectCartItemTotal);

    return (
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block">
                    Product
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </div>
            {
                cartItems.map(item => {
                    return (
                        <CheckoutItem key={item.id} item={item}/>
                    )
                })
            }
            <span className="total">Total: ${costTotal}</span>
        </div>
    )
};
 
export default Checkout;
