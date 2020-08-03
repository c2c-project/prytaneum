// /**
//  * @description Renders Feedback or Bug report summaries, as forms, to a non-privileged user. Uses FormBase as a child component, passing an non-empty report object and a update-report endpoint
//  * @params {Object} props
//  * @params {Object} props.Report - object that stores the report data
//  * @params {Object} props.UpdateReportEndpoint
//  */
// <ReportSummary
//     Report={Object}
// />

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FormBase from '../FormBase';
import { ReportForm as ReportFormType } from '../api';
// import { AxiosResponse } from 'axios';

interface SummaryProps {
    Report: ReportFormType;
    UpdateReportEndpoint: string;
}

export default function ReportSummary({
    Report,
    UpdateReportEndpoint,
}: SummaryProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    Date Submitted: {Report.date}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>
                    You can change the description of your report. Once you are
                    done, just press the “Submit” button.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormBase
                    Report={Report}
                    SubmitEndpoint={UpdateReportEndpoint}
                />
            </Grid>
        </Grid>
    );
}

ReportSummary.defaultProps = {
    UpdateReportEndpoint: '',
    Report: {
        description: '',
        date: '',
    },
};

ReportSummary.propTypes = {
    UpdateReportEndpoint: PropTypes.string,
    Report: PropTypes.object,
};
