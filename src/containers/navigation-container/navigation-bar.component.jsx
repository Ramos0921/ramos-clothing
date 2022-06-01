import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from '../../assets/logos/nav-crown-logo/crown.svg'
import { selectCurrentUser } from '../../store/user/user.selector';
import { 
    NavigationContainer, 
    LogoContainer,
    NavLinks, 
    NavLink
} from'./navigation-bar.styles';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart-context/cart.context";

const NavigationBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    { currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>   
                    ) : 
                    (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default NavigationBar;