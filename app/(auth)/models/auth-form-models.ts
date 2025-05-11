
export interface AuthFormInterface {
    headerText?: string;
    submitFunction: Function;
    fields: AuthFormField[];
    showPassForgot?: boolean;
}

export interface AuthFormField {
    id: string;
    name: string;
    // use formType for the type of form field
    formType: string;
    // type is used as subfield of formType (e.g: input type email)
    type?: string;
    textContent?: string;
    fieldProps: Map<string, FormProp>;
    value: string | number | boolean;
    valueChange: Function;
    validator?: Function;
}

export interface FormProp {
    [prop: string]: string | number | boolean
}