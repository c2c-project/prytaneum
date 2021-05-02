import { rest } from 'msw';
import { TeamMember } from 'types';
import devTeam, { addTeamMember } from 'domains/DevTeam/devTeamData.mock';

export default [
    rest.get('/api/dev-team/get-teams', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                devTeam: devTeam(),
            })
        );
    }),
    rest.post('/api/dev-team/add-member', (req, res, ctx) => {
        const { newMember, teamName } = req.body as {
            newMember: TeamMember;
            teamName: string;
        };
        if (!newMember || !teamName) {
            return res(ctx.status(400));
        }
        addTeamMember(newMember, teamName);
        return res(ctx.status(200));
    }),
];
