/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import TextField from 'components/TextField';
import DateTimePicker from 'components/DateTimePicker';
import useEndpoint from 'hooks/useEndpoint';
import { createTownhall, updateTownhall } from '../api';
import { TownhallContext } from '../Contexts/Townhall';
import { TownhallForm as TownhallFormType } from '../types';

interface Props {
    onSubmit?: () => void;
}

export default function TownhallForm({ onSubmit: cb }: Props) {
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
        [state]
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
                        {/* 
                        // FIXME:
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Speaker'
                                value={state.speaker.name}
                                onChange={buildHandler('speaker')}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Moderator'
                                value={state.moderator}
                                onChange={buildHandler('moderator')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Session URL'
                                value={state.url}
                                onChange={buildHandler('url')}
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
                        <Grid container item xs={12} justify='flex-end'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                            >
                                Submit
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
};

TownhallForm.propTypes = {
    onSubmit: PropTypes.func,
};
