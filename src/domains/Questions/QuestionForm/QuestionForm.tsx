import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import type {
    Question as QuestionType,
    QuestionForm as QuestionFormType,
} from 'prytaneum-typings';

import Form from 'components/Form';
import FormTitle from 'components/FormTitle';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import TextField from 'components/TextField';
import useForm from 'hooks/useForm';

interface Props {
    quote?: QuestionType;
    onSubmit?: (form: QuestionFormType) => void;
    onCancel?: () => void;
}

interface FormType {
    question: string;
}

const initialState: FormType = { question: '' };
export default function QuestionForm({ quote, onSubmit, onCancel }: Props) {
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const callback = React.useCallback(() => {
        if (onSubmit) onSubmit(form);
    }, [onSubmit, form]);
    return (
        <Form onSubmit={handleSubmit(callback)}>
            <FormTitle title='Question Form' />
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
                {quote && <div>TODO: quote here</div>}
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
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disableElevation
                >
                    Ask
                </Button>
            </FormActions>
        </Form>
    );
}

QuestionForm.defaultProps = {
    quote: '',
    onSubmit: undefined,
    onCancel: undefined,
};

QuestionForm.propTypes = {
    quote: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};

// {quote && (
//     <Grid container item xs={12}>
//         <Grid
//             item
//             xs={12}
//             style={{
//                 border: `1px solid ${theme.palette.divider}`,
//                 borderRadius: '25px',
//             }}
//         >
//             <Question
//                 user={quote.meta.user.name}
//                 timestamp={quote.meta.timestamp}
//                 actionBar={<div />}
//             >
//                 {quote.question}
//             </Question>
//         </Grid>
//     </Grid>
// )}
