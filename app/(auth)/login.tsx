import { useState } from "react";
import AuthForm from "../components/auth-form";
import { AuthFormInterface } from "./models/auth-form-models";
import { useLoginMutation } from "@/store/authentication/auth.api";
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const [login, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();

    const {user} = useSelector((state: any) => state.auth)

    async function submitFunction (onDoneCallback: Function) {
        try {
            const result = await login({"user": {
                email: email , 
                password: password
            }}).unwrap();
            router.navigate('/(app)/home')
        }
        catch (e) {
            // TODO: add error message on fail
            console.log('error ', e);
        }
        onDoneCallback('submitted')
    }

    const emailValidator = (inputEmail: string) => {
        const isValid = !!(String(inputEmail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ));
        return isValid
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

    const loginConfig: AuthFormInterface = {
        headerText: 'Login',
        submitFunction,
        showPassForgot: true,
        fields: [
            {
                name: 'email',
                formType: 'input',
                id: 'email',
                type: 'email',
                textContent: 'email@example.com',
                fieldProps: createFielPropMap('email'),
                value: email,
                valueChange: setEmail,
                validator: emailValidator
            },
            {
                name: 'password',
                formType: 'input',
                id: 'password',
                textContent: 'Enter password',
                fieldProps: createFielPropMap('password'),
                value: password,
                valueChange: setPassword
            }
        ]
    }

    return (
        <AuthForm formConfig={loginConfig} />
    )
}