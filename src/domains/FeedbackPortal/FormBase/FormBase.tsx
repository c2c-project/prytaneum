import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';

import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import ReportEndpointContext from '../Contexts/ReportEndpointContext';
import { FeedbackReport, BugReport } from '../types';

type Report = FeedbackReport | BugReport;

interface Props {
    report: Report;
    callback: () => void;
    onSuccess: (report: Report) => void;
}

export default function FormBase({ report, onSuccess, callback }: Props) {
    const { submitEndpoint } = React.useContext(ReportEndpointContext);
    const [snack] = useSnack();
    const [reportState, setReportState] = React.useState<Report>(report);

    const submitRequest = React.useCallback(() => submitEndpoint(reportState), [
        reportState,
        submitEndpoint,
    ]);

    const [sendRequest, isLoading] = useEndpoint(submitRequest, {
        onSuccess: () => {
            onSuccess(reportState);
            callback();
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
    report: {
        description: '',
    },
};

FormBase.propTypes = {
    report: PropTypes.object,
};
