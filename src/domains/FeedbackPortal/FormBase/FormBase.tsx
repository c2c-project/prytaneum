import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';
import { AxiosResponse } from 'axios';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import {
    createBugReport,
    createFeedbackReport,
    updateBugReport,
    updateFeedbackReport,
} from '../api';
import {
    FeedbackReport,
    BugReport,
    FeedbackForm,
    BugReportForm,
} from '../types';

type Report = FeedbackReport | BugReport;

interface Props {
    report: Report;
    submitType: 'create' | 'update';
    onSuccess?: (report: Report) => void;
    onFailure?: () => void;
}

// TODO: Pass reportType as a prop too?
export default function FormBase({
    report,
    submitType,
    onSuccess,
    onFailure,
}: Props) {
    const [snack] = useSnack();
    const [reportState, setReportState] = React.useState<Report>(report);

    // This dictionary is used to avoid having to create 4 callbacks and 4 submitRequests
    const endpoints: {
        Feedback: {
            create: (form: FeedbackForm) => Promise<AxiosResponse<unknown>>;
            update: (form: FeedbackForm) => Promise<AxiosResponse<unknown>>;
        };
        Bug: {
            create: (form: BugReportForm) => Promise<AxiosResponse<unknown>>;
            update: (form: BugReportForm) => Promise<AxiosResponse<unknown>>;
        };
    } = {
        Feedback: {
            create: (form: FeedbackForm) =>
                createFeedbackReport(form, new Date().toISOString()),
            update: (form: FeedbackForm) => updateFeedbackReport(form),
        },
        Bug: {
            create: (form: BugReportForm) =>
                createBugReport(form, new Date().toISOString(), '123456'),
            update: (form: BugReportForm) => updateBugReport(form),
        },
    };

    const submitRequest = React.useCallback(
        () => endpoints[report.type][submitType](reportState),
        [reportState]
    );

    const [sendRequest, isLoading] = useEndpoint(submitRequest, {
        onSuccess: () => {
            if (onSuccess) onSuccess(reportState);
            snack('Report successfully submitted', 'success');
        },
        onFailure: () => {
            if (onFailure) onFailure();
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
    report: {
        description: '',
    },
    onSuccess: () => {},
    onFailure: () => {},
};

FormBase.propTypes = {
    report: PropTypes.object,
};
