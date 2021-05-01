import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient, User } from '@app/prisma';

import { Maybe } from './graphql-types';

export interface Context {
    prisma: PrismaClient;
    userId: Maybe<string>;
}
type CtxFn = (req: FastifyRequest, reply: FastifyReply) => Context;

const prisma = new PrismaClient();

export const context: CtxFn = (req, _reply) => ({
    prisma,
    userId: '', // TODO: real authorization, this is just placeholder for typescript
});
