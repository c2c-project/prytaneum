import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AxiosResponse } from 'axios';

import errors from 'utils/errors';
import FormBase from '../FormBase';
import {
    createFeedbackReport,
    createBugReport,
    FeedbackForm,
    BugReportForm,
} from '../api';

interface FormProps {
    Title: string;
    MainDescription: string;
    Report: FeedbackForm | BugReportForm;
    Icon: JSX.Element;
    CreateReportEndpoint: (
        form: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<any>>;
}

function ReportForm({
    Title,
    MainDescription,
    Icon,
    Report,
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
                <FormBase
                    SubmitEndpoint={CreateReportEndpoint}
                    Report={Report}
                />
            </Grid>
        </Grid>
    );
}

ReportForm.defaultProps = {
    Title: '',
    MainDescription: '',
    CreateReportEndpoint: () => {},
};

ReportForm.propTypes = {
    Title: PropTypes.string,
    MainDescription: PropTypes.string,
    Icon: PropTypes.node.isRequired,
    CreateReportEndpoint: PropTypes.func,
};

export default function ReportFormFactory({
    Type,
    Title,
    MainDescription,
    Icon,
    Report,
    townhallId,
}: FormProps & { Type: string; townhallId?: string }) {
    switch (Type) {
        case 'feedback':
            return (
                <ReportForm
                    Title={Title}
                    Icon={Icon}
                    MainDescription={MainDescription}
                    CreateReportEndpoint={(form) => createFeedbackReport(form)}
                    Report={Report}
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
                    Report={Report}
                    CreateReportEndpoint={(form) =>
                        createBugReport(form, townhallId)
                    }
                />
            );
        default:
            return (
                <ReportForm
                    Title={Title}
                    MainDescription={MainDescription}
                    Icon={Icon}
                    CreateReportEndpoint={(form) => createFeedbackReport(form)}
                    Report={Report}
                />
            );
    }
}
