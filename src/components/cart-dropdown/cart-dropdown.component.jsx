import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

const CartDropdown = () => {

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">

            </div>
            <Button title="GO TO CHECKOUT"/>
        </div>
    )
}

export default CartDropdown;