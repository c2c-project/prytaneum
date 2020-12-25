import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import type {
    Question as QuestionType,
    QuestionForm as QuestionFormType,
} from 'prytaneum-typings';

import LoadingButton from 'components/LoadingButton';
import Form from 'components/Form';
import FormTitle from 'components/FormTitle';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import TextField from 'components/TextField';
import useForm from 'hooks/useForm';
import QuestionCard from '../QuestionCard';

interface Props {
    quote?: QuestionType;
    onSubmit?: (form: QuestionFormType) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

interface FormType {
    question: string;
}

const initialState: FormType = { question: '' };
export default function QuestionForm({
    isLoading,
    quote,
    onSubmit,
    onCancel,
}: Props) {
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const submitCb = React.useCallback(() => {
        if (onSubmit) onSubmit(form);
    }, [onSubmit, form]);
    return (
        <Form onSubmit={handleSubmit(submitCb)}>
            <FormTitle title='Question Form' />
            {quote && (
                <QuestionCard
                    style={{ marginBottom: '8px' }}
                    question={quote}
                />
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
                <Button
                    type='submit'
                    color='primary'
                    disableElevation
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <LoadingButton loading={isLoading as boolean}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disableElevation
                    >
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
    isLoading: false,
};

QuestionForm.propTypes = {
    quote: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
};
