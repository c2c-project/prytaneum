/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */

import axios from 'utils/axios';
import { makeTownhallForm } from 'prytaneum-typings';
import qs from 'qs';
import * as API from '.';

beforeEach(() => {
    jest.spyOn(axios, 'post');
    jest.spyOn(axios, 'get');
    jest.spyOn(axios, 'delete');
    jest.spyOn(axios, 'put');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#createTownhall', () => {
    const form = makeTownhallForm();
    it('should create a townhall', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(API.createTownhall(form)).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith(
            '/api/townhalls',
            qs.stringify(form)
        );
    });
});

describe('#updateTownhall', () => {
    const form = makeTownhallForm();
    const townhallId = 'blah';
    it('should update a townhall', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).put.mockResolvedValue(
            resolvedValue
        );
        await expect(API.updateTownhall(form, townhallId)).resolves.toBe(
            resolvedValue
        );
        expect(axios.put).toHaveBeenCalledWith(
            `/api/townhalls/${townhallId}`,
            qs.stringify(form)
        );
    });
});
