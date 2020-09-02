/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Collapse from '@material-ui/core/Collapse';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ParseResult } from 'papaparse';

import useEndpoint from 'hooks/useEndpoint';

import EmailPreview from 'components/EmailPreview';
import SelectFile from 'components/SelectFile';
import VerifyPreview from 'components/SelectFile/VerifyPreview';
import Parse from 'components/SelectFile/utils';
import CreateInvite from './CreateInvite';
import API from '../api';
import { InviteForm, InvitePreview } from '../types';

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

interface Result extends ParseResult<object> {
    data: Array<object>;
}

/* STEPS */
function PickFileStep({
    expectedKeys,
    file,
    setFile,
}: {
    expectedKeys: string[];
    file: File | undefined;
    setFile: Function;
}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Expected Headers:{' '}
                    {expectedKeys.map((header) => ` "${header}" `)}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Case matters, order does not</Typography>
            </Grid>
            <Grid item xs={12}>
                <SelectFile onComplete={setFile} initialState={file} />
            </Grid>
        </Grid>
    );
}

function VerifyPreviewStep({
    file,
    preview,
    setPreview,
    expectedKeys,
}: {
    file: File | undefined;
    preview: object[] | undefined;
    setPreview: Function;
    expectedKeys: string[];
}) {
    if (!file || !(file instanceof File)) {
        return (
            <Typography variant='caption' color='error'>
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
                <VerifyPreview data={preview} expectedKeys={expectedKeys} />
            </Grid>
            <Grid item xs={12}>
                If everything looks correct, click next.
            </Grid>
        </Grid>
    );
}

function PickDeliveryDateStep({
    inviteForm,
    setInviteForm,
}: {
    inviteForm: InviteForm;
    setInviteForm: Function;
}) {
    const handleDateChange = (date: Date | null) => {
        setInviteForm((val: InviteForm) => ({
            ...val,
            deliveryTime: date,
        }));
    };
    const maxDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000); // Default 3 days ahead
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* TODO Only allow up to 3 days in advance from now */}
            <KeyboardDatePicker
                format='MM/dd/yyyy'
                disablePast
                maxDate={maxDate}
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
    );
}

function InvitePreviewStep({
    inviteForm,
    sendPreview,
    setSendPreview,
    email,
    setEmail,
}: {
    inviteForm: InviteForm;
    sendPreview: boolean;
    setSendPreview: Function;
    email: string;
    setEmail: Function;
}) {
    // TODO Get the uploader's email in order to add to the list of recipiants or send in seperate request?
    const [showPreview, setShowPreview] = useState(false);
    const toggleSendPreview = () => {
        setSendPreview(!sendPreview);
    };
    const toggleShowPreview = () => {
        setShowPreview(!showPreview);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
    };
    return (
        <div>
            <Grid>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sendPreview}
                            onChange={toggleSendPreview}
                            name='send email preview checkbox'
                            aria-label='send email preview checkbox'
                            color='primary'
                        />
                    }
                    label='send email preview'
                />
                <Collapse in={sendPreview}>
                    <Grid>
                        <InputLabel htmlFor='email-input'>Email</InputLabel>
                        <Input
                            onChange={handleChange}
                            value={email}
                            type='email'
                            name='email input'
                            aria-labelledby='email-input'
                            color='primary'
                        />
                    </Grid>
                </Collapse>
            </Grid>
            <Grid>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showPreview}
                            onChange={toggleShowPreview}
                            name='show email preview checkbox'
                            color='primary'
                        />
                    }
                    label='show email preview'
                />
                <Collapse in={showPreview}>
                    <div id='email-preview'>
                        <EmailPreview
                            fName='NAME_PLACEHOLDER'
                            MoC={
                                inviteForm.MoC ? inviteForm.MoC : 'Unknown MoC'
                            }
                            topic={
                                inviteForm.topic
                                    ? inviteForm.topic
                                    : 'Unknown Topic'
                            }
                            eventDateTime={
                                inviteForm.eventDateTime
                                    ? inviteForm.eventDateTime
                                    : 'Unknown Event Date'
                            }
                            constituentScope={inviteForm.constituentScope}
                            registrationLink='https://connectingtocongress.org/register'
                        />
                    </div>
                </Collapse>
            </Grid>
        </div>
    );
}

