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
        // we do nothing with the password for now
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function getRandomInt(max: number) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        return res(
            ctx.status(200),
            ctx.json({
                names: createNames(40),
                hasNext: !(getRandomInt(5) === 2),
            })
        );
    }),
];
