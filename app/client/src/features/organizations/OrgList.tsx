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
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { useRouter } from 'next/router';
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay';

import type { OrgListQuery } from '@local/__generated__/OrgListQuery.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { Fab } from '@local/components/Fab';
import { CreateOrg, TCreateOrgProps } from '@local/features/organizations';

import { Loader } from '@local/components/Loader';
import { useUser } from '../accounts';
import { DeleteOrganization } from './DeleteOrg';

export const ORG_LIST_QUERY = graphql`
    query OrgListQuery($first: Int, $after: String) {
        me {
            id
            organizations(first: $first, after: $after) @connection(key: "OrgListQuery_organizations") {
                __id
                edges {
                    cursor
                    node {
                        id
                        name
                        createdAt
                    }
                }
            }
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

const CreateOrgFab = ({ connection }: TCreateOrgProps) => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <CreateOrg connection={connection} onSubmit={close} />
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

export interface SelectedOrg {
    readonly id: string,
    readonly name: string | null
}

export const OrgList = ({ queryRef }: OrgListProps) => {
    const data = usePreloadedQuery(ORG_LIST_QUERY, queryRef);
    const classes = useStyles();
    const router = useRouter();
    const [user, , isLoading] = useUser();
    const [isConfDialogOpen, setIsConfDialogOpen] = React.useState(false);
    const [selectedOrg, setSelectedOrg] = React.useState({
        id: '',
        name: ''
    } as SelectedOrg);

    const close = () => {
        setIsConfDialogOpen(false);
        //forces page to reload so that it will update
        location.reload();
    }

    const listOfOrgs = React.useMemo(() => data.me?.organizations?.edges ?? [], [data.me]);
    const connectionId = React.useMemo(() => data.me?.organizations?.__id ?? '', [data.me?.organizations?.__id]);

    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
    }, [user, router, isLoading]);

    React.useEffect(() => {
        if (isLoading) return;
        if (!user) router.push('/login');
    }, [isLoading, user, router]);

    if (isLoading) return <Loader />;

    if (listOfOrgs.length === 0)
        return (
            <Grid container justify='center'>
                <Typography variant='body2' align='center'>
                    No organizations to display
                    <br />
                    Get started by clicking the + at the bottom right
                </Typography>
                <CreateOrgFab connection={connectionId} />
            </Grid>
        );

    return (
        <Grid component={Paper} className={classes.root} container direction='column'>
            <Typography variant='h4'>My Organizations</Typography>
            <List className={classes.listRoot}>
                {listOfOrgs.map(({ node: organization }) => (
                    <ListItem
                        button
                        key={organization.id}
                        divider
                        onClick={() => router.push(`/organizations/${encodeURIComponent(organization.id)}`)}
                    >
                        <ListItemText primary={organization.name} />
                        <ListItemSecondaryAction>
                            <IconButton
                                className='deleteOrg'
                                onClick={() => {
                                    setSelectedOrg(organization);
                                    setIsConfDialogOpen(true);
                                }}
                                aria-expanded={isConfDialogOpen}
                                aria-label='delete organization'
                            >
                                <ClearIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Grid container justify='flex-end'>
                <DeleteOrganization
                    open={isConfDialogOpen}
                    onClose={close}
                    title={`Delete "${selectedOrg.name}" organization?`}
                    onConfirm={close}
                    orgId={selectedOrg.id}
                    connections={[connectionId ?? '']}
                >
                    <>
                        Are you sure you want to delete the&nbsp;
                        <b>{selectedOrg.name}</b> organization?
                    </>
                </DeleteOrganization>
            </Grid>
            <CreateOrgFab connection={connectionId} />
        </Grid>
    );
};
