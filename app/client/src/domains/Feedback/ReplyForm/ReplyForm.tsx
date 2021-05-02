import * as React from 'react';
import Button from '@material-ui/core/Button';
import useSnack from '@local/hooks/useSnack';
import useEndpoint from '@local/hooks/useEndpoint';
import LoadingButton from '@local/components/LoadingButton';
import type { ReportReplyForm } from 'prytaneum-typings';

import Form from '@local/components/Form';
import FormActions from '@local/components/FormActions';
import FormContent from '@local/components/FormContent';
import useForm from '@local/hooks/useForm';
import TextField from '@local/components/TextField';
import { replyToReport } from '../api';
import { ReportTypes } from '../types';

interface Props {
    reportId: string;
    reportType: ReportTypes;
}

const ReplyFormInitialValues: ReportReplyForm = {
    content: '',
};

export default function ReplyForm({ reportId, reportType }: Props) {
    const [snack] = useSnack();
    const [replyState, errors, handleSubmit, handleChange, setReplyForm] = useForm<ReportReplyForm>(
        ReplyFormInitialValues
    );
    const replyToAPIRequest = React.useCallback(() => replyToReport(reportId, replyState.content, reportType), [
        reportId,
        replyState.content,
        reportType,
    ]);

    const [sendReplyRequest, isReplyLoading] = useEndpoint(replyToAPIRequest, {
        onSuccess: () => {
            snack('Reply successfully submitted');
            setReplyForm(ReplyFormInitialValues);
        },
        onFailure: () => {
            snack('Reply could not be submitted. Please try again later');
        },
    });

    return (
        <Form onSubmit={handleSubmit(sendReplyRequest)}>
            <FormContent>
                <TextField
                    id='reply-content'
                    name='content'
                    label='Reply Content'
                    error={Boolean(errors.content)}
                    helperText={errors.content}
                    required
                    multiline
                    value={replyState.content}
                    onChange={handleChange('content')}
                />
            </FormContent>
            <FormActions>
                <LoadingButton loading={isReplyLoading}>
                    <Button type='submit' id='submit-reply-button' variant='contained' fullWidth color='primary'>
                        Submit Reply
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}
