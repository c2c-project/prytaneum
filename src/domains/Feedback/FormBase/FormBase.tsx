import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import FormActions from 'components/FormActions';
import FormContent from 'components/FormContent';
import TextField from 'components/TextField';
import LoadingButton from 'components/LoadingButton';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import useForm from 'hooks/useForm';
import { createBugReport, createFeedbackReport, updateBugReport, updateFeedbackReport } from '../api';
import { FeedbackReport, BugReport, FeedbackForm, BugReportForm } from '../types';

type Report = FeedbackReport | BugReport;

interface DefaultProps {
    onSuccess: (report: Report) => void;
    onFailure: () => void;
    townhallId: string;
}

interface Props {
    report: Report;
    reportType: 'Feedback' | 'Bug';
    submitType: 'create' | 'update';
    onSuccess?: (report: Report) => void;
    onFailure?: () => void;
    townhallId?: string;
}

// This dictionary is used to avoid having to create 4 callbacks and 4 submitRequests
const endpoints = (townhallId: string) => ({
    Feedback: {
        create: (form: FeedbackForm) => createFeedbackReport(form, new Date().toISOString()),
        update: (form: FeedbackForm) => updateFeedbackReport(form),
    },
    Bug: {
        create: (form: BugReportForm) => createBugReport(form, new Date().toISOString(), townhallId),
        update: (form: BugReportForm) => updateBugReport(form),
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
    const [reportState, errors, handleSubmit, handleChange] = useForm(report);

    const submitRequest = React.useCallback(() => endpoints(townhallId)[reportType][submitType](reportState), [
        reportState,
        submitType,
        reportType,
        townhallId,
    ]);

    const [sendRequest, isLoading] = useEndpoint(submitRequest, {
        onSuccess: () => {
            onSuccess(reportState);
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
