'use client';

import React from 'react';
import Image from 'next/image';
import { Grid, Typography, List, ListItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Landing() {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));

    const getImageWidth = () => {
        if (smDownBreakpoint) return 250;
        if (lgDownBreakpoint) return 500;
        return 1000;
    };

    const getImageHeight = () => {
        if (smDownBreakpoint) return 170;
        if (lgDownBreakpoint) return 341;
        return 682;
    };

    return (
        <Grid container justifyContent='center' direction='column'>
            <Typography variant='h2' align='center' sx={{ fontWeight: 'bold', mb: 2 }}>
                Connecting Classrooms to Congress
            </Typography>
            <Grid item container justifyContent='center' width='100%'>
                <Image
                    priority
                    src='/images/landing1.jpg'
                    alt='Connecting Classrooms to Congress'
                    style={{ objectFit: 'contain' }}
                    width={getImageWidth()}
                    height={getImageHeight()}
                />
            </Grid>
            <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>
                Creating direct, healthy, and informed dialog between the nation’s youth and their representatives.
            </Typography>
            <Typography variant='body1'>
                Connecting Classrooms to Congress employs a technology-enabled experiential approach to deepen civic
                education in the high school social studies curriculum. The capstone experience at the center of our
                curriculum module is an online deliberative town hall that engages students and teachers directly with
                their sitting member of Congress. This powerful, direct, and authentic experience with democracy in
                practice is embedded in a rigorous social studies curricular unit in which high school students study a
                public issue that is of interest to them – and one that policymakers at the national level are grappling
                with – and then discuss the issue first with other students and then with one of those very same
                policymakers.
            </Typography>
            <Grid item container justifyContent='center'>
                <Image
                    src='/images/landing2.jpg'
                    alt='Connecting Classrooms to Congress'
                    style={{ objectFit: 'contain' }}
                    width={getImageWidth()}
                    height={getImageHeight()}
                />
            </Grid>
            <Typography variant='body1'>
                Our approach provides a way to scale engagement with significant public issues – a learning opportunity
                that has been found to promote civic outcomes, but that educators sometimes struggle to provide
                effectively. The program is designed to help students gain knowledge and skills in four key areas:
            </Typography>
            <List sx={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
                <ListItem component={Typography} sx={{ display: 'list-item' }}>
                    Analytic writing: The unit is designed to improve students’ abilities to produce high quality
                    written work tied to a complex issue about which there is disagreement, judged in terms of evidence
                    and argument.
                </ListItem>
                <ListItem component={Typography} sx={{ display: 'list-item' }}>
                    Integrative complexity: Students’ written communication should demonstrate increased understanding
                    of competing aspects and trade-offs regarding how to address an issue and articulate and integrate
                    multiple perspectives and possibilities along with their attendant contingencies.
                </ListItem>
                <ListItem component={Typography} sx={{ display: 'list-item' }}>
                    Knowledge of policy and the structure and operations of government: As students gain a more
                    elaborated understanding of the issue, they should have enhanced knowledge of policy as well as
                    structures and operations of government (i.e., how policy is created and implemented).
                </ListItem>
                <ListItem component={Typography} sx={{ display: 'list-item' }}>
                    Civic dispositions: Participating in effective, real-world deliberation should enhance efficacy,
                    agency, interest, and commitment to vote and more broadly participate in democracy.
                </ListItem>
            </List>
        </Grid>
    );
}
