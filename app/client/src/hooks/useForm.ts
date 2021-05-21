import * as React from 'react';

export function useForm<TForm>(initialState: TForm) {
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
                callback(state);
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
