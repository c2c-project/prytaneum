/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import * as Yup from 'yup';

type TSchema<T extends Record<string, unknown>> = Yup.ObjectSchema<
    {
        [key in keyof T]: Yup.SchemaOf<T[key]>;
    }
>;

export function useForm<TForm extends Record<string, unknown>>(initialState: TForm, validationSchema?: TSchema<TForm>) {
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState<Partial<TForm>>({});
    function buildHandleSubmit(callback?: (form: TForm) => void) {
        return (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const isValid = form.checkValidity();
            if (!isValid) {
                const { elements } = form; // can't destructure this above b/c checkValidity can't so yeah
                const elementArr = Array.from(elements) as HTMLInputElement[]; // I know this because it's a form, and I code them
                const formErrors = elementArr.reduce<Partial<TForm>>((accum, element) => {
                    if (element.validationMessage)
                        return {
                            ...accum,
                            [element.name]: element.validationMessage,
                        };
                    return accum;
                }, {});
                setErrors(formErrors);
            } else if (callback) {
                if (validationSchema) {
                    validationSchema
                        .validate(state)
                        .then(() => {
                            callback(state);
                        })
                        .catch((err) => {
                            // TODO: parse yup errors appropriately
                            console.log(err);
                        });
                } else {
                    callback(state);
                }
            }
        };
    }

    const buildHandleChange = (key: keyof TForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setState({ ...state, [key]: value });
    };
    return [state, errors, buildHandleSubmit, buildHandleChange, setState] as const;
}
