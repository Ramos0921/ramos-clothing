import {  useState, FormEvent, ChangeEvent} from "react";
import { useDispatch } from 'react-redux';
import FormInput from "../form-input/form-input.component";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetForm();
        } catch(e){
            console.error(e);
        }
    }

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart())
    }

    return (
        <SignInContainer>
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={handleSubmit}>
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
            <ButtonsContainer>
              <Button title="Sign In" type='submit'></Button>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.google}
                title= 'Sign In With Google'
                onClick={signInWithGoogle}
                type='button'
              >
              </Button>
            </ButtonsContainer>
          </form>
        </SignInContainer>
      );
    };

export default SignInForm;