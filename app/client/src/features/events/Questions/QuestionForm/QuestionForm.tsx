import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

import { EventQuestion as QuestionType, useCreateQuestionMutation } from '@local/graphql-types';
import { LoadingButton } from '@local/components/LoadingButton';
import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm, useSnack, useEvent } from '@local/hooks';
import QuestionCard from '../QuestionCard';

interface Props {
    quote?: QuestionType;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export function QuestionForm({ quote, onSubmit, onCancel }: Props) {
    // context & snack
    const [snack] = useSnack();
    const [{ eventId }] = useEvent();

    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        question: '',
    });

    const [runMutation, { loading: isLoading }] = useCreateQuestionMutation({
        variables: {
            input: {
                ...form,
                refQuestion: quote?.questionId,
                eventId,
            },
        },
        onCompleted() {
            snack('Successfully submitted Question');
            if (onSubmit) onSubmit();
        },
    });

    const isQuestionValid = React.useMemo(() => form.question.trim().length !== 0, [form]);

    return (
        <Form onSubmit={handleSubmit(runMutation)}>
            <FormTitle title='Question Form' />
            {quote && (
                <Grid item xs={12}>
                    <QuestionCard CardProps={{ elevation: 3 }} style={{ marginBottom: '8px' }} question={quote} />
                </Grid>
            )}
            <FormContent>
                <TextField
                    id='question-field'
                    name='question'
                    label='Your Question...'
                    autoFocus
                    error={Boolean(errors.question)}
                    helperText={errors.question}
                    required
                    multiline
                    value={form.question}
                    onChange={handleChange('question')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <LoadingButton loading={isLoading}>
                    <Button disabled={!isQuestionValid} type='submit' variant='contained' color='primary'>
                        Ask
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

QuestionForm.defaultProps = {
    quote: undefined,
    onSubmit: undefined,
    onCancel: undefined,
};

QuestionForm.propTypes = {
    quote: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};
