import { rest } from 'msw';
import faker from 'faker';
import { makeUser } from 'prytaneum-typings';
import * as AdminDashboardTypes from 'domains/Admin/types';
import { makeUsers } from './auth';

const recent = faker.date.recent();
const future = faker.date.future();

// export const makeUser = (): AdminDashboardTypes.UserProfile => {
//     const iterationsActions = 10;
//     const statusType = [
//         'Admin',
//         'Moderator',
//         'Organizer',
//         'Attended',
//         'Banned',
//     ];
//     const userActionHistory: AdminDashboardTypes.UserActionHistory[] = [];

//     for (let i = 0; i < iterationsActions; i += 1) {
//         userActionHistory.push({
//             timeStamp: faker.date.between(recent, future),
//             action: faker.random.words(3),
//         });
//     }

//     return {
//         _id: faker.random.alphaNumeric(10),
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         timeStamp: faker.date.between(recent, future),
//         status: statusType.map((s) => {
//             return {
//                 role: s,
//                 count: faker.random.number(),
//                 active: faker.random.boolean(),
//             };
//         }),
//         actionHistoryData: userActionHistory,
//     };
// };

// export const makeUsers = (num?: number): AdminDashboardTypes.UserProfile[] => {
//     const iterations = num || 1;
//     const users: AdminDashboardTypes.UserProfile[] = [];

//     for (let i = 0; i < iterations; i += 1) {
//         users.push(makeUser());
//     }

//     return users;
// };

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
        const { form, id } = req.body as {
            form: AdminDashboardTypes.UserProfile;
            id: string;
        };

        if (!_id) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
];
