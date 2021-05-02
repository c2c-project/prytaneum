/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    // FormControlLabel,
    // Switch,
    // FormControl,
    // FormHelperText,
} from '@material-ui/core';
import type { TownhallForm as FormType } from 'prytaneum-typings';

import { TownhallContext } from 'contexts/Townhall';
import LoadingButton from 'components/LoadingButton';
import FormActions from 'components/FormActions';
import FormContent from 'components/FormContent';
import FormTitle from 'components/FormTitle';
import Form from 'components/Form';
import TextField from 'components/TextField';
import DateTimePicker from 'components/DateTimePicker';
import useEndpoint from 'hooks/useEndpoint';
import useForm from 'hooks/useForm';
import { createTownhall, updateTownhall } from '../api';

interface Props {
    onSubmit?: (id: string) => void;
    buttonText?: string;
    onCancel?: () => void;
}

const initialState: FormType = {
    private: false,
    title: '',
    description: '',
    date: '',
    topic: '',
};
export default function TownhallForm({
    onCancel,
    onSubmit: cb,
    buttonText,
}: Props) {
    /**
     * I want to use the regular context here instead of useTownhall because
     * useTownhall with throw an error if it is not within the context,
     * it's okay if this component is outside of a townhall context
     * that just means it's a create townhall form
     *  */
    const townhall = React.useContext(TownhallContext);
    const [state, errors, handleSubmit, handleChange, setState] = useForm(
        townhall?.form || initialState
    );

    // if the _id is falsy, then I know I'm creating a townhall
    // else it's an update to a current townhall
    const apiRequest = React.useCallback(
        () =>
            townhall
                ? updateTownhall(state, townhall._id)
                : createTownhall(state),
        [state, townhall]
    );

    // after this point in the code,
    // whether or not the form is an update or create does not matter
    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: ({ data }) => {
            if (cb) cb(data._id);
        },
    });

    return (
        <Form onSubmit={handleSubmit(sendRequest)}>
            <FormTitle title='Townhall Form' />
            <FormContent>
                {/* <FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={state.private}
                                onChange={(_e, checked) =>
                                    setState({ ...state, private: checked })
                                }
                                name='private-checkbox'
                            />
                        }
                        label='Private'
                    />
                    <FormHelperText>
                        Turning on the Private Option means the Townhall will
                        NOT be listed publicly and will be invite only.
                    </FormHelperText>
                </FormControl> */}
                <TextField
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    required
                    label='Title'
                    value={state.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    error={Boolean(errors.topic)}
                    helperText={errors.topic}
                    required
                    label='Topic'
                    value={state.topic}
                    onChange={handleChange('topic')}
                />
                <DateTimePicker
                    error={Boolean(errors.date)}
                    helperText={errors.date}
                    fullWidth
                    required
                    autoComplete='off'
                    id='date'
                    label='Date & Time'
                    inputVariant='outlined'
                    value={state.date}
                    onChange={(value) =>
                        setState({ ...state, date: value as Date })
                    }
                />
                <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    required
                    label='Description'
                    value={state.description}
                    onChange={handleChange('description')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <LoadingButton loading={isLoading}>
                    <Button type='submit' variant='contained' color='secondary'>
                        {buttonText}
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

TownhallForm.defaultProps = {
    onSubmit: () => {},
    buttonText: 'Submit',
    onCancel: () => {},
};

TownhallForm.propTypes = {
    onSubmit: PropTypes.func,
    buttonText: PropTypes.string,
    onCancel: PropTypes.func,
};
