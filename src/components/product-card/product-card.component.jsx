import { useContext } from 'react';
import './product-card.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../../contexts/cart-context/cart.context';


const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { cartItems, addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} title="Add To Cart" onClick={addProductToCart}></Button>
        </div>
    ); 
}

export default ProductCard;
