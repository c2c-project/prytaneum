import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Grid, Button, DialogContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';
import { graphql, useFragment } from 'react-relay';
import { useUser } from '@local/features/accounts/useUser';

import type { OrgMemberListFragment$key } from '@local/__generated__/OrgMemberListFragment.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { Loader } from '@local/components/Loader';
import { CreateMember, CreateMemberProps } from './CreateMember';
import { DeleteMember } from './DeleteMember';

interface OrgMemberListProps {
    fragmentRef: OrgMemberListFragment$key;
    className?: string;
}

const CreateMemberDialog = (props: Omit<CreateMemberProps, 'onSubmit'>) => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <CreateMember {...props} onSubmit={close} />
                </DialogContent>
            </ResponsiveDialog>
            <Button onClick={open} startIcon={<Add />}>
                New Member
            </Button>
        </>
    );
};

export const ORG_MEMBERS = graphql`
    fragment OrgMemberListFragment on Organization
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        members(first: $first, after: $after) @connection(key: "OrgMemberListFragment_members") {
            __id
            edges {
                cursor
                node {
                    id
                    firstName
                    lastName
                }
            }
        }
    }
`;

export interface SelectedMember {
    readonly id: string,
    readonly firstName: string | null
    readonly lastName: string | null
}

export function OrgMemberList({ fragmentRef, className }: OrgMemberListProps) {
    const [isConfDialogOpen, setIsConfDialogOpen] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState({
        id: '',
        firstName: '',
        lastName: ''
    } as SelectedMember);
    const [user, setUser] = useUser();
    const data = useFragment(ORG_MEMBERS, fragmentRef);
    const members = React.useMemo(() => data.members?.edges || [], [data]);
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);
    const connectionId = React.useMemo(() => data.members?.__id, [data]);
    const [canView, setCanView] = React.useState(false);

    const close = () => {
        setIsConfDialogOpen(false);
    }

    React.useEffect(() => {
        members.every(member => {
            if (member.node.id === user?.id) {
                setCanView(true);
                return false;
            }
            return true;
        })
    }, [user, members])

    if (!canView) return <Loader />;

    return (
        <Grid container item direction='column' className={className}>
            <Grid item xs={12}>
                <List>
                    {members.length > 0 ? (
                        members.map(({ node }) => (
                            <ListItem button key={node.id} divider>
                                <ListItemText primary={`${node.firstName} ${node.lastName}`} />
                                {user?.id !== node.id ?
                                    <IconButton
                                        className='deleteMember'
                                        onClick={() => {
                                            setSelectedMember(node);
                                            setIsConfDialogOpen(true);
                                        }}
                                        aria-expanded={isConfDialogOpen}
                                        aria-label='delete member'
                                    >
                                        <ClearIcon />
                                    </IconButton> : <></>}
                            </ListItem>
                        ))
                    ) : (
                        <Typography align='center' variant='body2'>
                            No members to display
                        </Typography>
                    )}
                </List>
            </Grid>
            <Grid container justify='flex-end'>
                <DeleteMember
                    open={isConfDialogOpen}
                    onClose={close}
                    title={`Delete "${selectedMember.firstName}" as a member?`}
                    onConfirm={close}
                    memberId={selectedMember.id}
                    orgId={data.id}
                    connections={[connectionId ?? '']}
                >
                    <>
                        Are you sure you want to delete the&nbsp;
                        <b>{selectedMember.firstName}</b> member?
                    </>
                </DeleteMember>
            </Grid>
            <Grid container justify='flex-end'>
                <CreateMemberDialog orgId={data.id} connections={[connectionId ?? '']} />
            </Grid>
        </Grid>
    );
}
