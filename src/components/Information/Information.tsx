import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem } from '@material-ui/core';

import { DialogType } from 'pages/Auth/UserSettings/types';

export default function Information() {
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const [openAboutUs, setOpenAboutUs] = React.useState(false);
    const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
    const [openTOS, setOpenTOS] = React.useState(false);

    const handleChange = (
        e: React.Dispatch<React.SetStateAction<boolean>>,
        b: boolean
    ) => {
        e(b);
    };

    return {
        title: 'About Prytaneum',
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
                            <ListItem
                                button
                                hidden={false}
                                onClick={() =>
                                    handleChange(setOpenFeedback, true)
                                }
                            >
                                Feedback
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() =>
                                    handleChange(setOpenAboutUs, true)
                                }
                            >
                                About Us
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() =>
                                    handleChange(setOpenPrivacyPolicy, true)
                                }
                            >
                                Privacy Policy
                            </ListItem>
                        </Grid>
                        <Grid component='span' item xs={12}>
                            <ListItem
                                button
                                hidden={false}
                                onClick={() => handleChange(setOpenTOS, true)}
                            >
                                Terms of Service
                            </ListItem>
                        </Grid>
                    </Grid>
                ),
            },
        ],
        dialogData: [
            [
                'Feedback',
                <span> hows our driving </span>,
                openFeedback,
                setOpenFeedback,
            ],
            [
                'About Us',
                <span>
                    <h1>this was made somehow by some people</h1>
                </span>,
                openAboutUs,
                setOpenAboutUs,
            ],
            [
                'Privacy Policy',
                <span>
                    <h1>Information is important.</h1>
                </span>,
                openPrivacyPolicy,
                setOpenPrivacyPolicy,
            ],
            [
                'TOS',
                <span>plz no hurt us we no hurt u</span>,
                openTOS,
                setOpenTOS,
            ],
        ] as DialogType,
        hc: handleChange,
    };
}
