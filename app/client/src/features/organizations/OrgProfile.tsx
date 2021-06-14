import * as React from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import type { OrgProfileQuery } from '@local/__generated__/OrgProfileQuery.graphql';
import { OrgEventList, OrgMemberList } from '@local/features/organizations';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        '& > *': {
            margin: theme.spacing(2, 0),
        },
    },
    section: {
        padding: theme.spacing(3),
    },
    listRoot: {
        width: '100%',
    },
}));

export const ORG_PROFILE = graphql`
    query OrgProfileQuery($id: ID!, $count: Int, $cursor: String) {
        node(id: $id) {
            id
            ... on Organization {
                name
                ...OrgEventListFragment
                ...OrgMemberListFragment
            }
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<OrgProfileQuery>;
}

export const OrgProfile = ({ queryRef }: Props) => {
    const classes = useStyles();
    const { node } = usePreloadedQuery(ORG_PROFILE, queryRef);

    return (
        <Grid container className={classes.root} alignItems='flex-start' alignContent='flex-start'>
            <Typography variant='h4'>{node?.name ?? 'Unknown Organization'}</Typography>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Events</Typography>
                {node && <OrgEventList fragementRef={node} className={classes.listRoot} />}
            </Grid>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Members</Typography>
                {node && <OrgMemberList fragmentRef={node} className={classes.listRoot} />}
            </Grid>
        </Grid>
    );
};
