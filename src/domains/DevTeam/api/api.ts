import axios from 'axios';
import errors from 'utils/errors';
import { Team, TeamMember } from 'types';

export function getDevTeams() {
    return axios.get<{ devTeam: Team[] }>('/api/dev-team/get-teams');
}

export function addMemberToTeam(newMember: TeamMember, team: string) {
    if (
        !newMember.description ||
        !newMember.fullName ||
        !newMember.startDate ||
        !newMember.endDate ||
        !newMember.subtitle ||
        !team
    ) {
        throw errors.fieldError();
    }

    const body = {
        teamMember: newMember,
        team,
    };
    return axios.post<unknown>('/api/dev-team/add-member', body);
}
