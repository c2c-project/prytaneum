import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import { createQuestion, TownhallQuestionForm as FormType } from '../api';

interface Props {
    form?: FormType;
}

interface DefaultProps {
    form: FormType;
}

export default function TownhallQuestionForm({
    form: formProp,
}: Props & DefaultProps) {
    const [form, setForm] = React.useState<FormType>(formProp);
    const [snack] = useSnack();
    const [post] = useEndpoint(() => createQuestion(form), {
        onSuccess: () => {
            snack('Successfully submitted your question!', 'success');
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setForm({ question: value });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={form}
                        onChange={handleChange}
                        label='Your Question Here'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

TownhallQuestionForm.defaultProps = {
    form: {
        question: '',
    },
};
