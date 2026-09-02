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
const toQuestionId = toGlobalId('EventQuestion');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db254',
    email: 'questionTest@test.com',
    firstName: 'Question',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

let testOrgId: string;
let testEventId: string;
let createdQuestionId: string;

beforeAll(async () => {
    (axios.post as jest.Mock).mockResolvedValue({
        data: {
            question_en: 'Test question?',
            question_es: '¿Pregunta de prueba?',
            original_lang: 'en',
            substantive: true,
            offensive: false,
            relevant: true,
            topics: {},
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
        data: { name: 'Test Org Questions' },
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
            title: 'Test Event Questions',
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
    await prisma.eventQuestion.deleteMany();
    await prisma.event.deleteMany();
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

describe('questions resolvers', () => {
    describe('Mutation', () => {
        describe('[createQuestion]', () => {
            test('creates question successfully', async () => {
                const mutation = `
                    mutation {
                        createQuestion(input: {
                            question: "Test question?",
                            eventId: "${toEventId({ id: testEventId }).id}"
                        }) {
                            isError
                            message
                            body {
                                node {
                                    id
                                    question
                                }
                            }
                        }
                    }`;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);

                if (response.data?.createQuestion?.isError) {
                    console.error('Error creating question:', response.data.createQuestion);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.createQuestion.isError).toBe(false);
                expect(response.data.createQuestion.body.node.question).toBe('Test question?');
                createdQuestionId = response.data.createQuestion.body.node.id;
            });
        });

        describe('[alterLike]', () => {
            test('likes a question successfully', async () => {
                const mutation = `
                    mutation {
                        alterLike(input: {
                            questionId: "${createdQuestionId}",
                            to: true
                        }) {
                            isError
                            message
                            body {
                                node {
                                    id
                                    isLikedByViewer
                                    likedByCount
                                }
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.alterLike?.isError) {
                    console.error('Error altering like:', response.data.alterLike);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.alterLike.isError).toBe(false);
                expect(response.data.alterLike.body.node.isLikedByViewer).toBe(true);
            });
        });
    });

    describe('Query', () => {
        describe('[questionsByEventId]', () => {
            test('returns list of questions for an event', async () => {
                const query = `
                    query {
                        questionsByEventId(eventId: "${toEventId({ id: testEventId }).id}") {
                            id
                            question
                        }
                    }`;
                const response = await testClient.query(query);
                
                expect(response.errors).toBeUndefined();
                expect(response.data.questionsByEventId).toBeDefined();
                expect(response.data.questionsByEventId.length).toBeGreaterThan(0);
                expect(response.data.questionsByEventId[0].question).toBe('Test question?');
            });
        });
    });

    describe('Mutation (Delete)', () => {
        describe('[deleteQuestion]', () => {
            test('deletes a question successfully', async () => {
                const mutation = `
                    mutation {
                        deleteQuestion(input: {
                            questionId: "${createdQuestionId}",
                            isVisible: false
                        }) {
                            isError
                            message
                            body {
                                node {
                                    id
                                    isVisible
                                }
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.deleteQuestion?.isError) {
                    console.error('Error deleting question:', response.data.deleteQuestion);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.deleteQuestion.isError).toBe(false);
                expect(response.data.deleteQuestion.body.node.isVisible).toBe(false);
            });
        });
    });
});
