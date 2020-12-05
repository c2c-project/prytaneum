/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'utils/axios';
import errors from 'utils/errors';
import * as API from './api';

beforeEach(() => {
    jest.spyOn(axios, 'get');
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#getUserList', () => {
    it('it should fetch a list of users', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
            resolvedValue
        );

        await expect(API.getUserList()).resolves.toBe(resolvedValue);
        expect(axios.get).toBeCalledWith('/api/users/list');
    });
});

describe('#getUser', () => {
    const userId = 'abc';
    it('should reject a user', async () => {
        await expect(API.getUser('')).rejects.toThrow(errors.internalError());
        expect(axios.post).not.toHaveBeenCalled();
    });

    it('it should fetch a user', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
            resolvedValue
        );

        await expect(API.getUser(userId)).resolves.toBe(resolvedValue);
        expect(axios.get).toHaveBeenCalledWith(`/api/users/${userId}`);
    });
});

describe('#updateUserStatus', () => {
    const userId = 'abc';
    const form = {
        _id: 'abc',
        name: 'Francisco Gallego',
        email: 'kikiki@gmail.com',
        status: [
            { role: 'Admin', count: 1, active: true },
            { role: 'Organizer', count: 1, active: false },
            { role: 'Moderator', count: 1, active: false },
        ],
        actionHistoryData: [],
        timeStamp: new Date(),
    };

    // FIXME:
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should reject a user status update incorrect form', async () => {
    //     await expect(API.promoteUser({}, userId)).rejects.toThrow(
    //         errors.fieldError()
    //     );
    //     expect(axios.post).not.toHaveBeenCalled();
    // });

    it('should reject a user status update invalid id', async () => {
        await expect(API.promoteUser(form, '')).rejects.toThrow(
            errors.internalError()
        );

        expect(axios.post).not.toHaveBeenCalled();
    });

    it('it should update user status', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );

        await expect(API.promoteUser(form, userId)).resolves.toBe(
            resolvedValue
        );
        expect(axios.post).toHaveBeenCalledWith(`/api/users/${userId}/update`, {
            id: userId,
            form,
        });
    });
});
