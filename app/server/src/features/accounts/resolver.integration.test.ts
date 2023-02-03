import bcrypt from 'bcryptjs';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '../utils';

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);
const prisma = getPrismaClient(server.log);

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
    email: 'sallySmith@test.com',
    firstName: 'Sally',
    lastName: 'Smith',
    password: 'testPassword',
    preferredLang: 'EN',
};

beforeAll(async () => {
    // Attack relevant plugins
    plugins.attachCookieTo(server);
    plugins.attachMercuriusTo(server);

    // hash password as they are never stored in plaintext on the DB
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    // Add user to test DB
    await prisma.user.create({
        data: {
            ...userData,
            password: encryptedPassword,
        },
    });
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

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
