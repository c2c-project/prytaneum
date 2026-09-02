import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db254',
    email: 'eventTest@test.com',
    firstName: 'Event',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

let testOrgId: string;

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

    const org = await prisma.organization.create({
        data: { name: 'Test Org' }
    });
    testOrgId = org.id;

    await prisma.orgMember.create({
        data: {
            userId: userData.id,
            orgId: testOrgId,
        }
    });

    await server.ready();
});

afterAll(async () => {
    const server = getOrCreateServer();
    const prisma = getPrismaClient(server.log);
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

const toOrgId = toGlobalId('Organization');

describe('event resolvers', () => {
    describe('Query', () => {
        describe('[events]', () => {
            test('should return list of events', async () => {
                const query = 'query { events { id title } }';
                const queryResponse = await testClient.query(query);
                expect(queryResponse.data.events).toBeDefined();
            });
        });
    });
    describe('Mutation', () => {
        describe('[createEvent]', () => {
            test('creates event successfully', async () => {
                const mutation = `
                    mutation {
                        createEvent(event: {
                            title: "New Event",
                            startDateTime: ${new Date().getTime()},
                            endDateTime: ${new Date(Date.now() + 100000).getTime()},
                            description: "Test Desc",
                            topic: "Test Topic",
                            orgId: "${toOrgId({ id: testOrgId }).id}"
                        }) {
                            isError
                            message
                            body { title }
                        }
                    }`;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                if (response.data.createEvent.isError) {
                    console.log('Error creating event:', response.data.createEvent);
                    console.log('Response errors:', response.errors);
                }
                expect(response.data.createEvent.isError).toBe(false);
                expect(response.data.createEvent.body.title).toBe("New Event");
            });
        });
    });
});
