/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'utils/axios';

import * as API from '.';

beforeEach(() => {
    jest.spyOn(axios, 'get');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#DevTeam', () => {
    describe('#get', () => {
        it('should get devTeam', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
                resolvedValue
            );
            await expect(API.getDevTeams()).resolves.toBe(resolvedValue);
            expect(axios.get).toHaveBeenCalledWith('/api/dev-team/get-teams');
        });
    });
});
