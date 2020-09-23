import { rest } from 'msw';
import faker from 'faker';

const createNames = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
        list.push(faker.name.firstName());
    }
    return list;
};

export default [
    rest.get('/api/mock/get-names', (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        const limit = req.url.searchParams.get('limit');
        if (!limit || !page) {
            return res(ctx.status(400));
        }

        function getRandomInt(max: number) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        return res(
            ctx.status(200),
            ctx.json({
                names: createNames(parseInt(limit, 10)),
                hasNext: !(getRandomInt(5) === 2),
            })
        );
    }),
];
