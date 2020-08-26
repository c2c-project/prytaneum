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
import ReportContext from '../Contexts/ReportContext';
import FormBase from '../FormBase';
import { ReportObject } from '../types';

interface SummaryProps {
    reportObject: ReportObject;
    callBack: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    DangerButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}));

// TODO: Pass onUpdate to FormBase
export default function ReportSummary({
    reportObject,
    callBack,
}: SummaryProps) {
    const { updateReport, deleteReport } = React.useContext(ReportContext);

    const deleteApiRequest = React.useCallback(
        () => reportObject.deleteEndpoint(reportObject.Report._id),
        [reportObject]
    );

    const [snack] = useSnack();

    const [sendDeleteRequest, isLoading] = useEndpoint(deleteApiRequest, {
        onSuccess: () => {
            // Removes report from list of reports in the grandparent component (ReportHistory)
            deleteReport(reportObject.Report._id);
            callBack();
            snack('Report successfully deleted', 'success');
        },
        onFailure: () => {
            snack('Something went wrong! Try again', 'error');
        },
    });

    const classes = useStyles();
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    Date Submitted:
                    {formatDate(new Date(reportObject.Report.date))}
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
                    reportObject={reportObject}
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
