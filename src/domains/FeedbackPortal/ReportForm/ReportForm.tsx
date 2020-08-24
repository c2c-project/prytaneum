import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AxiosResponse } from 'axios';

import errors from 'utils/errors';
import FormBase from '../FormBase';
import { createFeedbackReport, createBugReport } from '../api';
import { FeedbackForm, BugReportForm } from '../types';

interface FormProps {
    Title: string;
    MainDescription: string;
    Icon: JSX.Element;
    CreateReportEndpoint: (
        form: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<any>>;
}

function ReportForm({
    Title,
    MainDescription,
    Icon,
    CreateReportEndpoint,
}: FormProps) {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                    {Title}
                    {React.cloneElement(Icon)}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>{MainDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
                {/* TODO: Pass an actual onSucces callback function */}
                <FormBase
                    SubmitEndpoint={CreateReportEndpoint}
                    onSuccess={() => {}}
                />
            </Grid>
        </Grid>
    );
}

interface FactoryProps {
    Title: string;
    MainDescription: string;
    Icon: JSX.Element;
    townhallId?: string;
    Type: 'feedback' | 'bug';
}

export default function ReportFormFactory({
    Type,
    Title,
    MainDescription,
    Icon,
    townhallId,
}: FactoryProps) {
    switch (Type) {
        case 'feedback':
            return (
                <ReportForm
                    Title={Title}
                    Icon={Icon}
                    MainDescription={MainDescription}
                    CreateReportEndpoint={(form) =>
                        createFeedbackReport(form, new Date().toISOString())
                    }
                />
            );
        case 'bug':
            if (!townhallId) {
                throw errors.internalError();
            }
            return (
                <ReportForm
                    Title={Title}
                    MainDescription={MainDescription}
                    Icon={Icon}
                    CreateReportEndpoint={(form) =>
                        createBugReport(
                            form,
                            new Date().toISOString(),
                            townhallId
                        )
                    }
                />
            );
        default:
            return (
                <ReportForm
                    Title={Title}
                    MainDescription={MainDescription}
                    Icon={Icon}
                    CreateReportEndpoint={(form) =>
                        createFeedbackReport(form, new Date().toISOString())
                    }
                />
            );
    }
}

ReportFormFactory.defaultProps = {
    townhallId: '',
};
