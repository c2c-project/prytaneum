import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');
const toQuestionId = toGlobalId('EventQuestion');

const userData = {
    id: 'f9d14f44-9343-4e4b-97d8-04313f8d2ccb',
    email: 'modtest1@test.com',
    firstName: 'Mod',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

const modData = {
    id: '27a5d3f4-3151-4e6a-bd44-245f7c3272e6',
    email: 'modtest2@test.com',
    firstName: 'Mod2',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: false,
};

let testOrgId: string;
let testEventId: string;
let testQuestionId: string;

beforeAll(async () => {
    const server = getOrCreateServer();
    plugins.attachMercuriusTo(server);
    plugins.attachCookieTo(server);
    const prisma = getPrismaClient(server.log);
    
    // Clean up first just in case
    await prisma.eventQuestion.deleteMany();
    await prisma.eventModerator.deleteMany();
    await prisma.event.deleteMany();
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            ...userData,
            password: 'hashedPassword',
        },
    });

    await prisma.user.create({
        data: {
            ...modData,
            password: 'hashedPassword',
        },
    });

    const org = await prisma.organization.create({
        data: { name: 'Mod Test Org' }
    });
    testOrgId = org.id;

    await prisma.orgMember.create({
        data: {
            userId: userData.id,
            orgId: testOrgId,
        }
    });

    const event = await prisma.event.create({
        data: {
            title: 'Mod Test Event',
            startDateTime: new Date(),
            endDateTime: new Date(Date.now() + 100000),
            description: 'Test Desc',
            topic: 'Test Topic',
            orgId: testOrgId,
            isActive: true,
            createdById: userData.id,
            isQuestionFeedVisible: true,
            isCollectRatingsEnabled: true,
            isForumEnabled: true,
            isPrivate: false,
        }
    });
    testEventId = event.id;

    // Create moderator role for the first user
    await prisma.eventModerator.create({
        data: {
            userId: userData.id,
            eventId: testEventId,
        }
    });

    const question = await prisma.eventQuestion.create({
        data: {
            question: 'What is life?',
            eventId: testEventId,
            createdById: userData.id,
            position: "0",
            isVisible: true,
            isAsked: false,
            lang: "EN",
            isFollowUp: false,
            isQuote: false,
        }
    });
    testQuestionId = question.id;

    await server.ready();
});

afterAll(async () => {
    const server = getOrCreateServer();
    const prisma = getPrismaClient(server.log);
    await prisma.eventQuestion.deleteMany();
    await prisma.eventModerator.deleteMany();
    await prisma.event.deleteMany();
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

describe('moderation resolvers', () => {
    describe('Mutation', () => {
        describe('hideQuestion', () => {
            test('successfully hides a question', async () => {
                const mutation = `
                    mutation {
                        hideQuestion(input: {
                            questionId: "${toQuestionId({ id: testQuestionId }).id}",
                            eventId: "${toEventId({ id: testEventId }).id}",
                            toggleTo: false
                        }) {
                            id
                        }
                    }
                `;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                if (response.errors) {
                    console.error(response.errors);
                }
                expect(response.errors).toBeUndefined();
                expect(response.data?.hideQuestion).toBeDefined();
            });
        });

        describe('updateQuestionPosition', () => {
            test('successfully updates a question position', async () => {
                const mutation = `
                    mutation {
                        updateQuestionPosition(input: {
                            questionId: "${toQuestionId({ id: testQuestionId }).id}",
                            eventId: "${toEventId({ id: testEventId }).id}",
                            position: "100"
                        }) {
                            body {
                                node {
                                    id
                                }
                            }
                        }
                    }
                `;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                if (response.errors) {
                    console.error(response.errors);
                }
                expect(response.errors).toBeUndefined();
                expect(response.data?.updateQuestionPosition?.body?.node).toBeDefined();
            });
        });

        describe('createModerator', () => {
            test('successfully creates a moderator', async () => {
                const mutation = `
                    mutation {
                        createModerator(input: {
                            email: "${modData.email}",
                            eventId: "${toEventId({ id: testEventId }).id}"
                        }) {
                            isError
                            message
                            body {
                                id
                            }
                        }
                    }
                `;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                if (response.errors) {
                    console.error(response.errors);
                }
                expect(response.errors).toBeUndefined();
                expect(response.data?.createModerator?.isError).toBe(false);
                expect(response.data?.createModerator?.body?.id).toBeDefined();
            });
        });
    });
});
