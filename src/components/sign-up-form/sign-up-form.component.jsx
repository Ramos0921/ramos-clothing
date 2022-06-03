import {  useState } from "react";
import { useDispatch } from 'react-redux';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";
import './sign-up-form.styles.scss'

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            resetForm();
        } catch(e){
            if(e.code === 'auth/email-already-in-use') {
                alert('Email already in use');
                return;
            }
            console.error(e.message)
        }
    }


    return (
        <div className="sign-up-container">
            <h2>Don't Have An Account?</h2>
            <span>Sign up with you remail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    inputOptions = {{
                        type:"text",
                        required: true,
                        name:"displayName",
                        value: displayName,
                        onChange: handleChange
                    }}
                />
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
                <FormInput 
                    label="Confirm Password" 
                    inputOptions ={{
                        type:"password",
                        required: true,
                        name:"confirmPassword",
                        value: confirmPassword,
                        onChange: handleChange
                    }}
                />
                <Button type="submit" title="Sign Up"/>
            </form>
        </div>
    );

}

export default SignUpForm;