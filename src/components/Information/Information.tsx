import React from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { DialogType } from 'pages/Auth/UserSettings/types';

export default function Information() {
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const contentFeedback = () => {
        return (
            <>
                <Grid
                    component='span'
                    container
                    spacing={2}
                    alignContent='center'
                >
                    <Grid component='span' item xs={12}>
                        <ListItem button hidden={false} onClick={() => {}}>
                            Feedback
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem button hidden={false} onClick={() => {}}>
                            About Us
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem button hidden={false} onClick={() => {}}>
                            Privacy Policy
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem button hidden={false} onClick={() => {}}>
                            Terms of Service
                        </ListItem>
                    </Grid>
                </Grid>
            </>
        );
    };

    return {
        title: 'About Prytaneum',
        content: contentFeedback(),
        dialogData: [
            {
                title: 'Feedback',
                component: <span> hows our driving </span>,
            },
            {
                title: 'About Us',
                component: (
                    <span>
                        <h1>this was made somehow by some people</h1>
                    </span>
                ),
            },
            {
                title: 'Privacy Policy',
                component: (
                    <span>
                        <h1>Information is important.</h1>
                    </span>
                ),
            },
            {
                title: 'TOS',
                component: <span>plz no hurt us we no hurt u</span>,
            },
        ],
    };
}
