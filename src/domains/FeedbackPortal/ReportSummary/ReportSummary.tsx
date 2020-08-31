import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import { formatDate } from 'utils/format';
import ReportStateContext from '../Contexts/ReportStateContext';
import ReportEndpointContext from '../Contexts/ReportEndpointContext';
import FormBase from '../FormBase';
import { FeedbackReport, BugReport } from '../types';

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

export default function ReportSummary({ report, callBack }: SummaryProps) {
    const { updateReport, deleteReport } = React.useContext(ReportStateContext);
    const { deleteEndpoint } = React.useContext(ReportEndpointContext);

    const deleteApiRequest = React.useCallback(
        () => deleteEndpoint(report._id),
        [report]
    );

    const [snack] = useSnack();

    const [sendDeleteRequest, isLoading] = useEndpoint(deleteApiRequest, {
        onSuccess: () => {
            deleteReport(report._id);
            callBack();
            snack('Report successfully deleted', 'success');
        },
        onFailure: () => {
            snack('Something went wrong! Try again', 'error');
        },
    });

    const classes = useStyles();
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
                    onSuccess={updateReport}
                    callback={callBack}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    loading={isLoading}
                    component={
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
                    }
                />
            </Grid>
        </Grid>
    );
}
