import bcrypt from 'bcryptjs';
import { createMercuriusTestClient } from 'mercurius-integration-testing';

import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '@local/features/utils';

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
    email: 'sallySmith@test.com',
    firstName: 'Sally',
    lastName: 'Smith',
    password: 'testPassword',
    preferredLang: 'EN',
    isAdmin: false,
    canMakeOrgs: false,
};

beforeAll(async () => {
    const server = getOrCreateServer();
    // Attach relevant plugins
    plugins.attachMercuriusTo(server);
    plugins.attachCookieTo(server);
    const prisma = getPrismaClient(server.log);
    // hash password as they are never stored in plaintext on the DB
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    // Add user to test DB
    await prisma.user.create({
        data: {
            ...userData,
            password: encryptedPassword,
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

describe('account resolvers', () => {
    describe('Query', () => {
        describe('[me]', () => {
            test('[me] query with no cookie should return null', async () => {
                // Arrange
                const query = 'query { me { id } }';

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: null } };
                expect(queryResponse).toEqual(expectedResponse);
            });
            test('[me] query with non-existing account cookie should return null', async () => {
                // Arrange
                const query = 'query { me { id } }';
                const token = await jwt.sign({ id: '' });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: null } };
                expect(queryResponse).toEqual(expectedResponse);
            });
            test('[me] query with existing account cookie should return user id', async () => {
                // Arrange
                const query = 'query { me { id } }';
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: { id: user.id } } };
                expect(queryResponse).toEqual(expectedResponse);
            });
        });
    });
    describe('User', () => {
        describe('organizations', () => {
            test('should return empty list of edges when user has no organizations', async () => {
                // Arrange
                const query = 'query { me { organizations { edges { node { name } } } } }';
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: { organizations: { edges: [] } } } };
                expect(queryResponse).toEqual(expectedResponse);
            });

            describe('user with organizations', () => {
                beforeAll(async () => {
                    await prisma.organization.create({
                        data: { name: 'testOrg', members: { create: [{ userId: userData.id }] } },
                    });
                });

                afterAll(async () => {
                    await prisma.organization.deleteMany();
                });
                test('should return list of edges with organization node', async () => {
                    // Arrange
                    const query = 'query { me { organizations { edges { node { name } } } } }';
                    const user = toUserId(userData);
                    const token = await jwt.sign({ id: user.id });
                    testClient.setCookies({ jwt: token });

                    // Act
                    const queryResponse = await testClient.query(query);

                    // Assert
                    const expectedResponse = {
                        data: { me: { organizations: { edges: [{ node: { name: 'testOrg' } }] } } },
                    };
                    expect(queryResponse).toEqual(expectedResponse);
                });
            });
        });
    });
});
