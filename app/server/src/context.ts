/* eslint-disable @typescript-eslint/no-empty-interface */
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@app/prisma';

const prisma = new PrismaClient();

export const buildContext = (_req: FastifyRequest, _reply: FastifyReply) => ({
    prisma,
    userId: '', // TODO: real authorization, this is just placeholder for typescript
    // reply,
});

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}
