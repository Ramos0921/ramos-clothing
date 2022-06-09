import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer } from './sign-up-form.styles';
import { AuthErrorCodes, AuthError } from 'firebase/auth';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
 
    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            resetForm();
        } catch(e){
            if((e as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Email already in use');
                return;
            }
            console.error((e as AuthError).message)
        }
    }


    return (
        <SignUpContainer>
          <h2>Don't have an account?</h2>
          <span>Sign up with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              label='Display Name'
              type='text'
              required
              onChange={handleChange}
              name='displayName'
              value={displayName}
            />
    
            <FormInput
              label='Email'
              type='email'
              required
              onChange={handleChange}
              name='email'
              value={email}
            />
    
            <FormInput
              label='Password'
              type='password'
              required
              onChange={handleChange}
              name='password'
              value={password}
            />
    
            <FormInput
              label='Confirm Password'
              type='password'
              required
              onChange={handleChange}
              name='confirmPassword'
              value={confirmPassword}
            />
            <Button title='Sign Up' type='submit'></Button>
          </form>
        </SignUpContainer>
      );
 };

export default SignUpForm;