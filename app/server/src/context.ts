/* eslint-disable @typescript-eslint/no-empty-interface */
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@app/prisma';
import { fromGlobalId } from 'graphql-relay';
import { verify } from './lib/jwt';

const prisma = new PrismaClient();

async function extractJwt(req: FastifyRequest) {
    if (req.cookies.jwt) {
        const decodedJwt = await verify(req.cookies.jwt);
        return (decodedJwt as { id: string }).id;
    }
    if (req.headers.authorization) {
        // will be a string like "Bearer <jwt token here>", w/ split on a space it will be ['Bearer", <jwt here>]
        const [, jwt] = req.headers.authorization.split(' ');
        const decodedJwt = await verify(jwt);
        return (decodedJwt as { id: string }).id;
    }
    return null;
}

export const buildContext = async (req: FastifyRequest, reply: FastifyReply) => {
    let userId = await extractJwt(req).catch(() => reply.clearCookie('jwt').send());
    if (userId) {
        const { id } = fromGlobalId(userId);
        userId = id;
    }
    return {
        prisma,
        viewer: {
            id: userId,
        },
    };
};

export const buildSubscriptionContext = async (_: any, req: FastifyRequest) => {
    let userId = await extractJwt(req);
    if (userId) {
        const { id } = fromGlobalId(userId);
        userId = id;
    }
    return {
        prisma,
        viewer: {
            id: userId,
        },
    };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}
