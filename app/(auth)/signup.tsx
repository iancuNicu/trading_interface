
import { AuthFormInterface } from "./models/auth-form-models";
import { useState } from "react";
import AuthForm from "../components/auth-form";
import { useRouter } from 'expo-router';
import { useSignupMutation } from "@/store/authentication/auth.api";

export default function Signup() {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [signup, { isLoading, isError, error, isSuccess, data }] = useSignupMutation()
     const router = useRouter();
     router.navigate('/(app)/home')
    
     async function submitFunction(onDoneCallback: Function) {
        try {
            const result = await signup({"user": {
                email: email , 
                password: password
            }}).unwrap();
            console.log('Signup successful:', result);
        }
        catch (e) {
             // TODO: add error message on fail
            console.log('error ', e);
        }
        onDoneCallback('submitted')
    }

    const emailValidator = (inputEmail: string) => {
        return !!(String(inputEmail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ));
    }

    const createFielPropMap = (field: string) => {
        const propMap = new Map();
        switch (field) {
            case 'email': 
                propMap.set('required', 'true')
                propMap.set('minWidth', '100%')
                propMap.set('size', '$4')
                propMap.set('borderWidth', 2)
            break;
            case 'password':
                propMap.set('required', true)
                propMap.set('minWidth', '100%')
                propMap.set('size', '$4')
                propMap.set('borderWidth', 2)
                propMap.set('textContentType', 'oneTimeCode')
                propMap.set('secureTextEntry', true)
        }
        return propMap
    }

    const signupConfig: AuthFormInterface = {
            headerText: 'Signup',
            submitFunction,
            fields: [
                {
                    name: 'email@example.com',
                    formType: 'input',
                    id: 'email',
                    type: 'email',
                    textContent: 'email',
                    fieldProps: createFielPropMap('email'),
                    value: email,
                    valueChange: setEmail,
                    validator: emailValidator
                },
                {
                    name: 'Enter password',
                    formType: 'input',
                    id: 'password',
                    textContent: 'password',
                    fieldProps: createFielPropMap('password'),
                    value: password,
                    valueChange: setPassword
                }
            ]
        }

    return (
        <AuthForm formConfig={signupConfig} />
    )
}