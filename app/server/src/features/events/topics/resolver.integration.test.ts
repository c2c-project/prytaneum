import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';
import axios from 'axios';

jest.mock('axios');

const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

const userData = {
    id: '5236cd0b-d90b-4af7-b485-5d1ded8db254',
    email: 'topicTest@test.com',
    firstName: 'Topic',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

let testOrgId: string;
let testEventId: string;

beforeAll(async () => {
    (axios.post as jest.Mock).mockResolvedValue({
        data: {
            topics: {
                'MOCKED_TOPIC': 'MOCKED_DESC'
            },
            locked_topics: []
        },
    });

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
    await prisma.eventTopic.deleteMany();
    await prisma.event.deleteMany();
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

describe('topics resolvers', () => {
    let globalEventId: string;

    beforeAll(() => {
        globalEventId = toEventId({ id: testEventId }).id;
    });

    describe('Mutation', () => {
        describe('[addTopic]', () => {
            test('adds topic successfully (manual)', async () => {
                const mutation = `
                    mutation {
                        addTopic(
                            eventId: "${globalEventId}",
                            topic: "Test Topic 1",
                            description: "Description 1",
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

                expect(response.errors).toBeUndefined();
                expect(response.data.addTopic.isError).toBe(false);
                expect(response.data.addTopic.body.topic).toBe('Test Topic 1');
                expect(response.data.addTopic.body.description).toBe('Description 1');
            });
        });

        describe('[updateTopic]', () => {
            test('updates topic successfully (manual)', async () => {
                const mutation = `
                    mutation {
                        updateTopic(
                            eventId: "${globalEventId}",
                            oldTopic: "Test Topic 1",
                            newTopic: "Updated Topic 1",
                            description: "Updated Description 1",
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

                expect(response.errors).toBeUndefined();
                expect(response.data.updateTopic.isError).toBe(false);
                expect(response.data.updateTopic.body.topic).toBe('Updated Topic 1');
                expect(response.data.updateTopic.body.description).toBe('Updated Description 1');
            });
        });
    });

    describe('Query', () => {
        describe('[eventTopics]', () => {
            test('returns list of topics for an event', async () => {
                const query = `
                    query {
                        eventTopics(eventId: "${globalEventId}") {
                            id
                            topic
                            description
                        }
                    }`;
                const response = await testClient.query(query);
                
                expect(response.errors).toBeUndefined();
                expect(response.data.eventTopics).toBeDefined();
                expect(response.data.eventTopics.length).toBeGreaterThan(0);
                
                const updatedTopic = response.data.eventTopics.find((t: any) => t.topic === 'Updated Topic 1');
                expect(updatedTopic).toBeDefined();
                expect(updatedTopic.description).toBe('Updated Description 1');
            });
        });
    });

    describe('Mutation (Delete)', () => {
        describe('[removeTopic]', () => {
            test('removes a topic successfully (manual)', async () => {
                const mutation = `
                    mutation {
                        removeTopic(
                            eventId: "${globalEventId}",
                            topic: "Updated Topic 1",
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

                expect(response.errors).toBeUndefined();
                expect(response.data.removeTopic.isError).toBe(false);
                expect(response.data.removeTopic.body.topic).toBe('Updated Topic 1');
                
                // Verify deletion via query
                const query = `
                    query {
                        eventTopics(eventId: "${globalEventId}") {
                            id
                            topic
                        }
                    }`;
                const verifyResponse = await testClient.query(query);
                const topics = verifyResponse.data.eventTopics;
                const removedTopic = topics.find((t: any) => t.topic === 'Updated Topic 1');
                expect(removedTopic).toBeUndefined();
            });
        });
    });
});
