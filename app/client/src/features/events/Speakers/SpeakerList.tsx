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
    const speakerEdges = React.useMemo(() => speakers?.edges ?? [], [speakers]);
    const [openCard, setOpenCard] = React.useState(false);
    return speakers ? (
        <List className={className}>
            {speakerEdges.map(({ node }) => (
                <li key={node.id}>
                    <ListItem button onClick={() => setOpenCard(true)}>
                        {node.pictureUrl && (
                            <ListItemAvatar>
                                <Avatar alt={`${node.name}-avatar`} src={node.pictureUrl} />
                            </ListItemAvatar>
                        )}
                        <ListItemText primary={node.name} secondary={node.title} />
                    </ListItem>
                    {node.pictureUrl && node.name && node.title && node.description && (
                        <Dialog open={openCard} onClose={() => setOpenCard(false)}>
                            <SpeakerCard
                                image={node.pictureUrl}
                                title={node.name}
                                subtitle={node.title}
                                description={node.description}
                            />
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
