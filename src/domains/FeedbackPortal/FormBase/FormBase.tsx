import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';
import { AxiosResponse } from 'axios';

import useEndpoint from 'hooks/useEndpoint';
import { FeedbackForm, BugReportForm } from '../api';

type ReportType = FeedbackForm | BugReportForm;
interface FormProps {
    Report: ReportType;
    SubmitEndpoint: (form: ReportType) => Promise<AxiosResponse<any>>;
}

//  TODO: CHECK WHY apiRequest is not working
export default function FormBase({ Report, SubmitEndpoint }: FormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [reportState, setReportState] = React.useState<ReportType>(Report);
    const apiRequest = React.useCallback(() => SubmitEndpoint(reportState), [
        reportState,
    ]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: () => console.log('Success'),
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //  TODO: Add date to form here?
        e.preventDefault();
        setIsLoading(true);
        sendRequest();
        setIsLoading(false);
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
                                required
                                multiline
                                label='Report Description'
                                value={reportState.description}
                                onChange={(e) => handleChange(e, 'description')}
                            />
                        </Grid>
                        <Grid item xs={12} justify='flex-end'>
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
