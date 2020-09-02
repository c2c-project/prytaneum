import React from 'react';
import Team from 'components/Team';
import devTeam from './devTeamMembers';

export default function DevTeam() {
    return <Team teamMembers={devTeam} />;
}
