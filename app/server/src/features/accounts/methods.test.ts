import bcrypt from 'bcrypt';
import { 
    register,
    findUserById,
    findOrgsByUserId,
    registerSelf,
    loginWithPassword
} from './methods';
import { prismaMock } from './singleton'

describe('register(prisma, userData, textPassword)', () => {
    test('should register new user with a password', async () => {
        const userData = {
            email: 'johndoe@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe'
        }
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

describe('findOrgsByUserId(userId, prisma)', () => {
    test('should find a single org', async () => {
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
        prismaMock.user.findUnique.mockRejectedValueOnce(null);

        await expect(findOrgsByUserId('275876e34cf609db118f3d84b799a790', prismaMock)).rejects.toBeNull();
    })
});

describe('registerSelf(prisma, input)', () => {
    // test('should register a user if passwords match', async () => {
    //     const input = {
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         password: 'dummypassword',
    //         confirmPassword: 'dummypassword',
    //         email: 'johndoe@prytaneum.io'
    //     }
    //     const encryptedPassword = await bcrypt.hash(input.password, 10);
        
    //     const date = new Date();
        
    //     const user = {
    //         canMakeOrgs: false,
    //         createdAt: date,
    //         email: 'johndoe@prytaneum.io',
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         fullName: 'John Doe',
    //         id: '275876e34cf609db118f3d84b799a790',
    //         password: encryptedPassword,
    //         preferredLang: 'EN',
    //     }

    //     prismaMock.user.create.mockResolvedValueOnce(user);

    //     await expect(registerSelf(prismaMock, input)).resolves.toEqual({
    //         user, token: 'token'
    //     });
    // })

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

describe('loginWithPassword(prisma, input)', () => {
    test('should throw if no password exists', async () => {
        // const textPassword = 'dummypassword';
        // const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
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

        const input = {
            email: 'johndoe@prytaneum.io',
            password: 'dummypassword'
        }

        prismaMock.user.findUnique.mockResolvedValueOnce(user);

        await expect(loginWithPassword(prismaMock, input)).rejects.toThrow('Login failed; Invalid email or password.');
    })
});