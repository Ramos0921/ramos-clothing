import {BaseButton, GoolgSignInButton, InvertedButton, ButtonSpinner} from './button.styles';
import { FC, ButtonHTMLAttributes } from 'react';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
};

const getButton = (type = BUTTON_TYPE_CLASSES.base): typeof BaseButton => (
    {
        [BUTTON_TYPE_CLASSES.base] : BaseButton, 
        [BUTTON_TYPE_CLASSES.google] : GoolgSignInButton,
        [BUTTON_TYPE_CLASSES.inverted] : InvertedButton,
    }[type]
);

export type ButtonProps = {
    title: string,
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ title, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton 
            disabled={isLoading}
            {...otherProps}
        >{isLoading ? (<ButtonSpinner/>) : title}</CustomButton>
    );
}

export default Button;