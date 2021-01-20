/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useCallback, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Loader from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ParseResult } from 'papaparse';

import useEndpoint from 'hooks/useEndpoint';

import EmailPreview from 'domains/Invite/EmailPreview';
import SelectFile from 'components/SelectFile';
import VerifyPreview from 'domains/Invite/VerifyPreview';
import Parse from 'domains/Invite/VerifyPreview/utils';
import API from '../api';
import { InviteForm, InvitePreview } from '../types';

interface Result extends ParseResult<object> {
    data: Array<object>;
}

/* STEPS */
function SelectFileStep({
    expectedKeys,
    file,
    setFile,
}: {
    expectedKeys: string[];
    file: File | undefined;
    setFile: (f: File) => void;
}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Expected Headers: {expectedKeys.map((header) => ` "${header}" `)}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button component='a' href='/example-invite.csv' variant='outlined'>
                    Download Example File
                </Button>
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

function PickDeliveryDateStep({ inviteForm, setInviteForm }: { inviteForm: InviteForm; setInviteForm: Function }) {
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
                            MoC={inviteForm.MoC ? inviteForm.MoC : 'Unknown MoC'}
                            topic={inviteForm.topic ? inviteForm.topic : 'Unknown Topic'}
                            eventDateTime={inviteForm.eventDateTime ? inviteForm.eventDateTime : 'Unknown Event Date'}
                            constituentScope={inviteForm.constituentScope}
                            registrationLink='https://connectingtocongress.org/register'
                        />
                    </div>
                </Collapse>
            </Grid>
        </div>
    );
}

function CreateInviteStep({
    onSuccess,
    onFailure,
    inviteForm,
    file,
    preview,
}: {
    onSuccess: () => void;
    onFailure: () => void;
    inviteForm: InviteForm;
    file: File | undefined;
    preview: InvitePreview;
}): JSX.Element {
    const apiRequest = useCallback(() => API.createInvite(inviteForm, file, preview), [inviteForm, file, preview]);
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess,
        onFailure,
    });
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
    return (
        <Grid container justify='center'>
            <Loader style={{ marginTop: '8em' }} />
        </Grid>
    );
}

export default {
    SelectFileStep,
    VerifyPreviewStep,
    PickDeliveryDateStep,
    InvitePreviewStep,
    CreateInviteStep,
};
