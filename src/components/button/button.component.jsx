import {BaseButton, GoolgSignInButton, InvertedButton} from './button.styles';

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

const Button = ({ title, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton 
            {...otherProps}
        >{title}</CustomButton>
    );
}

export default Button;