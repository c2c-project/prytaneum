import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import type {
    Question as QuestionType,
    ReplyForm as FormType,
} from 'prytaneum-typings';

import TextField from 'components/TextField';
import Form from 'components/Form';
import FormTitle from 'components/FormTitle';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import LoadingButton from 'components/LoadingButton';
import useSnack from 'hooks/useSnack';
import useForm from 'hooks/useForm';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import QuestionCard from '../QuestionCard';
import { createReply } from '../api';

interface Props {
    replyTo: QuestionType;
    onSubmit?: () => void;
    onCancel?: () => void;
}

const initialState: FormType = { reply: '' };
export default function ReplyForm({ replyTo, onSubmit, onCancel }: Props) {
    const [townhall] = useTownhall();
    const [snack] = useSnack();

    const [form, errors, handleSubmit, handleChange] = useForm(initialState);

    const endpoint = () => createReply(townhall._id, replyTo._id, form);
    const onSuccess = () => {
        snack('Successfully submitted reply');
        if (onSubmit) onSubmit();
    };
    const [run, isLoading] = useEndpoint(endpoint, { onSuccess });

    return (
        <Form onSubmit={handleSubmit(run)}>
            <FormTitle
                title={`Reply to ${replyTo.meta.createdBy.name.first}`}
                description={
                    replyTo && (
                        <Typography variant='body2'>
                            This will not show up in the normal question feed.
                            If you meant to quote this person while asking your
                            own question, then click on the
                            <QuoteIcon fontSize='small' />
                            instead of the
                            <ReplyIcon fontSize='small' />
                        </Typography>
                    )
                }
            />
            <FormContent>
                <QuestionCard question={replyTo} />
                <TextField
                    error={Boolean(errors.reply)}
                    helperText={errors.reply}
                    id='reply-field'
                    name='reply'
                    label='Your Reply...'
                    autoFocus
                    multiline
                    required
                    value={form.reply}
                    onChange={handleChange('reply')}
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
                <LoadingButton loading={isLoading}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disableElevation
                    >
                        Reply
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

ReplyForm.defaultProps = {
    onSubmit: undefined,
    onCancel: undefined,
};

ReplyForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    replyTo: PropTypes.object.isRequired,
};
