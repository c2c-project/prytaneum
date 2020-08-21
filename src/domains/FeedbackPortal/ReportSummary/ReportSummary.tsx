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
import FormBase from '../FormBase';
import { ReportObject as ReportObjectType } from '../api';

interface SummaryProps {
    ReportObject: ReportObjectType;
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

export default function ReportSummary({
    ReportObject,
    callBack,
}: SummaryProps) {
    // TODO: Check if empty array as second parameter is okay
    const deleteApiRequest = React.useCallback(
        () => ReportObject.delete(ReportObject.Report),
        []
    );

    const [snack] = useSnack();

    // TODO: call callback function from parent component
    const [sendDeleteRequest, isLoading] = useEndpoint(deleteApiRequest, {
        onSuccess: () => {
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
                    {formatDate(new Date(ReportObject.Report.date))}
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
                    Report={{
                        description: ReportObject.Report.description,
                        _id: ReportObject.Report._id,
                    }}
                    SubmitEndpoint={ReportObject.update}
                    onSuccess={() => callBack()}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    loading={isLoading}
                    component={
                        <Button
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
