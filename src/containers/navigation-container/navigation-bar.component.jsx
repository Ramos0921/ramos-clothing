import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from '../../assets/logos/nav-crown-logo/crown.svg'
import { UserContext } from "../../contexts/user-context/user.context";
import './navigation-bar.styles.scss'
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart-context/cart.context";

const NavigationBar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    { currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>   
                    ) : 
                    (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )}
                    <CartIcon />
                </div>
                {
                    isCartOpen && <CartDropdown />
                }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavigationBar;