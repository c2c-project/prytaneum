import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { AxiosResponse } from 'axios';
import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import { formatDate } from 'utils/format';
import ReportStateContext from '../Contexts/ReportStateContext';
import FormBase from '../FormBase';
import { FeedbackReport, BugReport } from '../types';

import { deleteBugReport, deleteFeedbackReport } from '../api';

type Report = FeedbackReport | BugReport;
interface SummaryProps {
    report: Report;
    callBack: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    DangerButton: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[900],
        },
    },
}));

type DeleteFunction = (_id: string) => Promise<AxiosResponse<unknown>>;
const endpoints: {
    Feedback: DeleteFunction;
    Bug: DeleteFunction;
} = {
    Feedback: (_id: string) => deleteFeedbackReport(_id),
    Bug: (_id: string) => deleteBugReport(_id),
};

export default function ReportSummary({ report, callBack }: SummaryProps) {
    const { updateReport, refetchReports } = React.useContext(
        ReportStateContext
    );
    const [snack] = useSnack();

    const deleteApiRequest = React.useCallback(
        () => endpoints[report.type](report._id),
        [report]
    );

    const [sendDeleteRequest, isLoading] = useEndpoint(deleteApiRequest, {
        onSuccess: () => {
            callBack();
            refetchReports();
            snack('Report successfully deleted');
        },
        onFailure: () => {
            snack('Something went wrong! Try again');
        },
    });

    const classes = useStyles();

    const onSuccess = (reportState: Report) => {
        updateReport(reportState);
        callBack();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    Date Submitted:
                    {formatDate(new Date(report.date))}
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
                    report={report}
                    reportType={report.type}
                    onSuccess={onSuccess}
                    submitType='update'
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton loading={isLoading}>
                    <Button
                        id='deleteButton'
                        variant='contained'
                        fullWidth
                        className={classes.DangerButton}
                        startIcon={<DeleteIcon />}
                        onClick={() => sendDeleteRequest()}
                    >
                        Delete
                    </Button>
                </LoadingButton>
            </Grid>
        </Grid>
    );
}
