import * as React from 'react';
import { Grid, Stack } from '@mui/material';

import { Blurb } from '@local/features/landing/Blurb';
import MobileRoleCard from '@local/features/landing/Panels/MobileRoleCard';

export function MobileRoles() {
    const speakerBulletPoints = ['Same experience as a zoom call', 'One on one with speakers'];
    const participantBulletPoints = [
        'Submit questions',
        'Like and quote other participant questions',
        'Provide feedback to moderators',
    ];
    const moderatorBulletPoints = [
        'Manage the question queue by adding, removing and reordering participant questions',
        'Respond to participant feedback',
    ];
    const organizerBulletPoints = ['Create events for an organization', 'Configure event details'];

    return (
        <Grid
            container
            width='100%'
            overflow='hidden'
            alignItems='center'
            justifyContent='center'
            spacing={2}
            margin={0}
            paddingTop={5}
            paddingBottom={5}
            style={{ backgroundColor: '#F5C64F42' }}
        >
            <Grid item>
                <Blurb title='Participate in town hall events using roles' />
            </Grid>

            <Stack spacing={2} width='90%' marginTop={5}>
                <MobileRoleCard
                    title='Speaker'
                    description='Officials who answer the discussion by moderators.'
                    bulletPoints={speakerBulletPoints}
                    button={false}
                />
                <MobileRoleCard
                    title='Participant'
                    description='Residents who engage in discussion on a policy topic.'
                    bulletPoints={participantBulletPoints}
                    button={true}
                />
                <MobileRoleCard
                    title='Moderator'
                    description='Officials that oversee event discussion with the speaker.'
                    bulletPoints={moderatorBulletPoints}
                    button={true}
                />
                <MobileRoleCard
                    title='Organizer'
                    description='Officials that create and set up events on Prytaneum.'
                    bulletPoints={organizerBulletPoints}
                    button={true}
                />
            </Stack>
        </Grid>
    );
}
