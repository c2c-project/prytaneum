import React from 'react';
import Typography from '@material-ui/core/Typography';

import Team from 'components/Team';
import devTeam from './devTeamMembers';

export default function DevTeam() {
    return (
        <div>
            <Typography variant='h4' align='center' style={{ margin: 20 }}>
                Lab Research Team
            </Typography>
            <Team teamMembers={devTeam} />
        </div>
    );
}
