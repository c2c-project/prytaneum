import { rest } from 'msw';
import { makeUser } from 'prytaneum-typings';
import * as AdminDashboardTypes from '@local/domains/Admin/types';
import { makeUsers } from './auth';

export default [
    rest.get('/api/users/list', (req, res, ctx) => {
        return res(
            ctx.json({
                list: makeUsers(50),
            }),
            ctx.status(200)
        );
    }),

    rest.get('/api/users/:_id', (req, res, ctx) => {
        const { _id } = req.params as { _id: string };
        if (_id === '0') {
            return res(
                ctx.json({
                    user: null,
                }),
                ctx.status(400)
            );
        }
        return res(
            ctx.json({
                user: makeUser(),
            }),
            ctx.status(200)
        );
    }),

    rest.post('/api/users/:_id/update', (req, res, ctx) => {
        const { _id } = req.params as { _id: string };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { form, id } = req.body as {
            form: AdminDashboardTypes.UserProfile;
            id: string;
        };

        if (!_id) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
    rest.post('/api/users/invite', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ token: 'test-jwt-not-real-please-do-not-use' })
        );
    }),
];
