import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Loader } from '@local/components/Loader';
import { OrgEventList, OrgMemberList } from '@local/features/organizations';
import { useOrgInfoLazyQuery, Organization } from '@local/graphql-types';

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

const Page: NextPage = () => {
    const router = useRouter();
    const classes = useStyles();
    const { id } = router.query as { id: string }; // guaranteed as part of the file name
    const [org, setOrg] = React.useState<Organization>();
    const [query, { loading: isQueryLoading }] = useOrgInfoLazyQuery({
        variables: { id },
        onCompleted(results) {
            if (results.orgById) setOrg(results.orgById);
        },
        // fetchPolicy: 'no-cache',
    });

    React.useEffect(() => {
        if (router.isReady) query();
    }, [router.isReady, query]);

    if (isQueryLoading || !router.isReady || !org) return <Loader />;

    return (
        <Grid container className={classes.root} alignItems='flex-start' alignContent='flex-start'>
            <Typography variant='h4'>{org.name}</Typography>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Events</Typography>
                <OrgEventList events={org.events || undefined} className={classes.listRoot} orgId={id} />
            </Grid>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Members</Typography>
                <OrgMemberList members={org.members || undefined} className={classes.listRoot} orgId={id} />
            </Grid>
        </Grid>
    );
};

export default Page;
