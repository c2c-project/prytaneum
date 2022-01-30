import * as React from 'react';
import { Button, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useResponsiveDialog } from '@local/components/ResponsiveDialog';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/features/core';
import { LiveFeedbackDialog } from '../../LiveFeedback/LiveFeedbackDialog';

export type TQuestionFormState = { question: string };

export interface QuestionFormProps {
    quote?: React.ReactNode;
    onSubmit?: (state: TQuestionFormState) => void;
    onCancel?: () => void;
    eventId: string;
}

const useStyles = makeStyles((theme) => ({
    form: {
        paddingTop: theme.spacing(2)
    },
    input: {
        ['& fieldset']: {
            borderRadius: 9999,
        },
    },
    button: {
        borderRadius: '10px'
    },
    link: {
        cursor: 'pointer'
    }
}));

// TODO: eliminate inline styles
export function QuestionForm({ quote, onSubmit, onCancel, eventId }: QuestionFormProps) {
    const classes = useStyles();
    const [isOpen, open, close] = useResponsiveDialog();
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        question: '',
    });

    const handleOpenFeedback = () => { open(); if (onCancel) onCancel(); };

    const isQuestionValid = React.useMemo(() => form.question.trim().length !== 0, [form]);

    return (
        <>
            <LiveFeedbackDialog
                isOpen={isOpen}
                close={close}
                eventId={eventId}
            />
            
            <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <FormTitle title='Question Form' />
                {quote}
                <FormContent>
                    <TextField
                        id='question-field'
                        name='question'
                        label='Your Question'
                        autoFocus
                        error={Boolean(errors.question)}
                        helperText={errors.question}
                        required
                        multiline
                        value={form.question}
                        onChange={handleChange('question')}
                        className={classes.input}
                    />
                </FormContent>
                <FormActions disableGrow gridProps={{ justify: 'space-between' }}>
                    <Link
                        variant='body1'
                        underline='always'
                        onClick={handleOpenFeedback}
                        className={classes.link}
                    >
                        Have feedback instead?
                    </Link>
                    <Grid container spacing={1}>
                        {onCancel && (
                            <Grid item>
                                <Button onClick={onCancel} className={classes.button}>
                                    Cancel
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <Button
                                disabled={!isQuestionValid}
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                Ask
                            </Button>
                        </Grid>
                    </Grid>
                </FormActions>
            </Form>
        </>
    );
}
