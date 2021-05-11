/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Dialog, Avatar, ListItem, ListItemText, ListItemAvatar, List } from '@material-ui/core';

import { EventSpeaker as Speaker } from '@local/graphql-types';
import { SpeakerCard } from './SpeakerCard';

interface SpeakerItemProps {
    speakers: Speaker[];
    className?: string;
}

export function SpeakerList({ speakers, className }: SpeakerItemProps) {
    const [openCard, setOpenCard] = React.useState(false);
    return (
        <List className={className}>
            {speakers.map(({ userId, picture, name, description, title }) => (
                <li key={userId}>
                    <ListItem key={picture} button onClick={() => setOpenCard(true)}>
                        <ListItemAvatar>
                            <Avatar alt={`${name}-avatar`} src={picture} />
                        </ListItemAvatar>
                        <ListItemText primary={name} secondary={title} />
                    </ListItem>
                    <Dialog open={openCard} onClose={() => setOpenCard(false)}>
                        <SpeakerCard image={picture} title={name} subtitle={title} description={description} />
                    </Dialog>
                </li>
            ))}
        </List>
    );
}

SpeakerList.defaultProps = {
    className: undefined,
};
