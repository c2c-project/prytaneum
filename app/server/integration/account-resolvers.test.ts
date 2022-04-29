import bcrypt from 'bcryptjs';
import { getOrCreateServer } from '../src/core/server';
import { getPrismaClient } from '../src/core/utils';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import * as plugins from '../src/core/plugins';
import { redisEmitter } from '../src/core/plugins/mercurius';
import * as jwt from '../src/lib/jwt';
import faker from '@faker-js/faker';
import { toGlobalId } from '../src/features/utils';

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);
const prisma = getPrismaClient(server.log);

const toUserId = toGlobalId('User');
const userData = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id: faker.datatype.uuid(),
    password: faker.internet.password(),
    preferredLang: 'EN',
};

beforeAll(async () => {
    plugins.attachCookieTo(server);
    plugins.attachMercuriusTo(server);

    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    await prisma.user.create({
        data: {
            ...userData,
            password: encryptedPassword,
        },
    });

    console.log('Created test user');
});

afterAll(async () => {
    await prisma.user.delete({
        where: {
            id: userData.id,
        },
    });

    await prisma.$disconnect();

    console.log('Deleted test user');
    redisEmitter.close(() => {});
    await server.close();
});

describe('Account resolvers', () => {
    test('me query with no cookie should return null', async () => {
        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: null });
    });
    test('me query with non-existing account cookie should return null', async () => {
        const token = await jwt.sign({ id: '' });
        testClient.setCookies({ jwt: token });

        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: null });
    });
    test('me query with existing account cookie should return user id', async () => {
        const user = toUserId(userData);
        const token = await jwt.sign({ id: user.id });
        testClient.setCookies({ jwt: token });

        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: { id: user.id } });
    });
});
