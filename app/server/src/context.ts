/* eslint-disable @typescript-eslint/no-empty-interface */
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@app/prisma';
import { verify } from './lib/jwt';

const prisma = new PrismaClient();

export const buildContext = async (req: FastifyRequest, reply: FastifyReply) => {
    let userId = '';
    if (req.cookies.jwt) {
        const decodedJwt = await verify(req.cookies.jwt).catch(() => reply.clearCookie('jwt').send());
        userId = (decodedJwt as { id: string }).id;
    }
    return {
        prisma,
        userId,
    };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}
