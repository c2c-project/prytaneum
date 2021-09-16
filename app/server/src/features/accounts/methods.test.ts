import bcrypt from 'bcrypt';
import { 
    register,
    findUserById,
    findOrgsByUserId,
    registerSelf,
    loginWithPassword
} from './methods';
import { prismaMock } from './singleton'
import * as jwt from '../../lib/jwt';
import { toGlobalId } from '../utils';

jest.mock('../../lib/jwt', () => ({
    ...jest.requireActual('../../lib/jwt'), // import and retain the original functionalities
}));

const toUserId = toGlobalId('User');


/*
 *  test cases for registering a user optionally with a password
 */
describe('register(prisma, userData, textPassword)', () => {
    test('should register new user with a password', async () => {
        // user data that the user inputs
        const userData = {
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe'
        }
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();
        
        // mock user
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        prismaMock.user.create.mockResolvedValueOnce(user);

        await expect(register(prismaMock, userData, textPassword)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        });
    })

    test('should register new user with null password', async () => {
        const userData = {
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe'
        }
        const textPassword = null;
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();
        
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        prismaMock.user.create.mockResolvedValueOnce(user);

        await expect(register(prismaMock, userData, textPassword)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        });
    })
});


/*
 *  test cases for looking up the user given the user id
 */
describe('findUserById(id, prisma)', () => {
    test('should find a user', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();
        
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findUserById('275876e34cf609db118f3d84b799a790', prismaMock)).resolves.toEqual({
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        })
    })
});


/*
 *  test cases for getting organizations of a particular user
 */
describe('findOrgsByUserId(userId, prisma)', () => {
    test('should find a single org', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();
        
        // mock user with memberOf/organization attribute
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
            memberOf: [
                {
                    organization: 'Prytaneum'
                }
            ]
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findOrgsByUserId('275876e34cf609db118f3d84b799a790', prismaMock)).resolves.toEqual(['Prytaneum']);
    })

    test('should find multiple orgs', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();
        
        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
            memberOf: [
                {
                    organization: 'Prytaneum'
                },
                {
                    organization: 'University of California, Riverside'
                },
                {
                    organization: 'School of Public Policy'
                },
                {
                    organization: 'Southern California'
                }
            ]
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(findOrgsByUserId('275876e34cf609db118f3d84b799a790', prismaMock)).resolves.toEqual([   
            'Prytaneum', 
            'University of California, Riverside',
            'School of Public Policy',
            'Southern California'
        ]);
    })

    test('should not find orgs', async () => {
        // mock no user found
        prismaMock.user.findUnique.mockRejectedValueOnce(null);

        await expect(findOrgsByUserId('275876e34cf609db118f3d84b799a790', prismaMock)).rejects.toBeNull();
    })
});

/*
 *  test cases for the function called when a user is registering themselves
 */
describe('registerSelf(prisma, input)', () => {
    test('should register a user if passwords match', async () => {
        // mock input for a registration form
        const input = {
            firstName: 'John',
            lastName: 'Doe',
            password: 'dummypassword',
            confirmPassword: 'dummypassword',
            email: 'johndoe@prytaneum.io'
        }
        const encryptedPassword = await bcrypt.hash(input.password, 10);
        const date = new Date();
        
        // mock registered user
        const registeredUser = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        prismaMock.user.create.mockResolvedValueOnce(registeredUser);

        // get jwt token to compare
        const token = await jwt.sign({ id: toUserId(registeredUser).id });

        await expect(registerSelf(prismaMock, input)).resolves.toEqual({
            registeredUser, token
        });
    })

    test('should throw if passwords do not match', async () => {
        const input = {
            firstName: 'John',
            lastName: 'Doe',
            password: 'dummypassword',
            confirmPassword: 'dumypasword',
            email: 'johndoe@prytaneum.io'
        }

        await expect(registerSelf(prismaMock, input)).rejects.toThrow('Passwords must match');
    })
});

/*
 *  test cases for logging in a user and returning the user and a token to be used as a cookie
 */
describe('loginWithPassword(prisma, input)', () => {
    test('should throw if no password exists', async () => {
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: null,
            preferredLang: 'EN',
        }

        // mock input for a login form
        const input = {
            email: 'johndoe@prytaneum.io',
            password: 'dummypassword'
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(loginWithPassword(prismaMock, input)).rejects.toThrow('Login failed; Invalid email or password.');
    })

    test('should throw if password is inavlid', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        const input = {
            email: 'johndoe@prytaneum.io',
            password: 'wrongpassword'
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(loginWithPassword(prismaMock, input)).rejects.toThrow('Login failed; Invalid email or password.');
    })

    test('should login user successfully', async () => {
        const textPassword = 'dummypassword';
        const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
        const date = new Date();

        const user = {
            canMakeOrgs: false,
            createdAt: date,
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            id: '275876e34cf609db118f3d84b799a790',
            password: encryptedPassword,
            preferredLang: 'EN',
        }

        const input = {
            email: 'johndoe@prytaneum.io',
            password: 'dummypassword'
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);
        
        const userWithGlobalId = toUserId(user);
        const token = await jwt.sign({ id: userWithGlobalId.id });

        await expect(loginWithPassword(prismaMock, input)).resolves.toEqual({ user, token });
    })
});