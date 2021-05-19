import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Grid, Button, DialogContent } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { User } from '@local/graphql-types';

interface OrgMemberListProps {
    members?: User[];
    className?: string;
    orgId: string;
}

const NewEvent = () => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography>TODO</Typography>
                </DialogContent>
            </ResponsiveDialog>
            <Button onClick={open} startIcon={<Add />}>
                New Member
            </Button>
        </>
    );
};

export function OrgMemberList({ members: _members = [], className, orgId }: OrgMemberListProps) {
    const [members, setMembers] = React.useState(_members);
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);

    return (
        <Grid container item direction='column' className={className}>
            <Grid item xs={12}>
                <List>
                    {members.length > 0 ? (
                        members.map(({ userId, firstName, lastName }) => (
                            <ListItem button key={userId} divider>
                                <ListItemText primary={`${firstName} ${lastName}`} />
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
                <NewEvent />
            </Grid>
        </Grid>
    );
}
