import { rest } from 'msw';
import { InviteForm } from '../../domains/Invite/types';

export default [
    rest.post('/api/invite', (req, res, ctx) => {
        console.log(req);
        // const {
        //     MoC,
        //     topic,
        //     eventDateTime,
        //     region,
        //     deliveryTime,
        // } = req.body as InviteForm;
        // if (
        //     MoC === undefined ||
        //     topic === undefined ||
        //     eventDateTime === undefined ||
        //     region === undefined ||
        //     deliveryTime === undefined
        // ) {
        //     console.log(MoC, topic, eventDateTime, region, deliveryTime);
        //     return res(ctx.status(400));
        // }
        return res(ctx.status(200));
    }),
    rest.get('/api/get-invite-data', (req, res, ctx) => {
        const responseBody = {
            MoC: 'Test MoC',
            topic: 'Test Topic',
            eventDateTime: new Date().toUTCString(),
            constituentScope: 'state',
            region: 'Test Region',
            townHallID: 'Test TownHallID',
        };
        return res(ctx.json(responseBody), ctx.status(200));
    }),
    rest.post('api/users/login-with-jwt', (req, res, ctx) => {
        const { token } = req.body as { token: string };
        if (!token) return res(ctx.status(400));
        return res(ctx.cookie('jwt', 'not a real jwt'), ctx.status(200));
    }),
];
