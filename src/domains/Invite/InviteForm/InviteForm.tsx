/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ParseResult } from 'papaparse';

import EmailPreview from 'components/EmailPreview';
import SelectFile from '../../../components/SelectFile';
import VerifyPreview from '../../../components/SelectFile/VerifyPreview';
import Parse from '../../../components/SelectFile/utils';
import CreateInvite from './CreateInvite';
import { InviteForm } from '../api';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        step: {
            minHeight: '300px',
        },
    })
);

function getSteps() {
    return [
        'Select File',
        'Verify Preview',
        'Fill out webinar info',
        'Upload to Server',
    ];
}

interface Result extends ParseResult<object> {
    data: Array<object>;
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [file, setFile]: [File | undefined, Function] = React.useState();
    const [activeStep, setActiveStep] = React.useState(0);
    const [preview, setPreview]: [
        object[] | undefined,
        Function
    ] = React.useState();
    const [inviteForm, setInviteForm]: [InviteForm, Function] = React.useState({
        MoC: '',
        topic: '',
        eventDateTime: '',
        constituentScope: 'district',
        region: '',
        deliveryTime: new Date(),
    });
    const steps = getSteps();
    const expectedKeys = ['email', 'fName', 'lName'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleDateChange = (date: Date | null) => {
        setInviteForm((val: InviteForm) => ({
            ...val,
            deliveryTime: date,
        }));
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                Expected Headers:{' '}
                                {expectedKeys.map((header) => ` "${header}" `)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Case matters, order does not
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectFile
                                onComplete={setFile}
                                initialState={file}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                if (!file || !(file instanceof File)) {
                    return (
                        <Typography variant='h4'>
                            Please go back and select a valid file
                        </Typography>
                    );
                }

                Parse.csv(file, {
                    preview: 5,
                    complete: (results: Result) => {
                        const { data } = results;
                        setPreview(data);
                    },
                });
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <VerifyPreview
                                data={preview}
                                expectedKeys={expectedKeys}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            If everything looks correct, click next.
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Member of Congress'
                                    variant='outlined'
                                    value={inviteForm.MoC}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        setInviteForm((val: InviteForm) => ({
                                            ...val,
                                            MoC: value,
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Webinar Topic'
                                    variant='outlined'
                                    value={inviteForm.topic}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        setInviteForm((val: InviteForm) => ({
                                            ...val,
                                            topic: value,
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Event Date & Time'
                                    variant='outlined'
                                    value={inviteForm.eventDateTime}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        setInviteForm((val: InviteForm) => ({
                                            ...val,
                                            eventDateTime: value,
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Constituent Scope (state or district)'
                                    variant='outlined'
                                    value={inviteForm.constituentScope}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        setInviteForm((val: InviteForm) => ({
                                            ...val,
                                            constituentScope: value,
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id='Region'>Region</InputLabel>
                                <Select
                                    labelId='Region'
                                    label='Region'
                                    variant='outlined'
                                    value={inviteForm.region}
                                    inputProps={{
                                        name: 'Region',
                                    }}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        setInviteForm((val: InviteForm) => ({
                                            ...val,
                                            region: value,
                                        }));
                                    }}
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='west_coast'>
                                        West Coast
                                    </MenuItem>
                                    <MenuItem value='east_coast'>
                                        East Coast
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {/* TODO Only allow up to 3 days in advance from now */}
                                    <KeyboardDatePicker
                                        format='MM/dd/yyyy'
                                        margin='normal'
                                        id='date-picker-inline'
                                        label='Delivery Date'
                                        value={inviteForm.deliveryTime}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin='normal'
                                        id='time-picker'
                                        label='Delivery Time'
                                        value={inviteForm.deliveryTime}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <EmailPreview
                                MoC={inviteForm.MoC || 'PLACEHOLDER'}
                                fName='PLACEHOLDER'
                                topic={inviteForm.topic || 'PLACEHOLDER'}
                                eventDateTime={
                                    inviteForm.eventDateTime || 'PLACEHOLDER'
                                }
                                constituentScope={
                                    inviteForm.constituentScope || 'PLACEHOLDER'
                                }
                                registrationLink={`http${
                                    process.env.NODE_ENV === 'production'
                                        ? 's'
                                        : ''
                                }://${
                                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                    process.env.REACT_APP_ORIGIN
                                }.com/register/custom_link`}
                            />
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <CreateInvite
                        onSuccess={handleNext}
                        onFailure={handleBack}
                        inviteForm={inviteForm}
                        file={file}
                    />
                );
            case 4:
                return (
                    <Grid container spacing={2}>
                        <Typography>Finished</Typography>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div className={classes.step}>
                                {getStepContent(index)}
                            </div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}
