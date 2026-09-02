import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

const userData = {
    id: 'f9b3b4a2-930b-4d74-8b65-d0505b22c2a1',
    email: 'organizer@test.com',
    firstName: 'Speaker',
    lastName: 'Test',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: true,
};

const existingUserData = {
    id: 'b6f4c3a2-1111-4d74-8b65-d0505b22c2a2',
    email: 'existinguser@test.com',
    firstName: 'Existing',
    lastName: 'User',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: false,
};

let testOrgId: string;
let testEventId: string;
let createdSpeakerId: string;

beforeAll(async () => {
    const server = getOrCreateServer();
    plugins.attachMercuriusTo(server);
    plugins.attachCookieTo(server);
    const prisma = getPrismaClient(server.log);

    // Create organizer user
    await prisma.user.create({
        data: {
            ...userData,
            password: 'hashedPassword',
        },
    });

    // Create existing user for linking test
    await prisma.user.create({
        data: {
            ...existingUserData,
            password: 'hashedPassword',
        },
    });

    // Create org
    const org = await prisma.organization.create({
        data: { name: 'Test Speaker Org' }
    });
    testOrgId = org.id;

    // Make organizer a member
    await prisma.orgMember.create({
        data: {
            userId: userData.id,
            orgId: testOrgId,
        }
    });

    // Create event
    const event = await prisma.event.create({
        data: {
            title: 'Test Event',
            startDateTime: new Date(),
            endDateTime: new Date(Date.now() + 100000),
            description: 'Test Event Desc',
            topic: 'Test Topic',
            orgId: testOrgId,
            createdById: userData.id,
            isActive: true,
            isQuestionFeedVisible: true,
            isCollectRatingsEnabled: true,
            isForumEnabled: true,
            isPrivate: false,
        }
    });
    testEventId = event.id;

    await server.ready();
});

afterAll(async () => {
    const server = getOrCreateServer();
    const prisma = getPrismaClient(server.log);
    await prisma.eventSpeaker.deleteMany();
    await prisma.event.deleteMany();
    await prisma.orgMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

describe('Speaker resolvers', () => {
    let testClient: any;
    let token: string;
    
    beforeAll(async () => {
        const server = getOrCreateServer();
        testClient = createMercuriusTestClient(server);
        const user = toUserId(userData);
        token = await jwt.sign({ id: user.id });
    });

    describe('Mutation', () => {
        describe('[createSpeaker]', () => {
            test('creates speaker successfully (new email)', async () => {
                const mutation = `
                    mutation {
                        createSpeaker(input: {
                            eventId: "${toEventId({ id: testEventId }).id}",
                            name: "New Speaker",
                            title: "Dr.",
                            description: "Awesome speaker",
                            pictureUrl: "http://example.com/pic.png",
                            email: "newemail@test.com"
                        }) {
                            isError
                            message
                            body {
                                id
                                name
                                email
                                user {
                                    id
                                    email
                                }
                            }
                        }
                    }`;
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                expect(response.data.createSpeaker.isError).toBe(false);
                expect(response.data.createSpeaker.body.name).toBe("New Speaker");
                expect(response.data.createSpeaker.body.email).toBe("newemail@test.com");
                expect(response.data.createSpeaker.body.user).not.toBeNull();
                expect(response.data.createSpeaker.body.user.email).toBe("newemail@test.com");
                createdSpeakerId = response.data.createSpeaker.body.id;
            });

            test('creates speaker successfully and links to existing user', async () => {
                const mutation = `
                    mutation {
                        createSpeaker(input: {
                            eventId: "${toEventId({ id: testEventId }).id}",
                            name: "Existing Speaker",
                            title: "Mr.",
                            description: "Existing speaker",
                            pictureUrl: "http://example.com/pic2.png",
                            email: "${existingUserData.email}"
                        }) {
                            isError
                            message
                            body {
                                id
                                name
                                email
                                user {
                                    id
                                    email
                                }
                            }
                        }
                    }`;
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                expect(response.data.createSpeaker.isError).toBe(false);
                expect(response.data.createSpeaker.body.email).toBe(existingUserData.email);
                expect(response.data.createSpeaker.body.user).not.toBeNull();
                expect(response.data.createSpeaker.body.user.id).toBe(existingUserData.id);
            });
        });

        describe('[updateSpeaker]', () => {
            test('updates speaker successfully', async () => {
                const mutation = `
                    mutation {
                        updateSpeaker(input: {
                            eventId: "${toEventId({ id: testEventId }).id}",
                            id: "${createdSpeakerId}",
                            name: "Updated Speaker Name"
                        }) {
                            isError
                            message
                            body {
                                id
                                name
                            }
                        }
                    }`;
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                expect(response.data.updateSpeaker.isError).toBe(false);
                expect(response.data.updateSpeaker.body.name).toBe("Updated Speaker Name");
            });
        });

        describe('[deleteSpeaker]', () => {
            test('deletes speaker successfully', async () => {
                const mutation = `
                    mutation {
                        deleteSpeaker(input: {
                            eventId: "${toEventId({ id: testEventId }).id}",
                            id: "${createdSpeakerId}"
                        }) {
                            isError
                            message
                            body {
                                id
                            }
                        }
                    }`;
                testClient.setCookies({ jwt: token });
                const response = await testClient.query(mutation);
                expect(response.data.deleteSpeaker.isError).toBe(false);
                expect(response.data.deleteSpeaker.body.id).toBe(createdSpeakerId);
            });
        });
    });
});
