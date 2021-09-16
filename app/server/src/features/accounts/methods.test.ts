import { PrismaClient } from '@app/prisma';
import bcrypt from 'bcrypt';
import { 
    register,
    findUserById,
    findOrgsByUserId,
    registerSelf,
    loginWithPassword
} from './methods';

jest.mock('@app/prisma');

const prismaMock = new PrismaClient();

describe('register()', () => {

    test('should register new user', async () => {
        const userData = {
            email: 'hello@prytaneum.io',
            firstName: 'John',
            lastName: 'Doe'
        }
        const textPassword = 'dummypassword';
        const encryptedPassword = await bcrypt.hash(textPassword, 10);

        // await expect(register(prisma, userData, textPassword)).resolves.toEqual({
        //     email: 'hello@prytaneum.io',
        //     firstName: 'John',
        //     lastName: 'Doe',
        //     fullName: 'John Doe',
        //     password: encryptedPassword,
        //     preferredLang: 'EN',
        // })

        expect(register(prismaMock, userData, textPassword)).resolves.toThrow()

        // await prisma.user.delete({
        //     where: { email: 'hello@prytaneum.io' }
        // })
    })
});
