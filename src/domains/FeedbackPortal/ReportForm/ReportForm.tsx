import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FormBase from '../FormBase';
// import { AxiosResponse } from 'axios';

interface FormProps {
    Title: string;
    MainDescription: string;
    CreateReportEndpoint: string;
}

export default function ReportForm({
    Title,
    MainDescription,
    CreateReportEndpoint,
}: FormProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                    {Title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>
                    {MainDescription}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormBase SubmitEndpoint={CreateReportEndpoint} />
            </Grid>
        </Grid>
    );
}

ReportForm.defaultProps = {
    Title: '',
    MainDescription: '',
    CreateReportEndpoint: '',
};

ReportForm.propTypes = {
    Title: PropTypes.string,
    MainDescription: PropTypes.string,
    CreateReportEndpoint: PropTypes.string,
};
