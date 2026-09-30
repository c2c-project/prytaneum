import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db256',
    email: 'speakersTest@test.com',
    firstName: 'Speakers',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

let testOrgId: string;
let testEventId: string;
let createdSpeakerId: string;

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
        data: { name: 'Test Org Speakers' },
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
            title: 'Test Event Speakers',
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
    await prisma.eventSpeaker.deleteMany({ where: { eventId: testEventId } });
    await prisma.event.deleteMany({ where: { id: testEventId } });
    await prisma.orgMember.deleteMany({ where: { orgId: testOrgId } });
    await prisma.organization.deleteMany({ where: { id: testOrgId } });
    await prisma.user.deleteMany({ where: { id: userData.id } });
    await prisma.$disconnect();
    await server.close();
});

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);

describe('speakers resolvers', () => {
    describe('Mutation', () => {
        describe('[createSpeaker]', () => {
            test('creates speaker successfully', async () => {
                const mutation = `
                    mutation {
                        createSpeaker(input: {
                            eventId: "${toEventId({ id: testEventId }).id}",
                            name: "Jane Doe",
                            title: "Professor of Political Science",
                            description: "Keynote speaker",
                            pictureUrl: "https://example.com/photo.jpg",
                            email: "janedoe@example.com"
                        }) {
                            isError
                            message
                            body {
                                id
                                name
                                title
                                description
                                email
                            }
                        }
                    }`;
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);

                if (response.data?.createSpeaker?.isError) {
                    console.error('Error creating speaker:', response.data.createSpeaker);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.createSpeaker.isError).toBe(false);
                expect(response.data.createSpeaker.body.name).toBe('Jane Doe');
                expect(response.data.createSpeaker.body.title).toBe('Professor of Political Science');
                expect(response.data.createSpeaker.body.email).toBe('janedoe@example.com');
                createdSpeakerId = response.data.createSpeaker.body.id;
            });
        });

        describe('[updateSpeaker]', () => {
            test('updates speaker successfully', async () => {
                const mutation = `
                    mutation {
                        updateSpeaker(input: {
                            id: "${createdSpeakerId}",
                            eventId: "${toEventId({ id: testEventId }).id}",
                            name: "Dr. Jane Doe",
                            title: "Distinguished Professor",
                            description: "Updated keynote speaker",
                            pictureUrl: "https://example.com/photo2.jpg",
                            email: "janedoe@example.com"
                        }) {
                            isError
                            message
                            body {
                                id
                                name
                                title
                                description
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.updateSpeaker?.isError) {
                    console.error('Error updating speaker:', response.data.updateSpeaker);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.updateSpeaker.isError).toBe(false);
                expect(response.data.updateSpeaker.body.name).toBe('Dr. Jane Doe');
                expect(response.data.updateSpeaker.body.title).toBe('Distinguished Professor');
            });
        });

        describe('[deleteSpeaker]', () => {
            test('deletes speaker successfully', async () => {
                const mutation = `
                    mutation {
                        deleteSpeaker(input: {
                            id: "${createdSpeakerId}",
                            eventId: "${toEventId({ id: testEventId }).id}"
                        }) {
                            isError
                            message
                            body {
                                id
                            }
                        }
                    }`;
                const response = await testClient.query(mutation);

                if (response.data?.deleteSpeaker?.isError) {
                    console.error('Error deleting speaker:', response.data.deleteSpeaker);
                    console.error('Response errors:', response.errors);
                }

                expect(response.data.deleteSpeaker.isError).toBe(false);
            });
        });
    });
});
