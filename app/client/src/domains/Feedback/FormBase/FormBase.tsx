import * as React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import type { FeedbackReportForm, BugReportForm } from 'prytaneum-typings';

import Form from '@local/components/Form';
import FormActions from '@local/components/FormActions';
import FormContent from '@local/components/FormContent';
import TextField from '@local/components/TextField';
import LoadingButton from '@local/components/LoadingButton';
import useSnack from '@local/hooks/useSnack';
import useEndpoint from '@local/hooks/useEndpoint';
import useForm from '@local/hooks/useForm';
import { createBugReport, createFeedbackReport, updateBugReport, updateFeedbackReport } from '../api';
import { Report, ReportTypes } from '../types';

interface DefaultProps {
    onSuccess: (report: Report) => void;
    onFailure: () => void;
    townhallId: string;
}

interface Props {
    report: Report;
    reportType: ReportTypes;
    submitType: 'create' | 'update';
    onSuccess?: (report: Report) => void;
    onFailure?: () => void;
    townhallId?: string;
}

// This dictionary is used to avoid having to create 4 callbacks and 4 submitRequests
const endpoints = (townhallId: string, reportId: string) => ({
    Feedback: {
        create: (form: FeedbackReportForm) => createFeedbackReport(form),
        update: (form: FeedbackReportForm) => updateFeedbackReport(form, reportId),
    },
    Bug: {
        create: (form: BugReportForm) => createBugReport(form, townhallId),
        update: (form: BugReportForm) => updateBugReport(form, reportId),
    },
});

export default function FormBase({
    report,
    reportType,
    submitType,
    onSuccess,
    onFailure,
    townhallId,
}: Props & DefaultProps) {
    const [snack] = useSnack();
    const [reportState, errors, handleSubmit, handleChange] = useForm<FeedbackReportForm | BugReportForm>({
        description: report.description,
    });
    const submitRequest = React.useCallback(
        () => endpoints(townhallId, report._id)[reportType][submitType](reportState),
        [reportState, submitType, reportType, townhallId, report._id]
    );
    const [sendRequest, isLoading] = useEndpoint(submitRequest, {
        onSuccess: () => {
            onSuccess({ ...report, description: reportState.description });
            snack('Report successfully submitted');
        },
        onFailure: () => {
            onFailure();
            snack('Something went wrong! Try again');
        },
    });

    return (
        <Form onSubmit={handleSubmit(sendRequest)}>
            <FormContent>
                <TextField
                    id='report-description'
                    name='description'
                    label='Report Description'
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    required
                    multiline
                    value={reportState.description}
                    onChange={handleChange('description')}
                />
            </FormContent>
            <FormActions>
                <LoadingButton loading={isLoading}>
                    <Button variant='contained' fullWidth type='submit' color='primary'>
                        Submit
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

FormBase.defaultProps = {
    report: {
        description: '',
    },
    townhallId: '',
    onSuccess: () => {},
    onFailure: () => {},
};

FormBase.propTypes = {
    report: PropTypes.object,
    townhallId: PropTypes.string,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
};
