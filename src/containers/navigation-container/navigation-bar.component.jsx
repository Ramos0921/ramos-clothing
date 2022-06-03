import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from '../../assets/logos/nav-crown-logo/crown.svg'
import { selectCurrentUser } from '../../store/user/user.selector';
import { 
    NavigationContainer, 
    LogoContainer,
    NavLinks, 
    NavLink
} from'./navigation-bar.styles';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from "../../store/user/user.action";
import { clearCart } from "../../store/cart/cart.action";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen  = useSelector(selectIsCartOpen);

    const signOut = () => {
        try {
            dispatch(signOutStart());
            dispatch(clearCart());
        } catch (e) {   
            console.error(e);
        }
    };
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    { currentUser ? (
                        <NavLink as='span' onClick={signOut}>SIGN OUT</NavLink>   
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