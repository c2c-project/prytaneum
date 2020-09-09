import axios from 'utils/axios';
import errors from 'utils/errors';
import * as API from '.';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#updateUserInfo', () => {
    const userId = 'abc';
    it('should reject update', async () => {});
    it('should update a user', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>.post.mockRejectedValue(
            resolvedValue
        ))
    });
});
