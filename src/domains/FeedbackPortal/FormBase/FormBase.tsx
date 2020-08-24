import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';
import { AxiosResponse } from 'axios';

import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import { FeedbackForm, BugReportForm } from '../types';

type ReportType = FeedbackForm | BugReportForm;
interface FormProps {
    Report: ReportType;
    SubmitEndpoint: (form: ReportType) => Promise<AxiosResponse<unknown>>;
    onSuccess: () => void;
}

export default function FormBase({
    Report,
    SubmitEndpoint,
    onSuccess,
}: FormProps) {
    const [snack] = useSnack();
    const [reportState, setReportState] = React.useState<ReportType>(Report);
    const apiRequest = React.useCallback(() => SubmitEndpoint(reportState), [
        reportState,
    ]);
    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: () => {
            onSuccess();
            snack('Report successfully submitted', 'success');
        },
        onFailure: () => {
            snack('Something went wrong! Try again', 'error');
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    type MyEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
    const handleChange = (e: MyEvent, key: string) => {
        const { value } = e.target;
        setReportState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id='reportDescription'
                                required
                                multiline
                                label='Report Description'
                                value={reportState.description}
                                onChange={(e) => handleChange(e, 'description')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                loading={isLoading}
                                component={
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        type='submit'
                                        color='primary'
                                    >
                                        Submit
                                    </Button>
                                }
                            />
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

FormBase.defaultProps = {
    SubmitEndpoint: () => {},
    Report: {
        description: '',
    },
};

FormBase.propTypes = {
    SubmitEndpoint: PropTypes.func,
    Report: PropTypes.object,
};
