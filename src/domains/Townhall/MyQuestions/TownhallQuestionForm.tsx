import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import LoadingButton from 'components/LoadingButton';
import { createQuestion } from '../api';
import { TownhallQuestionForm as FormType } from '../types';

interface Props {
    form?: FormType;
    onSubmit?: () => void;
}

interface DefaultProps {
    form: FormType;
    onSubmit: () => void;
}

export default function TownhallQuestionForm({
    form: formProp,
    onSubmit,
}: Props & DefaultProps) {
    const [form, setForm] = React.useState<FormType>(formProp);
    const [snack] = useSnack();
    const [sendQuestion, isLoading] = useEndpoint(() => createQuestion(form), {
        onSuccess: () => {
            snack('Successfully submitted your question!', 'success');
            onSubmit();
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendQuestion();
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
                        autoFocus
                        value={form.question}
                        onChange={handleChange}
                        label='Your Question Here'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <LoadingButton
                        loading={isLoading}
                        component={
                            <Button fullWidth type='submit' variant='contained'>
                                Submit
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        </form>
    );
}

TownhallQuestionForm.defaultProps = {
    form: {
        question: '',
    },
    onSubmit: () => {},
};
