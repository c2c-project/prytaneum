import { rest } from 'msw';

export default [
    rest.post('/api/invite', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get('/api/get-invite-data', (req, res, ctx) => {
        const responseBody = {
            MoC: 'Test MoC',
            topic: 'Test Topic',
            eventDateTime: new Date().toUTCString(),
            constituentScope: 'state',
            region: 'Test Region',
            townhallId: 'Test TownHallID',
        };
        return res(ctx.json(responseBody), ctx.status(200));
    }),
    rest.post('/api/users/login-with-jwt', (req, res, ctx) => {
        const { token } = req.body as { token: string };
        if (!token) return res(ctx.status(400));
        return res(ctx.cookie('jwt', 'not a real jwt'), ctx.status(200));
    }),
    rest.post('/api/invite/validate-jwt', (req, res, ctx) => {
        const { token } = req.body as { token: string };
        if (!token || token === 'invalid') return res(ctx.status(400));
        return res(ctx.status(200));
    }),
];
