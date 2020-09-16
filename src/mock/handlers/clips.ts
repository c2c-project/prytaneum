import { rest } from 'msw';
import faker from 'faker';

const makeNewClip = () => ({
    timeStamp: faker.random.number(100),
    duration: faker.random.number(100),
    title: faker.random.words(),
    user: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.random.words(),
});

export default [
    rest.get('/api/townhalls/:townhallId/clip/:clipId', (req, res, ctx) => {
        const { townhallId, clipId } = req.params as {
            townhallId: string;
            clipId: string;
        };
        if (townhallId === '0' || clipId === '0') return res(ctx.status(400));
        return res(
            ctx.json({
                clip: makeNewClip(),
            }),
            ctx.status(200)
        );
    }),
];
