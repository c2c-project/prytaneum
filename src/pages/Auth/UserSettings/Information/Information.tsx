import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem } from '@material-ui/core';

export const [openFeedback, setOpenFeedback] = React.useState(false);
export const [openAboutUs, setOpenAboutUs] = React.useState(false);
export const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
export const [openTOS, setOpenTOS] = React.useState(false);

export function InformationState() : [string, JSX.Element, boolean, React.Dispatch<React.SetStateAction<boolean>>][] {
    return [
        [
            'Feedback',
            <span>hows our driving</span>,
            openFeedback,
            setOpenFeedback,
        ],
        [
            'About Us',
            <span>
                <h1>This was made somehow by some people.</h1>
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
            <span>plz no hurt us we no hurt u -- Carolyn</span>,
            openTOS,
            setOpenTOS,
        ],
    ];
}

export const Information = {
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
                            onClick={() => setOpenFeedback(true)}
                        >
                            Feedback
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenAboutUs(true)}
                        >
                            About Us
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenPrivacyPolicy(true)}
                        >
                            Privacy Policy
                        </ListItem>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <ListItem
                            button
                            hidden={false}
                            onClick={() => setOpenTOS(true)}
                        >
                            Terms of Service
                        </ListItem>
                    </Grid>
                </Grid>
            ),
        },
    ],
};
