import * as React from 'react';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import type { OrgProfileQuery } from '@local/__generated__/OrgProfileQuery.graphql';
import { OrgEventList, OrgMemberList, CreateEventFab } from '@local/features/organizations';
import { Loader } from '@local/components/Loader';
import { useUser } from '../accounts';

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
    const theme = useTheme();
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { node } = usePreloadedQuery(ORG_PROFILE, queryRef);
    const { user } = useUser();

    if (!node || !user) return <Loader />;

    return (
        <Grid
            container
            sx={[
                {
                    height: '100%',
                    width: '100%',
                    marginLeft: 0,
                },
                {
                    '& > *': {
                        margin: theme.spacing(2, 0),
                    },
                },
                lgBreakpointUp && {
                    width: '80%',
                    marginLeft: '250px',
                },
            ]}
            alignItems='flex-start'
            alignContent='flex-start'
        >
            <Typography variant='h4'>{node?.name ?? 'Unknown Organization'}</Typography>
            <Grid component={Paper} container item direction='column' sx={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Events</Typography>
                {node && <OrgEventList fragementRef={node} />}
            </Grid>
            <Grid component={Paper} container item direction='column' sx={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Members</Typography>
                {node && <OrgMemberList fragmentRef={node} />}
            </Grid>
            {node && <CreateEventFab fragmentRef={node} />}
        </Grid>
    );
};
