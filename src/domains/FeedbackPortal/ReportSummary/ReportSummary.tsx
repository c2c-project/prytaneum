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
import { AxiosResponse } from 'axios';

import FormBase from '../FormBase';
import {
    FeedbackForm,
    BugReportForm,
    updateBugReport,
    updateFeedbackReport,
} from '../api';

interface SummaryProps {
    Report: FeedbackForm | BugReportForm;
    UpdateReportEndpoint: (
        form: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<any>>;
}

function ReportSummary({ Report, UpdateReportEndpoint }: SummaryProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    Date Submitted:
                    {Report.date}
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
    UpdateReportEndpoint: () => {},
    Report: {
        description: '',
        date: '',
        _id: '',
    },
};

ReportSummary.propTypes = {
    UpdateReportEndpoint: PropTypes.func,
    Report: PropTypes.object,
};

export default function ReportSummaryFactory({
    Type,
    Report,
}: SummaryProps & { Type: string }) {
    switch (Type) {
        case 'feedback':
            return (
                <ReportSummary
                    Report={Report}
                    UpdateReportEndpoint={(form) => updateFeedbackReport(form)}
                />
            );
        case 'bug':
            return (
                <ReportSummary
                    Report={Report}
                    UpdateReportEndpoint={(form) => updateBugReport(form)}
                />
            );
        default:
            return (
                <ReportSummary
                    Report={Report}
                    UpdateReportEndpoint={(form) => updateFeedbackReport(form)}
                />
            );
    }
}
