import { rest } from 'msw';
// Apparently fs module does not come with React, so I can't use to mack adding a new member to the json file (https://stackoverflow.com/questions/35003961/react-js-require-fs)
// import fs from 'fs';
// import { promisify } from 'util';

// import { Team, TeamMember } from 'types';
import devTeamFile from './devTeam.json';

// const writeFilePromise = promisify(fs.writeFile);

export default [
    rest.get('/api/dev-team/get-teams', (req, res, ctx) => {
        const { devTeam } = devTeamFile;
        return res(
            ctx.status(200),
            ctx.json({
                devTeam,
            })
        );
    }),
    // rest.post('/api/dev-team/add-member', async (req, res, ctx) => {
    //     const { newMember, teamName } = req.body as {
    //         newMember: TeamMember;
    //         teamName: string;
    //     };

    //     const { devTeam } = devTeamFile as { devTeam: Team[] };

    //     if (!newMember || !teamName) {
    //         return res(ctx.status(400));
    //     }

    //     const teamIndex = devTeam.findIndex(
    //         (subTeam) => subTeam.name === teamName
    //     );

    //     if (teamIndex === -1) {
    //         // teamName was not found in the .json file
    //         return res(ctx.status(400));
    //     }

    //     try {
    //         devTeam[teamIndex].members.push(newMember);
    //         const newDevTeamJson = JSON.stringify(devTeam);
    //         await writeFilePromise('./devTeam.json', newDevTeamJson, 'utf8');
    //         return res(ctx.status(200));
    //     } catch (error) {
    //         console.log(error);
    //         return res(ctx.status(400));
    //     }
    // }),
];
