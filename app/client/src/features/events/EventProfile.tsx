import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import type { EventProfileFragment$key } from '@local/__generated__/EventProfileFragment.graphql';

export interface EventProfileProps {
    fragmentRef: EventProfileFragment$key;
}

export const EVENT_PROFILE_FRAGMENT = graphql`
    fragment EventProfileFragment on Event {
        title
        topic
        description
        speakers {
            edges {
                node {
                    id
                    pictureUrl
                    name
                    title
                }
            }
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
}));

export function EventProfile({ fragmentRef }: EventProfileProps) {
    const data = useFragment(EVENT_PROFILE_FRAGMENT, fragmentRef);
    const classes = useStyles();
    return (
        <Grid container justify='center'>
            <Grid item xs={12} md={8}>
                <Grid component={Paper} className={classes.paper}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>{data.title}</Typography>
                        <Typography color='textSecondary' paragraph>
                            {data.topic}
                        </Typography>
                        <Typography paragraph>{data.description}</Typography>
                    </Grid>
                    <Divider />
                    <Grid container item xs={12} justify='center'>
                        <Button variant='contained' color='primary'>
                            I want to attend
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
