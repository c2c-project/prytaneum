/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import {
    Dialog,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    List,
    Typography,
    Grid,
    Collapse,
    IconButton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useRefetchableFragment } from 'react-relay';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import clsx from 'clsx';

import { SpeakerListFragment$key } from '@local/__generated__/SpeakerListFragment.graphql';
import { SpeakerCard } from './SpeakerCard';
import { useRefresh } from '@local/features/core';

interface SpeakerItemProps {
    className?: string;
    fragmentRef: SpeakerListFragment$key;
}

export const SPEAKER_LIST_FRAGMENT = graphql`
    fragment SpeakerListFragment on Event @refetchable(queryName: "SpeakerListRefetchQuery") {
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

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.5),
        fontSize: '2.5rem',
    },
    speakers: {
        marginLeft: theme.spacing(2),
        fontWeight: 600,
    },
    noSpeakers: {
        marginLeft: theme.spacing(2),
    },
    expand: {
        padding: theme.spacing(1),
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    arrow: {
        fontSize: '1.5rem',
        color: 'black',
    },
    item: {
        padding: theme.spacing(1),
    },
}));

export function SpeakerList({ fragmentRef, className }: SpeakerItemProps) {
    const classes = useStyles();
    const [data, refetch] = useRefetchableFragment(SPEAKER_LIST_FRAGMENT, fragmentRef);
    const { speakers } = data;

    const [openCard, setOpenCard] = React.useState(''); // use id instead to determine which dialog to open
    const [isIn, setIsIn] = React.useState(false);

    const REFRESH_INTERVAL = 30000; // 30 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);
    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    const speakerEdges = React.useMemo(() => speakers?.edges ?? [], [speakers]);

    return speakers && speakerEdges.length !== 0 ? (
        <React.Fragment>
            <Grid container alignItems='center' className={classes.root}>
                <PeopleOutlineIcon fontSize='inherit' />
                <Typography variant='h5' className={classes.speakers}>
                    {speakerEdges.length} Speaker(s)
                </Typography>
                <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: isIn })}
                    aria-label='show more'
                    onClick={() => setIsIn((prev) => !prev)}
                    size='large'
                >
                    <ArrowDropDownIcon className={classes.arrow} />
                </IconButton>
            </Grid>
            <Collapse in={isIn}>
                <List className={className}>
                    {speakerEdges.map(({ node }) => (
                        <li key={node.id}>
                            <ListItem button onClick={() => setOpenCard(node.id)} className={classes.item}>
                                {node.pictureUrl && (
                                    <ListItemAvatar>
                                        <Avatar alt={`${node.name}-avatar`} src={node.pictureUrl} />
                                    </ListItemAvatar>
                                )}
                                <ListItemText primary={node.name} secondary={node.title} />
                            </ListItem>
                            {node.pictureUrl && node.name && node.title && node.description && (
                                <Dialog open={openCard === node.id} onClose={() => setOpenCard('')}>
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
            </Collapse>
        </React.Fragment>
    ) : (
        <Grid container alignItems='center' className={classes.root}>
            <PeopleOutlineIcon fontSize='inherit' />
            <Typography color='textSecondary' variant='body1' className={classes.noSpeakers}>
                No Speakers to display
            </Typography>
        </Grid>
    );
}

SpeakerList.defaultProps = {
    className: undefined,
};
