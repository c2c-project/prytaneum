import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db255',
    email: 'topicsTest@test.com',
    firstName: 'Topics',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

let testOrgId: string;
let testEventId: string;

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
        data: { name: 'Test Org Topics' },
    });
    testOrgId = org.id;

    await prisma.orgMember.create({
        data: {
            userId: userData.id,
            orgId: testOrgId,
        },
    });

    const event = await prisma.event.create({
        data: {
            title: 'Test Event Topics',
            startDateTime: new Date(),
            endDateTime: new Date(Date.now() + 100000),
            description: 'Test Desc',
            topic: 'Test Topic',
            orgId: testOrgId,
            createdById: userData.id,
            isActive: true,
            isQuestionFeedVisible: true,
            isCollectRatingsEnabled: true,
            isForumEnabled: true,
            isPrivate: false,
        },
    });
    testEventId = event.id;

    await server.ready();
});

afterAll(async () => {
    const server = getOrCreateServer();
    const prisma = getPrismaClient(server.log);
    await prisma.eventTopic.deleteMany({ where: { eventId: testEventId } });
    await prisma.event.deleteMany({ where: { id: testEventId } });
    await prisma.orgMember.deleteMany({ where: { orgId: testOrgId } });
    await prisma.organization.deleteMany({ where: { id: testOrgId } });
    await prisma.user.deleteMany({ where: { id: userData.id } });
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

describe('topics resolvers', () => {
    describe('Mutation', () => {
        describe('[addTopic]', () => {
            test('adds a topic successfully', async () => {
                const mutation = `
                    mutation {
                        addTopic(
                            eventId: "${toEventId({ id: testEventId }).id}",
                            topic: "Climate Policy",
                            description: "Discussions on climate change policies.",
                            manual: true
                        ) {
                            isError
                            message
                            body {
                                topic
                                description
                            }
                        }
                    }`;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);

                if (response.data?.addTopic?.isError) {
                    console.error('Error adding topic:', response.data.addTopic);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.addTopic.isError).toBe(false);
                expect(response.data.addTopic.body.topic).toBe('Climate Policy');
                expect(response.data.addTopic.body.description).toBe('Discussions on climate change policies.');
            });
        });

        describe('[updateTopic]', () => {
            test('updates a topic successfully', async () => {
                const mutation = `
                    mutation {
                        updateTopic(
                            eventId: "${toEventId({ id: testEventId }).id}",
                            oldTopic: "Climate Policy",
                            newTopic: "Global Climate Policy",
                            description: "Updated description.",
                            manual: true
                        ) {
                            isError
                            message
                            body {
                                topic
                                description
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.updateTopic?.isError) {
                    console.error('Error updating topic:', response.data.updateTopic);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.updateTopic.isError).toBe(false);
                expect(response.data.updateTopic.body.topic).toBe('Global Climate Policy');
                expect(response.data.updateTopic.body.description).toBe('Updated description.');
            });
        });
    });

    describe('Query', () => {
        describe('[eventTopics]', () => {
            test('returns list of topics for an event', async () => {
                const query = `
                    query {
                        eventTopics(eventId: "${toEventId({ id: testEventId }).id}") {
                            id
                            topic
                            description
                        }
                    }`;
                const response = await testClient.query(query);

                expect(response.errors).toBeUndefined();
                expect(response.data.eventTopics).toBeDefined();
                expect(response.data.eventTopics.length).toBeGreaterThan(0);
                expect(response.data.eventTopics[0].topic).toBe('Global Climate Policy');
            });
        });
    });

    describe('Mutation (Remove)', () => {
        describe('[removeTopic]', () => {
            test('removes a topic successfully', async () => {
                const mutation = `
                    mutation {
                        removeTopic(
                            eventId: "${toEventId({ id: testEventId }).id}",
                            topic: "Global Climate Policy",
                            manual: true
                        ) {
                            isError
                            message
                            body {
                                topic
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.removeTopic?.isError) {
                    console.error('Error removing topic:', response.data.removeTopic);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.removeTopic.isError).toBe(false);
                expect(response.data.removeTopic.body.topic).toBe('Global Climate Policy');
            });
        });
    });

    describe('Mutation (Finalize)', () => {
        describe('[finalizeTopics]', () => {
            test('finalizes a list of topics successfully', async () => {
                const mutation = `
                    mutation {
                        finalizeTopics(
                            eventId: "${toEventId({ id: testEventId }).id}",
                            topics: ["Economy", "Education"],
                            descriptions: ["Economic plans", "Education reform"]
                        ) {
                            isError
                            message
                            body {
                                topic
                                description
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.finalizeTopics?.isError) {
                    console.error('Error finalizing topics:', response.data.finalizeTopics);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.finalizeTopics.isError).toBe(false);
                expect(response.data.finalizeTopics.body.length).toBe(2);
                expect(response.data.finalizeTopics.body[0].topic).toBe('Economy');
                expect(response.data.finalizeTopics.body[1].topic).toBe('Education');
            });
        });
    });
});
