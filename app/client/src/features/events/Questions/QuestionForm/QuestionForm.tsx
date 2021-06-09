import * as React from 'react';
import { Button } from '@material-ui/core';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks';

export type TQuestionFormState = { question: string };

export interface QuestionFormProps {
    quote?: React.ReactNode;
    onSubmit?: (state: TQuestionFormState) => void;
    onCancel?: () => void;
}

// TODO: eliminate inline styles
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
                <Button disabled={!isQuestionValid} type='submit' variant='contained' color='primary'>
                    Ask
                </Button>
            </FormActions>
        </Form>
    );
}
