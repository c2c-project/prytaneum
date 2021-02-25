/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Dialog, Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import type { Speaker } from 'prytaneum-typings';

import SpeakerCard from 'domains/Speaker/SpeakerCard';

interface Props {
    speaker: Speaker;
}

export default function SpeakerItem({ speaker }: Props) {
    const [openCard, setOpenCard] = React.useState(false);
    return (
        <li>
            <ListItem key={speaker.picture} button onClick={() => setOpenCard(true)}>
                <ListItemAvatar>
                    <Avatar alt={`${speaker.name}-avatar`} src={speaker.picture} />
                </ListItemAvatar>
                <ListItemText primary={speaker.name} secondary={speaker.title} />
            </ListItem>
            <Dialog open={openCard} onClose={() => setOpenCard(false)}>
                <SpeakerCard
                    image={speaker.picture}
                    title={speaker.name}
                    subtitle={speaker.title}
                    description={speaker.description}
                />
            </Dialog>
        </li>
    );
}