interface NextStepAction {
    type: 'next-step';
}

interface PreviousStepAction {
    type: 'previous-step';
}

interface ResetAction {
    type: 'reset-step';
}

type Actions = NextStepAction | PreviousStepAction | ResetAction;

function stepReducer(step: number, action: Actions): number {
    switch (action.type) {
        case 'next-step':
            if (step <= 3) return step + 1;
            return step;
        case 'previous-step':
            if (step > 0) return step - 1;
            return step;
        case 'reset-step':
            return 0;
        default:
            return step;
    }
}

function getSteps() {
    return [
        'Select File',
        'Verify Preview',
        'Select Invite Delivery Date/Time',
        'Invite Preview',
        'Upload to Server',
    ];
}

export default function InviteFormStepper() {
    const classes = useStyles();
    const [file, setFile]: [File | undefined, Function] = React.useState();
    const [preview, setPreview]: [
        object[] | undefined,
        Function
    ] = React.useState();
    const [sendPreview, setSendPreview] = useState(false);
    const [previewEmail, setPreviewEmail] = useState('');
    const [activeStep, dispatch] = React.useReducer(stepReducer, 0);
    const steps = getSteps();
    const expectedKeys = ['email', 'fName', 'lName'];
    const [inviteForm, setInviteForm]: [InviteForm, Function] = React.useState({
        MoC: '',
        topic: '',
        eventDateTime: '',
        constituentScope: 'district',
        region: '',
        deliveryTime: new Date(),
        townHallID: '',
    }); // TODO Some of these fields can be pre-filled and/or set from db values.

    const apiRequest = useCallback(() => API.getInviteData(), [
        inviteForm,
        file,
    ]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: (result) => {
            console.log('Success', result);
            // TODO Update once endpoint has been finalized
            // setInviteForm({
            //     ...inviteForm,
            //     MoC: result.MoC,
            //     topic: result.topic,
            //     eventDateTime: result.eventDateTime,
            //     constituentScope: result.constituentScope,
            //     region: result.region,
            //     townHallID: result.townHallID
            // });
        },
        onFailure: (e) => {
            console.log('Fail', e);
        },
    });

    const handleNext = () => {
        dispatch({ type: 'next-step' });
    };

    const handleBack = () => {
        dispatch({ type: 'previous-step' });
    };

    const handleReset = () => {
        dispatch({ type: 'reset-step' });
    };

    useEffect(() => {
        sendRequest();
    }, []);

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <PickFileStep
                        expectedKeys={expectedKeys}
                        file={file}
                        setFile={setFile}
                    />
                );
            case 1:
                return (
                    <VerifyPreviewStep
                        file={file}
                        preview={preview}
                        setPreview={setPreview}
                        expectedKeys={expectedKeys}
                    />
                );
            case 2:
                return (
                    <PickDeliveryDateStep
                        inviteForm={inviteForm}
                        setInviteForm={setInviteForm}
                    />
                );
            case 3:
                return (
                    <InvitePreviewStep
                        inviteForm={inviteForm}
                        sendPreview={sendPreview}
                        setSendPreview={setSendPreview}
                        email={previewEmail}
                        setEmail={setPreviewEmail}
                    />
                );
            case 4:
                return (
                    <CreateInvite
                        onSuccess={handleNext}
                        onFailure={handleBack}
                        inviteForm={inviteForm}
                        preview={{ sendPreview, previewEmail } as InvitePreview}
                        file={file}
                    />
                );
            case 5:
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
