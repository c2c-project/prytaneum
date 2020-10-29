/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    FormControlLabel,
    Switch,
    FormControl,
    FormHelperText,
} from '@material-ui/core';

import FormActions from 'components/FormActions';
import FormContent from 'components/FormContent';
import FormTitle from 'components/FormTitle';
import Form from 'components/Form';
import TextField from 'components/TextField';
import DateTimePicker from 'components/DateTimePicker';
import useEndpoint from 'hooks/useEndpoint';
import useForm from 'hooks/useForm';
import { createTownhall, updateTownhall } from '../api';
import { TownhallContext } from '../Contexts/Townhall';

interface Props {
    onSubmit?: () => void;
    buttonText?: string;
}

export default function TownhallForm({ onSubmit: cb, buttonText }: Props) {
    // this works even if it's not wrapped in the townhall context
    // the default value set for the townhall context has the appropriate form initial state
    const { form, _id } = React.useContext(TownhallContext);
    const [state, errors, handleSubmit, handleChange, setState] = useForm(form);

    // if the _id is falsy, then I know I'm creating a townhall
    // else it's an update to a current townhall
    const apiRequest = React.useCallback(
        () => (_id ? updateTownhall(state, _id) : createTownhall(state)),
        [state, _id]
    );

    // after this point in the code,
    // whether or not the form is an update or create does not matter
    const [sendRequest] = useEndpoint(apiRequest, { onSuccess: cb });

    return (
        <Form onSubmit={handleSubmit(sendRequest)}>
            <FormTitle title='Townhall Form' />
            <FormContent>
                <FormControl>
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
                </FormControl>
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
                <Button type='submit' variant='contained' color='secondary'>
                    {buttonText}
                </Button>
            </FormActions>
        </Form>
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
