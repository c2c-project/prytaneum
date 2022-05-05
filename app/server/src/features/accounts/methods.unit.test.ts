import bcrypt from 'bcryptjs';
import * as AccountMethods from './methods';
import { prismaMock } from '../../../mocks/prisma/singleton';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '../utils';

jest.mock('@local/lib/jwt', () => ({
    ...jest.requireActual('@local/lib/jwt'), // import and retain the original functionalities
}));

const toUserId = toGlobalId('User');

const userTextPassword = 'testPassword';
const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
    createdAt: new Date(),
    email: 'sallySmith@test.com',
    firstName: 'Sally',
    lastName: 'Smith',
    fullName: 'Sally Smith',
    password: userTextPassword,
    preferredLang: 'EN',
    canMakeOrgs: false,
};

beforeAll(async () => {
    // Store hashed password to properly mock prisma response data
    userData.password = await bcrypt.hash(userData.password, 10);
});
describe('account methods', () => {
    describe('register', () => {
        test('should register new user with a password', async () => {
            // Arrange
            const user = { ...userData };
            prismaMock.user.create.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.register(prismaMock, userData, userTextPassword);

            // Assert
            const expectedOutput = { ...userData };
            expect(output).toEqual(expectedOutput);
        });

        test('should register new user with null password', async () => {
            // Arrange
            const user = { ...userData, password: null };
            prismaMock.user.create.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.register(prismaMock, userData, null);

            // Assert
            const expectedOutput = { ...userData, password: null };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('findUserById', () => {
        test('should find a user', async () => {
            // Arrange
            const user = { ...userData };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.findUserById(userData.id, prismaMock);

            // Assert
            const expectedOutput = { ...userData };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('findOrgsByUserId', () => {
        test('should find a single org', async () => {
            // Arrange
            const user = {
                ...userData,
                memberOf: [{ organization: 'Prytaneum' }],
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.findOrgsByUserId(userData.id, prismaMock);

            // Assert
            const expectedOutput = ['Prytaneum'];
            expect(output).toEqual(expectedOutput);
        });

        test('should find multiple orgs', async () => {
            // Arrange
            const user = {
                ...userData,
                memberOf: [
                    { organization: 'Prytaneum' },
                    { organization: 'University of California, Riverside' },
                    { organization: 'School of Public Policy' },
                    { organization: 'Southern California' },
                ],
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.findOrgsByUserId(userData.id, prismaMock);

            // Assert
            const expectedOutput = [
                'Prytaneum',
                'University of California, Riverside',
                'School of Public Policy',
                'Southern California',
            ];
            expect(output).toEqual(expectedOutput);
        });

        test('should not find orgs', async () => {
            // Arrange
            prismaMock.user.findUnique.mockRejectedValueOnce(null);

            // Assert
            await expect(AccountMethods.findOrgsByUserId(userData.id, prismaMock)).rejects.toBeNull();
        });
    });

    describe('registerSelf', () => {
        test('should register a user if passwords match', async () => {
            // Arrange
            const user = { ...userData };
            const input = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userTextPassword,
                confirmPassword: userTextPassword,
            };
            prismaMock.user.create.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.registerSelf(prismaMock, input);

            // Assert
            const userWithGlobalId = toUserId(user);
            const token = await jwt.sign({ id: userWithGlobalId.id });
            const expectedOutput = { registeredUser: user, token };
            expect(output).toEqual(expectedOutput);
        });

        test('should throw if passwords do not match', async () => {
            // Arrange
            const input = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: 'password',
                confirmPassword: 'mismatchedPassword',
            };

            // Assert
            await expect(AccountMethods.registerSelf(prismaMock, input)).rejects.toThrow('Passwords must match');
        });
    });

    describe('loginWithPassword', () => {
        test('should throw if no password exists', async () => {
            // Arrange
            const user = { ...userData, password: null };
            const input = { email: userData.email, password: 'nonNullPassword' };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.loginWithPassword(prismaMock, input)).rejects.toThrow(
                'Login failed; Invalid email or password.'
            );
        });

        test('should throw if password is inavlid', async () => {
            // Arrange
            const user = { ...userData };
            const input = { email: userData.email, password: 'invalidPassword' };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.loginWithPassword(prismaMock, input)).rejects.toThrow(
                'Login failed; Invalid email or password.'
            );
        });

        test('should login user successfully', async () => {
            // Arrange
            const user = { ...userData };
            const input = { email: userData.email, password: userTextPassword };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.loginWithPassword(prismaMock, input);

            // Assert
            const userWithGlobalId = toUserId(user);
            const token = await jwt.sign({ id: userWithGlobalId.id });
            const expectedOutput = { user, token };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('updateEmail', () => {
        test('should throw if no user is account with new email already exists', async () => {
            // Arrange
            const user = { ...userData };
            const input = { currentEmail: 'test@test.com', newEmail: userData.email };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updateEmail(prismaMock, input)).rejects.toThrow(
                'Updating email failed: Another user exists with this email. Please input a different email.'
            );
        });
        test('should return updated user and token when successful', async () => {
            // Arrange
            const newEmail = 'newEmail@test.com';
            const user = { ...userData, email: newEmail };
            const input = { currentEmail: userData.email, newEmail };
            prismaMock.user.update.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.updateEmail(prismaMock, input);

            // Assert
            const userWithGlobalId = toUserId(user);
            const token = await jwt.sign({ id: userWithGlobalId.id });
            const expectedOutput = { updatedUser: user, token };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('updatePassword', () => {
        test('should throw if account does not exist', async () => {
            // Arrange
            const newPassword = 'newPassword1!';
            const input = {
                email: 'dne@test.com',
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(null);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow('Account not found.');
        });
        test('should throw if account has no existing password', async () => {
            // Arrange
            const user = { ...userData, password: '' };
            const newPassword = 'newPassword1!';
            const input = {
                email: userData.email,
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow(
                'Updating password failed: Missing password.'
            );
        });
        test('should throw if oldPassword is wrong', async () => {
            // Arrange
            const user = { ...userData };
            const newPassword = 'newPassword1!';
            const input = {
                email: userData.email,
                oldPassword: 'wrongPassword',
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow(
                'Updating password failed: Invalid password.'
            );
        });
        test('should throw if password is shorter than 8 characters', async () => {
            // Arrange
            const user = { ...userData };
            const newPassword = 'shortpw';
            const input = {
                email: userData.email,
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow(
                'New password must be at least 8 characters.'
            );
        });
        test('should throw if password does not contain at least 1 number and 1 symbol', async () => {
            // Arrange
            const user = { ...userData };
            const newPassword = 'invalidPassword';
            const input = {
                email: userData.email,
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow(
                'New password must contain a mixture of lowercase and uppercase letters, at least one number, and at least one special character.'
            );
        });
        test('should throw if new passwords do not match', async () => {
            // Arrange
            const user = { ...userData };
            const newPassword = 'newPassword1!';
            const input = {
                email: userData.email,
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: 'mismatchedNewPassword',
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.updatePassword(prismaMock, input)).rejects.toThrow('Passwords must match.');
        });
        test('should update password sucessfully', async () => {
            // Arrange
            const user = { ...userData };
            const newPassword = 'newPassword1!';
            const newPasswordHashed = await bcrypt.hash(newPassword, 10);
            const updatedUser = { ...userData, password: newPasswordHashed };
            const input = {
                email: userData.email,
                oldPassword: userTextPassword,
                newPassword,
                confirmNewPassword: newPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);
            prismaMock.user.update.mockResolvedValueOnce(updatedUser);

            // Act
            const output = await AccountMethods.updatePassword(prismaMock, input);

            // Assert
            const userWithGlobalId = toUserId(updatedUser);
            const token = await jwt.sign({ id: userWithGlobalId.id });
            const expectedOutput = { updatedUser, token };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('deleteAccount', () => {
        test('should throw if account has no existing password', async () => {
            // Arrange
            const user = { ...userData, password: '' };
            const input = { email: userData.email, password: userTextPassword, confirmPassword: userTextPassword };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.deleteAccount(prismaMock, input)).rejects.toThrow(
                'Deleting account failed: Missing password.'
            );
        });
        test('should throw if oldPassword is wrong', async () => {
            const user = { ...userData };
            const input = {
                email: userData.email,
                password: 'wrongPassword',
                confirmPassword: 'wrongPassword',
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.deleteAccount(prismaMock, input)).rejects.toThrow(
                'Deleting account failed: Invalid password.'
            );
        });
        test('should throw if new passwords do not match', async () => {
            // Arrange
            const user = { ...userData };
            const input = {
                email: userData.email,
                password: userTextPassword,
                confirmPassword: 'mismatchedPassword',
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);

            // Assert
            await expect(AccountMethods.deleteAccount(prismaMock, input)).rejects.toThrow('Passwords must match.');
        });
        test('should delete account sucessfully', async () => {
            // Arrange
            const user = { ...userData };
            const input = {
                email: userData.email,
                password: userTextPassword,
                confirmPassword: userTextPassword,
            };
            prismaMock.user.findUnique.mockResolvedValueOnce(user);
            prismaMock.user.delete.mockResolvedValueOnce(user);

            // Act
            const output = await AccountMethods.deleteAccount(prismaMock, input);

            // Assert
            const expectedOutput = { deletedUser: userData };
            expect(output).toEqual(expectedOutput);
        });
    });
});
