import React from 'react';
import { Grid } from '@material-ui/core';

import TextField from 'components/TextField';
import { Speaker } from '../types';

interface Props {
    value: Speaker;
    onChange: (key: keyof Speaker, value: string) => void;
}

export default function SpeakerField({ value: speaker, onChange }: Props) {
    const buildHandler = (id: keyof Speaker) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const { value } = e.target;
        onChange(id, value);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    label='Speaker Name'
                    value={speaker.name}
                    onChange={buildHandler('name')}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    label='Speaker Party'
                    value={speaker.party}
                    onChange={buildHandler('party')}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    label='Speaker Territory/District/State'
                    value={speaker.territory}
                    onChange={buildHandler('territory')}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    label='Picture URL'
                    value={speaker.picture}
                    onChange={buildHandler('picture')}
                />
            </Grid>
        </Grid>
    );
}
