import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import { QUESTIONS_MAX_LENGTH } from '@local/utils/rules';

export type TQuestionFormState = { question: string };

export interface QuestionFormProps {
    quote?: React.ReactNode;
    onSubmit?: (state: TQuestionFormState) => void;
    onCancel?: () => void;
}

export function QuestionForm({ quote, onSubmit, onCancel }: QuestionFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        question: '',
    });

    const isQuestionValid = React.useMemo(() => form.question.trim().length !== 0, [form]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Question Form' />
            {quote}
            <FormContent>
                <TextField
                    id='question-field'
                    name='question'
                    label='Add your question for everyone to see'
                    autoFocus
                    error={Boolean(errors.question)}
                    helperText={errors.question}
                    required
                    multiline
                    value={form.question}
                    onChange={handleChange('question')}
                />
                <Typography
                    variant='caption'
                    color={form.question.length > QUESTIONS_MAX_LENGTH ? 'red' : 'black'}
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {form.question.length}/500
                </Typography>
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isQuestionValid} type='submit' variant='contained' color='primary'>
                    Ask
                </Button>
            </FormActions>
        </Form>
    );
}
