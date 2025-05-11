import { Button, Form, H4, Spinner, Input, View, Anchor, Paragraph } from 'tamagui'
import { useEffect, useReducer, useState } from 'react'
import { AuthFormField, AuthFormInterface, FormProp } from '../(auth)/models/auth-form-models'

export default function AuthForm(props: {formConfig: AuthFormInterface}) {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
    const [isValid, setIsValid] = useState(false);
    const [validState, dispatchValid] = useReducer(validReducer, getValidInitState())

    function getValidInitState() {
        let newObj = {}
        props.formConfig.fields.forEach(field => {
            newObj = {
                ...newObj,
                [field.id]: false
            }
        })
        return newObj;
    }

    useEffect(() => {
        const objKeys = Object.keys(validState);
        const nonValidElement = objKeys.some(key => validState[key]===false)
        setIsValid(!nonValidElement)
    }, [validState])

    function validReducer(state: any, action: any) {
        return {
            ...state,
            [action.fieldId]: action.validator ? action.validator(action.value) : true
        }
    }

    const onSubmit = () => {
        if(status === 'submitting'){
            return ;
        }
        else {
          setStatus('submitting')
          props.formConfig.submitFunction(setStatus)
        }
    }

    const getFieldPropsObj = (fieldProps: Map<string, FormProp>) => {
        return Object.fromEntries(fieldProps)
    }

    const onFieldChange = (field: AuthFormField, value: any) => {
        field.valueChange(value.nativeEvent.text);
        dispatchValid({
            fieldId: field.id,
            validator: field.validator,
            value: value.nativeEvent.text
        })
    }

    const buildForm = () => {
        return (
            <>
              { props.formConfig.fields.map(field => {
                const FormElement = getFormElementType(field.type);
                return (<FormElement {...field.fieldProps} 
                                    key={field.name}
                                    onChange={(value) => onFieldChange(field, value)}
                                    {...getFieldPropsObj(field.fieldProps)}
                            placeholder={field.textContent || "....."}> 
                        </FormElement>)
              }) }   
            </>
        )
    }

    const getFormElementType = (type: string) => {
        return Input
    }

    return (
        <>
            <View
                flexDirection='column'
                alignItems='center'
                flex={1}
                alignSelf='center'
                minWidth="100%"
                maxWidth="100%"
                justifyContent='center'
                backgroundColor="$background">
                {
                    props.formConfig.headerText && 
                    <H4 backgroundColor="$background"
                    alignSelf='center'>
                            {props.formConfig.headerText}
                    </H4>
                }
                <Form 
                    alignItems="center"
                    minWidth={300}
                    minHeight="40%"
                    gap="$2"
                    onSubmit={onSubmit}
                    justifyContent='space-between'
                    padding="$6">
                        {buildForm()}
                        {props.formConfig.showPassForgot ? 
                            <View width="100%">
                                <ForgotPass />
                            </View> 
                        : null}
                        <Form.Trigger asChild disabled={status !== 'off'}>
                            <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}
                                    disabled={!isValid}>
                                Submit
                            </Button>
                        </Form.Trigger>
                </Form>
            </View>
        </>
    )
}

function ForgotPass() {
    return (
        <Anchor alignSelf="flex-end">
            <Paragraph size="$1"
                        marginTop="$1">
                Forgot your password?
            </Paragraph>
        </Anchor>
    )
}