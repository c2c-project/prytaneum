import * as React from 'react';
import { NextPage } from 'next';
import {
    Paper,
    Grid,
    DialogContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, ChevronRight } from '@material-ui/icons';
import { useRouter } from 'next/router';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { Fab } from '@local/components/Fab';
import { OrgForm, CreateOrgProps } from '@local/features/organizations';
import { Organization, useMyOrgsQuery } from '@local/graphql-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(3),
    },
    listRoot: {
        width: '100%',
    },
}));

const CreateOrgFab = ({ onSubmit: _onSubmit }: CreateOrgProps) => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    // wraps the onSubmit so that we close the dialog when the form is submitted too
    const onSubmit: typeof _onSubmit = (...params) => {
        close();
        _onSubmit(...params);
    };

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <OrgForm onSubmit={onSubmit} />
                </DialogContent>
            </ResponsiveDialog>
            <Fab onClick={open}>
                <Add />
            </Fab>
        </>
    );
};

const Page: NextPage = () => {
    const [orgList, setEventList] = React.useState<Organization[]>([]);
    const { loading } = useMyOrgsQuery({
        onCompleted(data) {
            if (data.myOrgs) setEventList(data.myOrgs);
        },
    });
    const classes = useStyles();
    const router = useRouter();

    const prependOrg = (org: Organization) => {
        setEventList((prev) => [org, ...prev]);
    };

    if (loading || orgList.length === 0)
        return (
            <Grid container justify='center'>
                <Typography variant='body2' align='center'>
                    No organizations to display
                    <br />
                    Get started by clicking the + at the bottom right
                </Typography>
                <CreateOrgFab onSubmit={prependOrg} />
            </Grid>
        );

    return (
        <Grid component={Paper} className={classes.root} container direction='column'>
            <Typography variant='h4'>My Organizations</Typography>
            <List className={classes.listRoot}>
                {orgList.map(({ orgId, name }) => (
                    <ListItem
                        button
                        key={orgId}
                        divider
                        onClick={() => router.push(`/organizations/${encodeURIComponent(orgId)}`)}
                    >
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                            <ChevronRight />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <CreateOrgFab onSubmit={prependOrg} />
        </Grid>
    );
};

export default Page;
