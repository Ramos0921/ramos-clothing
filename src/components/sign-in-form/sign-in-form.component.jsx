import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInUserWithEmailAndPassword(email, password);
            resetForm();
        } catch(e){
            if(e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'){
                alert('Wrong log in information!')
            }
            console.error(e.message)
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    return (
        <div className="sign-up-container">
            <h2>Already Have An Account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email" 
                    inputOptions = {{
                        type:"email", 
                        required: true,
                        name:"email",
                        value: email,
                        onChange: handleChange
                    }}
                />
                <FormInput 
                    label="Password" 
                    inputOptions = {{
                        type:"password",
                        required: true,
                        name:"password",
                        value: password,
                        onChange: handleChange
                    }}
                />
                <div className="buttons-container">
                    <Button type="submit" title="Sign In"/>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle} title="Google Sign In"/>
                </div>
            </form>
        </div>
    );

}

export default SignInForm;