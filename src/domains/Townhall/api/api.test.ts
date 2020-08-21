/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */

import axios from 'utils/axios';
import errors from 'utils/errors';
import * as API from '.';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#createTownhall', () => {
    const form = {
        speaker: 'asdf',
        moderator: 'asdf',
        date: new Date(),
        description: 'asdf',
        url: 'asdf',
    };
    it('should reject a town hall', async () => {
        await expect(API.createTownhall({})).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should create a townhall', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(API.createTownhall(form)).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/townhalls/create', {
            form,
        });
    });
});

describe('#updateTownhall', () => {
    const form = {
        speaker: 'asdf',
        moderator: 'asdf',
        date: new Date(),
        description: 'asdf',
        url: 'asdf',
    };
    const townhallId = 'blah';
    it('should reject update', async () => {
        await expect(API.updateTownhall({}, townhallId)).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
        await expect(API.updateTownhall(form, '')).rejects.toThrow(
            errors.internalError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should update a townhall', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(API.updateTownhall(form, townhallId)).resolves.toBe(
            resolvedValue
        );
        expect(axios.post).toHaveBeenCalledWith('/api/townhalls/update', {
            form,
            townhallId,
        });
    });
});
