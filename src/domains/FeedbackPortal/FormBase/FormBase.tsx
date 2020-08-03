import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';
import { ReportForm as ReportFormType } from '../api';
// import { AxiosResponse } from 'axios';

interface FormProps {
    Report: ReportFormType;
    SubmitEndpoint: string;
}

export default function FormBase({ Report, SubmitEndpoint }: FormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [reportState, setReportState] = React.useState<ReportFormType>(
        Report
    );
    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        console.log(SubmitEndpoint);
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
                        <Grid container item xs={12} justify='flex-end'>
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
    SubmitEndpoint: '',
    Report: {
        description: '',
    },
};

FormBase.propTypes = {
    SubmitEndpoint: PropTypes.string,
    Report: PropTypes.object,
};
