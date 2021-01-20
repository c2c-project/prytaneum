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

interface DefaultProps {
    onSuccess: (report: Report) => void;
    onFailure: () => void;
    townhallId: string;
}

interface Props {
    report: Report;
    reportType: 'Feedback' | 'Bug';
    submitType: 'create' | 'update';
    onSuccess?: (report: Report) => void;
    onFailure?: () => void;
    townhallId?: string;
}
interface EndpointFunctions<T> {
    create: (form: T) => Promise<AxiosResponse<unknown>>;
    update: (form: T) => Promise<AxiosResponse<unknown>>;
}

// This dictionary is used to avoid having to create 4 callbacks and 4 submitRequests
const endpoints = (townhallId: string) => ({
    Feedback: {
        create: (form: FeedbackForm) =>
            createFeedbackReport(form, new Date().toISOString()),
        update: (form: FeedbackForm) => updateFeedbackReport(form),
    },
    Bug: {
        create: (form: BugReportForm) =>
            createBugReport(form, new Date().toISOString(), townhallId),
        update: (form: BugReportForm) => updateBugReport(form),
    },
});

export default function FormBase({
    report,
    reportType,
    submitType,
    onSuccess,
    onFailure,
    townhallId,
}: Props & DefaultProps) {
    const [snack] = useSnack();
    const [reportState, setReportState] = React.useState<Report>(report);

    const submitRequest = React.useCallback(
        () => endpoints(townhallId)[reportType][submitType](reportState),
        [reportState, submitType, reportType, townhallId]
    );

    const [sendRequest, isLoading] = useEndpoint(submitRequest, {
        onSuccess: () => {
            onSuccess(reportState);
            snack('Report successfully submitted');
        },
        onFailure: () => {
            onFailure();
            snack('Something went wrong! Try again');
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
                                id='report-description'
                                required
                                multiline
                                label='Report Description'
                                value={reportState.description}
                                onChange={(e) => handleChange(e, 'description')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={isLoading}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    type='submit'
                                    color='primary'
                                >
                                    Submit
                                </Button>
                            </LoadingButton>
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
    townhallId: '',
    onSuccess: () => {},
    onFailure: () => {},
};

FormBase.propTypes = {
    report: PropTypes.object,
    townhallId: PropTypes.string,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
};
