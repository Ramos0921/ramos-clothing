import { FormInputLabel, Input, Group } from './form-input.styles';
import { InputHTMLAttributes, FC } from 'react';

type FormInputPros = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputPros> = ({ label, ...inputOptions}) => {
    return (
        <Group>
            <Input {...inputOptions}/>
            {label && (
                <FormInputLabel 
                    shrink={Boolean(inputOptions?.value && typeof inputOptions?.value === 'string' && inputOptions?.value.length)}
                >{label}</FormInputLabel>
            )
            }
        </Group>
    );
}

export default FormInput;