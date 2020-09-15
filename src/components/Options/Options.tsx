import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';

import { DialogType } from 'pages/Auth/UserSettings/types';

export default function Options() {
    const [openAppearance, setOpenAppearance] = React.useState(false);

    return {
        title: 'Options',
        sectionData: [
            {
                title: '',
                subtitle: (
                    <Grid
                        component='span'
                        container
                        spacing={2}
                        alignContent='center'
                    >
                        <Grid component='span' item xs={12}>
                            <Button
                                component='span'
                                // use state for options
                                // flag in userProfile should have a field for anonymous
                                // react is only re-rendered when use/set state is used
                                // same value of variable is not kept upon refreshing
                                onClick={() => {}}
                            >
                                Appear anonymous:
                            </Button>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <Button component='span' onClick={() => {}}>
                                Notify me about upcoming Townhalls:
                            </Button>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => setOpenAppearance(true)}
                            >
                                Appearance
                            </ListItem>
                        </Grid>
                    </Grid>
                ),
            },
        ],
        dialogData: [
            [
                'Appearance',
                <>
                    <h1>Dark mode: </h1>
                    <h2>Color scheme: </h2>
                </>,
                openAppearance,
                setOpenAppearance,
            ],
        ] as DialogType,
    };
}
