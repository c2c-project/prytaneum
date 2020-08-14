import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AxiosResponse } from 'axios';

import { formatDate } from 'utils/format';
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
        report: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<any>>;
}

function ReportSummary({ Report, UpdateReportEndpoint }: SummaryProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    Date Submitted:
                    {formatDate(new Date(Report.date))}
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

interface FactoryProps {
    Type: string;
    Report: FeedbackForm | BugReportForm;
}
export default function ReportSummaryFactory({ Type, Report }: FactoryProps) {
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
