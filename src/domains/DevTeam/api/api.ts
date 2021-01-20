import axios from 'axios';
import errors from 'utils/errors';
import { Team, TeamMember } from 'types';

export function getDevTeams() {
    return axios.get<{ devTeam: Team[] }>('/api/dev-team/get-teams');
}

export function addMemberToTeam(newMember: TeamMember, teamName: string) {
    if (
        !newMember.description ||
        !newMember.fullName ||
        !newMember.startDate ||
        !newMember.endDate ||
        !newMember.subtitle ||
        !teamName
    ) {
        throw errors.fieldError();
    }

    const body = {
        newMember,
        teamName,
    };
    return axios.post<unknown>('/api/dev-team/add-member', body);
}
