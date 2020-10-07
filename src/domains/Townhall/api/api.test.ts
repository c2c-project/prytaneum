/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */

import axios from 'utils/axios';
import errors from 'utils/errors';
import faker from 'faker';
import * as API from '.';
import { TownhallForm } from '../types';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#createTownhall', () => {
    const form: TownhallForm = {
        title: faker.lorem.words(3),
        date: new Date(),
        description: faker.lorem.words(10),
        scope: 'state',
        private: Math.random() > 0.5,
        speaker: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            territory: faker.company.bsAdjective(),
            party: faker.company.bsNoun(),
            picture: faker.image.avatar(),
        },
        topic: faker.lorem.word(),
    };
    it('should reject a town hall', async () => {
        await expect(API.createTownhall({} as TownhallForm)).rejects.toThrow(
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
    const form: TownhallForm = {
        title: faker.lorem.words(3),
        date: new Date(),
        description: faker.lorem.words(10),
        scope: 'state',
        private: Math.random() > 0.5,
        speaker: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            territory: faker.company.bsAdjective(),
            party: faker.company.bsNoun(),
            picture: faker.image.avatar(),
        },
        topic: faker.lorem.word(),
    };
    const townhallId = 'blah';
    it('should reject update', async () => {
        await expect(
            API.updateTownhall({} as TownhallForm, townhallId)
        ).rejects.toThrow(errors.fieldError());
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
