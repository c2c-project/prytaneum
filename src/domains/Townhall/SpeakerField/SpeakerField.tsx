import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormContent from 'components/FormContent';
import TextField from 'components/TextField';
import { Speaker } from '../types';

interface Props {
    value: Speaker;
    onChange: (key: keyof Speaker, value: string) => void;
    errors?: Speaker;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

export default function SpeakerField({
    value: speaker,
    onChange,
    errors,
}: Props) {
    const classes = useStyles();
    const buildHandler = (id: keyof Speaker) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const { value } = e.target;
        onChange(id, value);
    };
    return (
        <FormContent className={classes.root}>
            <TextField
                error={Boolean(errors?.name)}
                helperText={errors?.name}
                required
                label='Speaker Name'
                value={speaker.name}
                onChange={buildHandler('name')}
            />
            <TextField
                error={Boolean(errors?.party)}
                helperText={errors?.party}
                required
                label='Speaker Party'
                value={speaker.party}
                onChange={buildHandler('party')}
            />
            <TextField
                error={Boolean(errors?.territory)}
                helperText={errors?.territory}
                required
                label='Speaker Territory/District/State'
                value={speaker.territory}
                onChange={buildHandler('territory')}
            />
            <TextField
                error={Boolean(errors?.picture)}
                helperText={errors?.picture}
                required
                label='Picture URL'
                value={speaker.picture}
                onChange={buildHandler('picture')}
            />
        </FormContent>
    );
}

SpeakerField.defaultProps = {
    errors: undefined,
};
