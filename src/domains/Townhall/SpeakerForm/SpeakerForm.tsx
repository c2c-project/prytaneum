import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Form from 'components/Form';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import TextField from 'components/TextField';
import { Speaker } from '../types';

interface Props {
    value?: Speaker;
    errors?: Speaker;
    onCancel?: () => void;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

const initialState: Speaker = {
    name: '',
    title: '',
    picture: '',
    description: '',
};
export default function SpeakerField({
    value: speaker,
    errors,
    onCancel,
}: Props) {
    const [state, setState] = React.useState(speaker || initialState);
    const classes = useStyles();
    const buildHandler = (id: keyof Speaker) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const { value } = e.target;
        setState({ ...state, [id]: value });
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(state);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormContent className={classes.root}>
                <TextField
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                    required
                    label='Speaker Name'
                    value={state.name}
                    onChange={buildHandler('name')}
                />
                <TextField
                    error={Boolean(errors?.title)}
                    helperText={errors?.title}
                    required
                    label='Speaker Title'
                    value={state.title}
                    onChange={buildHandler('title')}
                />
                <TextField
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
                    required
                    label='Speaker Description'
                    value={state.description}
                    onChange={buildHandler('description')}
                />
                <TextField
                    error={Boolean(errors?.picture)}
                    helperText={errors?.picture}
                    required
                    label='Picture URL'
                    value={state.picture}
                    onChange={buildHandler('picture')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel ? <Button onClick={onCancel}>Cancel</Button> : null}
                <Button variant='contained' color='primary' type='submit'>
                    {speaker ? 'Update Speaker' : 'Add Speaker'}
                </Button>
            </FormActions>
        </Form>
    );
}

SpeakerField.defaultProps = {
    errors: undefined,
    value: undefined,
    onCancel: undefined,
};
