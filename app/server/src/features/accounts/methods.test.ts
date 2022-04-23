import bcrypt from 'bcryptjs';
import { register, findUserById, findOrgsByUserId, registerSelf, loginWithPassword } from './methods';
import { prismaMock } from '../../../mocks/prisma/singleton';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '../utils';
import { faker } from '@faker-js/faker';

jest.mock('@local/lib/jwt', () => ({
    ...jest.requireActual('@local/lib/jwt'), // import and retain the original functionalities
}));

const toUserId = toGlobalId('User');
const userData = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id: faker.datatype.uuid(),
};

/*
 *  test cases for registering a user optionally with a password
 */
describe('register', () => {
    test('should register new user with a password', async () => {
        // user data that the user inputs
        const textPassword = faker.internet.password();
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        // mock user
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        prismaMock.user.create.mockResolvedValueOnce(user);

        await expect(register(prismaMock, userData, textPassword)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        });
    });

    test('should register new user with null password', async () => {
        const textPassword = null;
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        prismaMock.user.create.mockResolvedValueOnce(user);

        await expect(register(prismaMock, userData, textPassword)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        });
    });
});

/*
 *  test cases for looking up the user given the user id
 */
describe('findUserById', () => {
    test('should find a user', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findUserById(userData.id, prismaMock)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        });
    });
});

/*
 *  test cases for getting organizations of a particular user
 */
describe('findOrgsByUserId', () => {
    test('should find a single org', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        // mock user with memberOf/organization attribute
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
            memberOf: [
                {
                    organization: 'Prytaneum',
                },
            ],
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findOrgsByUserId(userData.id, prismaMock)).resolves.toEqual(['Prytaneum']);
    });

    test('should find multiple orgs', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
            memberOf: [
                {
                    organization: 'Prytaneum',
                },
                {
                    organization: 'University of California, Riverside',
                },
                {
                    organization: 'School of Public Policy',
                },
                {
                    organization: 'Southern California',
                },
            ],
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findOrgsByUserId(userData.id, prismaMock)).resolves.toEqual([
            'Prytaneum',
            'University of California, Riverside',
            'School of Public Policy',
            'Southern California',
        ]);
    });

    test('should not find orgs', async () => {
        // mock no user found
        prismaMock.user.findUnique.mockRejectedValueOnce(null);

        await expect(findOrgsByUserId(userData.id, prismaMock)).rejects.toBeNull();
    });
});

/*
 *  test cases for the function called when a user is registering themselves
 */
describe('registerSelf', () => {
    test('should register a user if passwords match', async () => {
        const textPassword = faker.internet.password();
        // mock input for a registration form
        const input = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: textPassword,
            confirmPassword: textPassword,
        };
        const encryptedPassword = await bcrypt.hash(input.password, 10);
        const date = new Date();

        // mock registered user
        const registeredUser = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        prismaMock.user.create.mockResolvedValueOnce(registeredUser);

        // get jwt token to compare
        const token = await jwt.sign({ id: toUserId(registeredUser).id });

        await expect(registerSelf(prismaMock, input)).resolves.toEqual({
            registeredUser,
            token,
        });
    });

    test('should throw if passwords do not match', async () => {
        const input = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: faker.internet.password(),
            confirmPassword: faker.internet.password() + '#',
        };

        await expect(registerSelf(prismaMock, input)).rejects.toThrow('Passwords must match');
    });
});

/*
 *  test cases for logging in a user and returning the user and a token to be used as a cookie
 */
describe('loginWithPassword', () => {
    test('should throw if no password exists', async () => {
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: null,
            preferredLang: 'EN',
        };

        // mock input for a login form
        const input = {
            email: userData.email,
            password: faker.internet.password(),
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(loginWithPassword(prismaMock, input)).rejects.toThrow('Login failed; Invalid email or password.');
    });

    test('should throw if password is inavlid', async () => {
        const textPassword = faker.internet.password();
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        const input = {
            email: userData.email,
            password: textPassword + '#',
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(loginWithPassword(prismaMock, input)).rejects.toThrow('Login failed; Invalid email or password.');
    });

    test('should login user successfully', async () => {
        const textPassword = faker.internet.password();
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: userData.firstName + ' ' + userData.lastName,
            id: userData.id,
            password: encryptedPassword,
            preferredLang: 'EN',
        };

        const input = {
            email: userData.email,
            password: textPassword,
        };

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        const userWithGlobalId = toUserId(user);
        const token = await jwt.sign({ id: userWithGlobalId.id });

        await expect(loginWithPassword(prismaMock, input)).resolves.toEqual({ user, token });
    });
});
