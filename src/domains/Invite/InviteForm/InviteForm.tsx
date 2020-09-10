/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import useEndpoint from 'hooks/useEndpoint';
import API from '../api';
import { InviteForm, InvitePreview } from '../types';
import Steps from './Steps';

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
            if (step <= 4) return step + 1;
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
        { title: 'Select File', component: Steps.SelectFileStep },
        { title: 'Verify Preview', component: Steps.VerifyPreviewStep },
        {
            title: 'Select Invite Delivery Date/Time',
            component: Steps.PickDeliveryDateStep,
        },
        { title: 'Invite Preview', component: Steps.InvitePreviewStep },
        { title: 'Upload to Server', component: Steps.CreateInviteStep },
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
        townHallId: '',
    }); // TODO Some of these fields can be pre-filled and/or set from db values.

    const apiRequest = useCallback(() => API.getInviteData(), [
        inviteForm,
        file,
    ]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: ({ data }: { data: InviteForm }) => {
            setInviteForm({
                ...inviteForm,
                MoC: data.MoC,
                topic: data.topic,
                eventDateTime: data.eventDateTime,
                constituentScope: data.constituentScope,
                region: data.region,
                townHallId: data.townHallId,
            });
        },
        onFailure: (e) => {
            // TODO Handle error
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
                    // steps[0].component({ expectedKeys, file, setFile })
                    <Steps.SelectFileStep
                        expectedKeys={expectedKeys}
                        file={file}
                        setFile={setFile}
                    />
                );
            case 1:
                return (
                    <Steps.VerifyPreviewStep
                        file={file}
                        preview={preview}
                        setPreview={setPreview}
                        expectedKeys={expectedKeys}
                    />
                );
            case 2:
                return (
                    <Steps.PickDeliveryDateStep
                        inviteForm={inviteForm}
                        setInviteForm={setInviteForm}
                    />
                );
            case 3:
                return (
                    <Steps.InvitePreviewStep
                        inviteForm={inviteForm}
                        sendPreview={sendPreview}
                        setSendPreview={setSendPreview}
                        email={previewEmail}
                        setEmail={setPreviewEmail}
                    />
                );
            case 4:
                return (
                    <Steps.CreateInviteStep
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
                {steps.map((item, index) => (
                    <Step key={item.title}>
                        <StepLabel>{item.title}</StepLabel>
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
