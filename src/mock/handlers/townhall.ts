import { rest } from 'msw';
import faker from 'faker';
import * as TownhallTypes from 'domains/Townhall/types';
import { makeUsers } from './auth';

const past = faker.date.past();
const future = faker.date.future();

export const makeSpeaker = (): TownhallTypes.Speaker => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    picture: faker.image.imageUrl(),
    title: faker.name.jobTitle(),
    description: faker.lorem.lines(5),
});

export const makeTownhall = (): TownhallTypes.Townhall => ({
    _id: faker.random.alphaNumeric(5),
    form: {
        title: faker.lorem.words(),
        date: faker.date.between(past, future),
        description: faker.lorem.paragraph(5),
        scope: 'district', // FIXME:
        private: false,
        topic: faker.random.word(),
    },
    settings: {
        waitingRoom: {
            enabled: false,
            scheduled: null,
        },
        chat: {
            enabled: false,
            automated: false,
        },
        questionQueue: {
            transparent: false,
            automated: false,
        },
        credits: {
            enabled: false,
            list: [],
        },
        links: {
            enabled: false,
            list: [],
        },
        moderators: {
            list: [],
            primary: '',
        },
        speakers: {
            list: [makeSpeaker()],
        },
        registration: {
            reminders: {
                enabled: true,
                customTimes: [],
            },
            registrants: [],
        },
    },
});

const makeTownHalls = (amount: number): TownhallTypes.Townhall[] => {
    const list = [];
    for (let i = 0; i < amount; i += 1) {
        list.push(makeTownhall());
    }
    return list;
};

export default [
    rest.post('/api/townhalls/create', (req, res, ctx) => {
        const { form } = req.body as {
            form: TownhallTypes.TownhallForm;
        };
        if (form.description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/townhalls/update', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { form, townhallId } = req.body as {
            form: TownhallTypes.TownhallForm;
            townhallId: string;
        };
        if (form.description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.get('/api/townhalls/list', (req, res, ctx) => {
        return res(
            ctx.json({
                list: makeTownHalls(50),
            }),
            ctx.status(200)
        );
    }),

    rest.get('/api/townhalls/:id', (req, res, ctx) => {
        const { id } = req.params as { id: string };
        if (id === '0') {
            return res(
                ctx.json({
                    townhall: null,
                }),
                ctx.status(400)
            );
        }
        return res(
            ctx.json({
                townhall: makeTownhall(),
            }),
            ctx.status(200)
        );
    }),

    rest.post('/api/townhalls/:_id/create-question', (req, res, ctx) => {
        const { id } = req.params as { id: string };
        const { form } = req.body as {
            form: TownhallTypes.TownhallQuestionForm;
        };

        if (form.question === 'fail' || id === '0') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
    rest.get('/api/townhalls/:_id/organizer/mod-info', (req, res, ctx) => {
        const { id } = req.params as { id: string };
        if (id === 'fail') {
            return res(ctx.status(400));
        }
        if (id === 'unauthorized') {
            return res(ctx.status(401));
        }
        return res(ctx.json({ moderators: makeUsers(10) }), ctx.status(200));
    }),
];
