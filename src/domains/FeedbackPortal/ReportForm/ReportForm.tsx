import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FormBase from '../FormBase';
import { FeedbackReport, BugReport } from '../types';

interface FormProps {
    title: string;
    mainDescription: string;
    icon: JSX.Element;
    report: FeedbackReport | BugReport;
}

export default function ReportForm({
    title,
    mainDescription,
    icon,
    report,
}: FormProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                    {title}
                    {React.cloneElement(icon)}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>{mainDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
                {/* TODO: Pass actual onSuccess and callback functions */}
                <FormBase
                    report={report}
                    onSuccess={() => {}}
                    callback={() => {}}
                />
            </Grid>
        </Grid>
    );
}
