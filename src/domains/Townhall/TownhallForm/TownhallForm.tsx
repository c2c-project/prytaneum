/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Grid,
    Button,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import Help from 'components/Help';
import TextField from 'components/TextField';
import DateTimePicker from 'components/DateTimePicker';
import useEndpoint from 'hooks/useEndpoint';
import { createTownhall, updateTownhall } from '../api';
import { TownhallContext } from '../Contexts/Townhall';
import { TownhallForm as TownhallFormType } from '../types';
import SpeakerField from '../SpeakerField';

interface DefaultProps {
    onSubmit: () => void;
    buttonText: string;
}

export default function TownhallForm({
    onSubmit: cb,
    buttonText,
}: Partial<DefaultProps>) {
    // this works even if it's not wrapped in the townhall context
    // the default value set for the townhall context has the appropriate form
    const townhall = React.useContext(TownhallContext);
    const [state, setState] = React.useState<TownhallFormType>(townhall.form);

    // if the townhall._id is falsy, then I know I'm creating a townhall
    // else it's an update to a current townhall
    const apiRequest = React.useCallback(
        () =>
            townhall._id
                ? updateTownhall(state, townhall._id)
                : createTownhall(state),
        [state, townhall._id]
    );

    // after this point in the code,
    // whether or not the form is an update or create does not matter
    const [sendRequest] = useEndpoint(apiRequest, {
        onSuccess: cb,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    type ChangeEvent =
        | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        | { target: { value: MaterialUiPickersDate } };
    const buildHandler = (key: keyof TownhallFormType) => (e: ChangeEvent) => {
        const { value } = e.target;
        setState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant='h4'>Townhall Form</Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.private}
                                        onChange={(e) => {
                                            const { checked } = e.target;
                                            setState((prev) => ({
                                                ...prev,
                                                private: checked,
                                            }));
                                        }}
                                        name='private-checkbox'
                                    />
                                }
                                label='Private'
                            />
                            <Help placement='right'>
                                The townhall will not be listed publicly and
                                will be invite only.
                            </Help>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Title'
                                value={state.title}
                                onChange={buildHandler('title')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Topic'
                                value={state.topic}
                                onChange={buildHandler('topic')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DateTimePicker
                                fullWidth
                                required
                                autoComplete='off'
                                id='date'
                                label='Date & Time'
                                inputVariant='outlined'
                                value={state.date}
                                onChange={(value) =>
                                    buildHandler('date')({ target: { value } })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Description'
                                value={state.description}
                                onChange={buildHandler('description')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SpeakerField
                                value={state.speaker}
                                onChange={(key, value) => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        speaker: {
                                            ...state.speaker,
                                            [key]: value,
                                        },
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

TownhallForm.defaultProps = {
    onSubmit: () => {},
    buttonText: 'Submit',
};

TownhallForm.propTypes = {
    onSubmit: PropTypes.func,
    buttonText: PropTypes.string,
};
