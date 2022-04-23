import { PrismaClient } from '../../src/__generated__/prisma';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
    prisma: PrismaClient;
};

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    };
};
