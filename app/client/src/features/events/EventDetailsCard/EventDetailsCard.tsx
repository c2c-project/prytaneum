import * as React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useFragment } from 'react-relay';

import { EventDetailsCardFragment$key } from '@local/__generated__/EventDetailsCardFragment.graphql';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(1),
        fontWeight: 700,
    },
    description: {
        marginBottom: theme.spacing(1),
    },
    divider: {
        background: 'black',
    },
}));

export const EVENT_DETAILS_CARD_FRAGMENT = graphql`
    fragment EventDetailsCardFragment on Event {
        id
        title
        description
    }
`;

interface Props {
    fragmentRef: EventDetailsCardFragment$key;
}

export function EventDetailsCard({ fragmentRef }: Props) {
    const { title, description } = useFragment(EVENT_DETAILS_CARD_FRAGMENT, fragmentRef);
    const classes = useStyles();

    return (
        <Grid container direction='column'>
            <Typography variant='h5' className={classes.title}>
                {title}
            </Typography>
            <Typography color='textSecondary' variant='body1' className={classes.description}>
                {description}
            </Typography>
            <Divider className={classes.divider} />
        </Grid>
    );
}
