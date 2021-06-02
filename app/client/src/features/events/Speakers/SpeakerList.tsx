/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Dialog, Avatar, ListItem, ListItemText, ListItemAvatar, List, Typography } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';

import { SpeakerListFragment$key } from '@local/__generated__/SpeakerListFragment.graphql';
import { SpeakerCard } from './SpeakerCard';

interface SpeakerItemProps {
    className?: string;
    fragmentRef: SpeakerListFragment$key;
}

export const SPEAKER_LIST_FRAGMENT = graphql`
    fragment SpeakerListFragment on Event {
        speakers {
            edges {
                node {
                    id
                    pictureUrl
                    name
                    description
                    title
                }
                cursor
            }
        }
    }
`;

export function SpeakerList({ fragmentRef, className }: SpeakerItemProps) {
    const { speakers } = useFragment(SPEAKER_LIST_FRAGMENT, fragmentRef);
    const [openCard, setOpenCard] = React.useState(false);
    return speakers ? (
        <List className={className}>
            {speakers.map(({ id: speakerId, pictureUrl: picture, name, description, title }) => (
                <li key={speakerId}>
                    <ListItem key={picture} button onClick={() => setOpenCard(true)}>
                        {picture && (
                            <ListItemAvatar>
                                <Avatar alt={`${name}-avatar`} src={picture} />
                            </ListItemAvatar>
                        )}
                        <ListItemText primary={name} secondary={title} />
                    </ListItem>
                    {picture && name && title && description && (
                        <Dialog open={openCard} onClose={() => setOpenCard(false)}>
                            <SpeakerCard image={picture} title={name} subtitle={title} description={description} />
                        </Dialog>
                    )}
                </li>
            ))}
        </List>
    ) : (
        <Typography align='center' color='textSecondary' variant='body2'>
            No Speakers to display
        </Typography>
    );
}

SpeakerList.defaultProps = {
    className: undefined,
};
