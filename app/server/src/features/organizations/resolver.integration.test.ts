import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db253',
    email: 'orgTest@test.com',
    firstName: 'Org',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

beforeAll(async () => {
    const server = getOrCreateServer();
    plugins.attachMercuriusTo(server);
    plugins.attachCookieTo(server);
    const prisma = getPrismaClient(server.log);
    
    await prisma.user.create({
        data: {
            ...userData,
            password: 'hashedPassword',
        },
    });
    await server.ready();
});

afterAll(async () => {
    const server = getOrCreateServer();
    const prisma = getPrismaClient(server.log);
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);
const prisma = getPrismaClient(server.log);

describe('organization resolvers', () => {
    describe('Query', () => {
        describe('[isOrganizer]', () => {
            test('should return false if no cookie', async () => {
                const query = 'query { isOrganizer }';
                const queryResponse = await testClient.query(query);
                expect(queryResponse).toEqual({ data: { isOrganizer: false } });
            });
            test('should return true if user canMakeOrgs', async () => {
                const query = 'query { isOrganizer }';
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const queryResponse = await testClient.query(query);
                expect(queryResponse).toEqual({ data: { isOrganizer: true } });
            });
        });
    });
    describe('Mutation', () => {
        describe('[createOrganization]', () => {
            test('creates org successfully', async () => {
                const mutation = `mutation { createOrganization(input: { name: "Test Org" }) { isError message body { node { name } } } }`;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                expect(response.data.createOrganization.isError).toBe(false);
                expect(response.data.createOrganization.body.node.name).toBe("Test Org");
            });
        });
    });
});
