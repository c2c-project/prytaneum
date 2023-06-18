import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import { fromGlobalId } from 'graphql-relay';
import mercuriusCodgen from 'mercurius-codegen';
import { join } from 'path';

import redis from 'mqemitter-redis';
import { verify } from '@local/lib/jwt';
import { getRedisClient, loadSchema, getPrismaClient } from '@local/core/utils';

/**
 * Helper function for extracting the the authentication JWT from a `FastifyRequest`
 */
async function extractAuthenticationJwt(req: FastifyRequest) {
    if (req.cookies.jwt) {
        const decodedJwt = await verify(req.cookies.jwt);
        return (decodedJwt as { id: string }).id;
    }
    if (req.headers.authorization) {
        // Will be a string like "Bearer <jwt token here>", w/ split on a space it will be ['Bearer", <jwt here>]
        const [, jwt] = req.headers.authorization.split(' ');
        const decodedJwt = await verify(jwt);
        return (decodedJwt as { id: string }).id;
    }
    return null;
}

//
// ─── CONTEXT GENERATOR FUNCTIONS ────────────────────────────────────────────────
//

async function makeRequestContext(req: FastifyRequest, reply: FastifyReply) {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    let userId = await extractAuthenticationJwt(req).catch(() => reply.clearCookie('jwt').send());
    if (userId) {
        const { id } = fromGlobalId(userId);
        userId = id;
    }
    const _redis = getRedisClient(reply.log);
    return {
        prisma: getPrismaClient(reply.log),
        redis: _redis,
        viewer: {
            id: userId,
        },
    };
}

async function makeSubscriptionContext(_: any, req: FastifyRequest) {
    let userId = await extractAuthenticationJwt(req);
    if (userId) {
        const { id } = fromGlobalId(userId);
        userId = id;
    }
    const _redis = getRedisClient(req.log);
    return {
        prisma: getPrismaClient(req.log),
        redis: _redis,
        viewer: {
            id: userId,
        },
    };
}

//
// ─── TYPE OVERRIDES ─────────────────────────────────────────────────────────────
//

// Honestly, can't remember why I need this TODO: improve this comment
type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
// Mercurius context is being overriden here so that we can have the proper type checking
// across all mercurius context objects.
declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof makeRequestContext>> {}
}

//
// ─── PRIMARY EXPORTED FUNCTION ──────────────────────────────────────────────────
//

export function attachMercuriusTo(server: FastifyInstance) {
    server.log.debug('Attaching Mercurius.');
    const schema = loadSchema(server.log);
    const getEmitter = () => {
        if (process.env.NODE_ENV === 'production') {
            server.log.debug('Using redis MQEmitter.');
            return redis({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASSWORD,
            });
        }
        server.log.debug('Using in-memory MQEmitter.');
        return undefined;
    };
    server.register(mercurius, {
        schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: makeRequestContext,
        subscription: {
            context: makeSubscriptionContext,
            emitter: getEmitter(),
        },
    });

    if (process.env.NODE_ENV === 'test') return;
    // Does NOT run in production -- https://github.com/mercurius-js/mercurius-typescript/tree/master/packages/mercurius-codegen
    mercuriusCodgen(server, {
        // Should be src/graphql-types.ts
        targetPath: join(__dirname, '../../graphql-types.ts'),
        codegenConfig: {
            internalResolversPrefix: '__',
            // For some reason, mercurius changes this from the default.
            // We want the default type, so we're overriding with what the actual default is.
            // https://github.com/mercurius-js/mercurius-typescript/blob/25f4f437d41be645ae13d0836123e82f4e14afe4/packages/mercurius-codegen/src/code.ts#L78
            customResolverFn:
                '(parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult',
        },
    });
}
