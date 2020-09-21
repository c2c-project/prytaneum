import { rest } from 'msw';
import faker from 'faker';
import * as TownhallTypes from 'domains/Townhall/types';

const recent = faker.date.recent();
const future = faker.date.future();

const makeTownhall = (): TownhallTypes.Townhall => ({
    _id: faker.random.alphaNumeric(5),
    form: {
        speaker: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            party: faker.company.companyName(),
            territory: 'CA-41',
        },
        moderator: `${faker.name.firstName()} ${faker.name.lastName()}`,
        topic: faker.random.word(),
        picture: faker.image.imageUrl(),
        readingMaterials: '',
        date: faker.date.between(recent, future),
        url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        description: faker.lorem.paragraph(),
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
];
