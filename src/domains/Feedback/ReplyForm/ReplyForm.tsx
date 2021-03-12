import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import ReplyIcon from '@material-ui/icons/Comment';

import Form from 'components/Form';
import FormActions from 'components/FormActions';
import FormContent from 'components/FormContent';
import useForm from 'hooks/useForm';
import Dialog from 'components/ResponsiveDialog';
import TextField from 'components/TextField';
import { replyToReport } from '../api';
import { ReportTypes } from '../types';

interface Props {
    reportId: string;
    reportType: ReportTypes;
}

export default function ReplyForm({ reportId, reportType }: Props) {
    const [showDialog, setShowDialog] = React.useState(false);
    const [snack] = useSnack();
    const [replyState, errors, handleSubmit, handleChange] = useForm({ content: '' });
    const replyToAPIRequest = React.useCallback(() => replyToReport(reportId, replyState.content, reportType), [
        reportId,
        replyState.content,
        reportType,
    ]);

    const [sendReplyRequest, isReplyLoading] = useEndpoint(replyToAPIRequest, {
        onSuccess: () => {
            setShowDialog(false);
            snack('Reply successfully submitted');
        },
        onFailure: () => {
            snack('Reply could not be submitted. Please try again later');
        },
    });

    return (
        <Grid item container>
            <Grid item xs={12}>
                <Button
                    id='reply-button'
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<ReplyIcon />}
                    onClick={() => setShowDialog(true)}
                >
                    Reply
                </Button>
            </Grid>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth='md'>
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
                            <Button
                                type='submit'
                                id='submit-reply-button'
                                variant='contained'
                                fullWidth
                                color='primary'
                            >
                                Submit
                            </Button>
                        </LoadingButton>
                    </FormActions>
                </Form>
            </Dialog>
        </Grid>
    );
}
