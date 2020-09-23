import { rest } from 'msw';
import { devTeam } from './devTeam.json';

export default [
    rest.get('/api/dev-team/get-teams', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                devTeam,
            })
        );
    }),
];
