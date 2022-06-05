import {BaseButton, GoolgSignInButton, InvertedButton, ButtonSpinner} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

const getButton = (type = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base] : BaseButton, 
        [BUTTON_TYPE_CLASSES.google] : GoolgSignInButton,
        [BUTTON_TYPE_CLASSES.inverted] : InvertedButton,
    }[type]
);

const Button = ({ title, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton 
            disabled={isLoading}
            {...otherProps}
        >{isLoading ? (<ButtonSpinner/>) : title}</CustomButton>
    );
}

export default Button;