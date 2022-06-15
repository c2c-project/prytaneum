// From prisma docs https://www.prisma.io/docs/guides/testing/unit-testing#singleton
import { PrismaClient } from '../../src/__generated__/prisma';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock';

import prisma from './client';

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
