/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { AxiosResponse } from 'axios';

import TextField from 'components/TextField/TextField';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import useEndpoint from 'hooks/useEndpoint';
import { createTownhall, updateTownhall } from '../api';
import { TownhallForm } from '../types';

interface FormProps {
    onSubmit: () => void;
    initialState?: TownhallForm;
    endpoint: (form: TownhallForm) => Promise<AxiosResponse<unknown>>;
}

interface DefaultFormProps {
    initialState: TownhallForm;
}

function TownhallFormBase({
    onSubmit: cb,
    initialState,
    endpoint,
}: FormProps & DefaultFormProps) {
    const [state, setState] = React.useState<TownhallForm>(initialState);
    const apiRequest = React.useCallback(() => endpoint(state), [state]);
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
    const handleChange = (e: ChangeEvent, key: string) => {
        const { value } = e.target;
        setState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant='h4'>Session Form</Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Speaker'
                                value={state.speaker}
                                onChange={(e) => handleChange(e, 'speaker')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Moderator'
                                value={state.moderator}
                                onChange={(e) => handleChange(e, 'moderator')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Session URL'
                                value={state.url}
                                onChange={(e) => handleChange(e, 'url')}
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
                                    handleChange({ target: { value } }, 'date')
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label='Description'
                                value={state.description}
                                onChange={(e) => handleChange(e, 'description')}
                            />
                        </Grid>
                        <Grid container item xs={12} justify='flex-end'>
                            <Button type='submit' variant='contained'>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

TownhallFormBase.defaultProps = {
    onSubmit: () => {},
    initialState: {
        speaker: '',
        moderator: '',
        date: new Date(),
        description: '',
        url: '',
    },
};

TownhallFormBase.propTypes = {
    onSubmit: PropTypes.func,
    initialState: PropTypes.object,
    endpoint: PropTypes.func.isRequired,
};

interface CreateTownhallProps {
    onSubmit: () => void;
}

function CreateTownhall(props: CreateTownhallProps) {
    return (
        <TownhallFormBase
            endpoint={(form) => createTownhall(form)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
}

interface UpdateSessionProps {
    onSubmit: () => void;
    updateTarget: string;
}

function UpdateTownhall(props: UpdateSessionProps) {
    const { updateTarget } = props;
    return (
        <TownhallFormBase
            endpoint={(form) => updateTownhall(form, updateTarget)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
}

interface GenericProps {
    type: 'create' | 'update';
    onSubmit: () => void;
}

interface UpdateProps extends GenericProps {
    type: 'update';
    updateTarget: string;
}

interface CreateProps extends GenericProps {
    type: 'create';
    updateTarget?: never;
}

type Props = CreateProps | UpdateProps;

export default function TownhallForm({ type, onSubmit, updateTarget }: Props) {
    switch (type) {
        case 'create':
            return <CreateTownhall onSubmit={onSubmit} />;
        case 'update':
            return (
                <UpdateTownhall
                    // typescript can't detect that this is a string I guess so I had to cast it
                    updateTarget={updateTarget as string}
                    onSubmit={onSubmit}
                />
            );
        default:
            return <CreateTownhall onSubmit={onSubmit} />;
    }
}
