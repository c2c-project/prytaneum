import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Team from 'components/Team';
import devTeam from './devTeamMembers';

export default function DevTeam() {
    return (
        <Grid container spacing={5}>
            <Grid container item direction='row' justify='center'>
                <Typography variant='h4' align='center'>
                    Lab Research Team
                </Typography>
            </Grid>
            {devTeam.map((subTeam, index) => (
                <Grid item key={index}>
                    <Divider style={{ marginBottom: 30 }} />
                    <Team
                        teamName={subTeam.teamName}
                        teamMembers={subTeam.teamMembers}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
