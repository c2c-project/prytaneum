import * as React from 'react';
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
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay';

import type { OrgListQuery } from '@local/__generated__/OrgListQuery.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { Fab } from '@local/components/Fab';
import { CreateOrg, CreateOrgProps } from '@local/features/organizations';
import { ArrayElement } from '@local/utils/ts-utils';

export const ORG_LIST_QUERY = graphql`
    query OrgListQuery {
        myOrgs {
            id
            name
            createdAt
        }
    }
`;

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
                    <CreateOrg onSubmit={onSubmit} />
                </DialogContent>
            </ResponsiveDialog>
            <Fab onClick={open}>
                <Add />
            </Fab>
        </>
    );
};

export interface OrgListProps {
    queryRef: PreloadedQuery<OrgListQuery>;
}

type TOrganizationList = NonNullable<OrgListQuery['response']['myOrgs']>;

export const OrgList = ({ queryRef }: OrgListProps) => {
    const data = usePreloadedQuery(ORG_LIST_QUERY, queryRef);
    const [orgList, setEventList] = React.useState<TOrganizationList>(data.myOrgs || []);
    const classes = useStyles();
    const router = useRouter();

    const prependOrg = (org: ArrayElement<TOrganizationList>) => {
        setEventList((prev) => [org, ...prev]);
    };

    if (orgList.length === 0)
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
                {orgList.map(({ id, name }) => (
                    <ListItem
                        button
                        key={id}
                        divider
                        onClick={() => router.push(`/organizations/${encodeURIComponent(id)}`)}
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
