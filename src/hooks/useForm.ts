import React from 'react';

type SubmitFunction = (e: React.FormEvent<HTMLFormElement>) => void;
type BuildSubmitFunction = (cb?: () => void) => SubmitFunction;
type ChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;
type BuildChangeFunction<T> = (k: keyof T) => ChangeFunction;

type UseFormTuple<T> = [
    T,
    Partial<T>,
    BuildSubmitFunction,
    BuildChangeFunction<T>,
    React.Dispatch<React.SetStateAction<T>>
];

export default function useForm<T>(initialState: T): UseFormTuple<T> {
    const [state, setState] = React.useState(initialState);
    const [errors, setErrors] = React.useState<Partial<T>>({});
    function buildHandleSubmit(callback?: () => void) {
        return (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const isValid = form.checkValidity();
            if (!isValid) {
                const { elements } = form; // can't destructure this above b/c checkValidity can't so yeah
                const elementArr = Array.from(elements) as HTMLInputElement[]; // I know this because it's a form, and I code them
                const formErrors = elementArr.reduce<Partial<T>>(
                    (accum, element) => {
                        if (element.validationMessage)
                            return {
                                ...accum,
                                [element.name]: element.validationMessage,
                            };
                        return accum;
                    },
                    {}
                );
                setErrors(formErrors);
            } else if (callback) {
                callback();
            }
        };
    }

    const buildHandleChange: BuildChangeFunction<T> = (key: keyof T) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const { value } = e.target;
            setState({ ...state, [key]: value });
        };
    };
    return [state, errors, buildHandleSubmit, buildHandleChange, setState];
}
