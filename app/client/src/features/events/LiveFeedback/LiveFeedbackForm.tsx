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
import { QuestionDialog } from '../Questions/AskQuestion/QuestionDialog';

export type TLiveFeedbackFormState = { message: string };

export interface LiveFeedbackFormProps {
    reply?: React.ReactNode;
    onSubmit?: (state: TLiveFeedbackFormState) => void;
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
export function LiveFeedbackForm({ reply, onSubmit, onCancel, eventId }: LiveFeedbackFormProps) {
    const classes = useStyles();
    const [isOpen, open, close] = useResponsiveDialog();
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
    });

    const handleOpenQuestion = () => { open(); if (onCancel) onCancel(); };

    const isFeedbackValid = React.useMemo(() => form.message.trim().length !== 0, [form]);

    return (
        <>
            <QuestionDialog
                isOpen={isOpen}
                close={close}
                eventId={eventId}
            />

            <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <FormTitle title={reply ? 'Live Feedback Reply Form' : 'Live Feedback Form'} />
                {reply}
                <FormContent>
                    <TextField
                        id='feedback-field'
                        name={reply ? 'feedback-reply' : 'feedback'}
                        label={reply ? 'Feedback Reply' : 'Your Feedback'}
                        autoFocus
                        error={Boolean(errors.message)}
                        helperText={errors.message}
                        required
                        multiline
                        value={form.message}
                        onChange={handleChange('message')}
                        className={classes.input}
                    />
                </FormContent>
                <FormActions disableGrow gridProps={{ justify: 'space-between' }}>
                    <Link
                        variant='body1'
                        underline='always'
                        onClick={handleOpenQuestion}
                        className={classes.link}
                    >
                        Have a question instead?
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
                                disabled={!isFeedbackValid}
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                {reply ? 'Reply' : 'Ask'}
                            </Button>
                        </Grid>
                    </Grid>
                </FormActions>
            </Form>
        </>
    );
}
