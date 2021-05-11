/* eslint-disable @typescript-eslint/no-empty-interface */
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@app/prisma';
import { verify } from './lib/jwt';

const prisma = new PrismaClient();

async function extractJwt(req: FastifyRequest) {
    if (req.cookies.jwt) {
        const decodedJwt = await verify(req.cookies.jwt);
        return (decodedJwt as { id: string }).id;
    }
    return '';
}

export const buildContext = async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = await extractJwt(req).catch(() => reply.clearCookie('jwt').send());
    console.log(userId);
    return {
        prisma,
        userId,
    };
};

export const buildSubscriptionContext = async (_: any, req: FastifyRequest) => {
    const userId = await extractJwt(req);
    return {
        prisma,
        userId,
    };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}
