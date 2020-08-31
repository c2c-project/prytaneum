import { rest } from 'msw';
import { InviteForm } from '../../domains/Invite/types';

export default [
    rest.post('/api/invite', (req, res, ctx) => {
        const {
            MoC,
            topic,
            eventDateTime,
            region,
            deliveryTime,
        } = req.body as InviteForm;
        if (
            MoC === undefined ||
            topic === undefined ||
            eventDateTime === undefined ||
            region === undefined ||
            deliveryTime === undefined
        ) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
    rest.post('/api/account/is-registered', (req, res, ctx) => {
        const { email } = req.body as { email: string };
        switch (email) {
            case 'fail':
                return res(ctx.status(400));
            case 'false':
                return res(ctx.body(false), ctx.status(200));
            default:
                return res(ctx.body(true), ctx.status(200));
        }
    }),
    rest.get('/api/get-invite-data', (req, res, ctx) => {
        const responseBody = {
            MoC: 'Test MoC',
            topic: 'Test Topic',
            region: 'Test Region',
            constituentScope: 'state',
        };
        return res(ctx.body(responseBody), ctx.status(200));
    }),
    rest.post('api/users/login-with-jwt', (req, res, ctx) => {
        const { token } = req.body as { token: string };
        if (!token) return res(ctx.status(400));
        return res(ctx.cookie('jwt', 'not a real jwt'), ctx.status(200));
    }),
];
