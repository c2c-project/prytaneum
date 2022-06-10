import * as React from 'react';
import { Grid, Divider } from '@mui/material';

import { ResponsiveDialog } from '@local/components/ResponsiveDialog';

import { SettingsMenu } from '@local/components/SettingsMenu/SettingsMenu';
import { ModifyUserEmailDemo, ModifyUserPasswordDemo, DeleteAccountDemo } from '../UserSettings/components';

export function UserSettingsDemo() {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);
    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    const sections = [
        {
            title: 'Account Settings',
            description: 'View Account Settings',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ModifyUserEmailDemo />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <ModifyUserPasswordDemo />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <DeleteAccountDemo />
                    </Grid>
                </Grid>
            ),
        },
    ];

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SettingsMenu config={sections} />
            <ResponsiveDialog open={open} onClose={() => setContent(null)}>
                {cont || <div />}
            </ResponsiveDialog>
        </div>
    );
}
