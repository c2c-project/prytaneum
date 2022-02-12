import { join } from 'path';
import mercurius from 'mercurius';
import mercuriusCodgen from 'mercurius-codegen';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import AltairFastify from 'altair-fastify-plugin';
import fastifyCors from 'fastify-cors';
import { schema, checkEnv, initCleanup } from '@local/core';
import { MQGCP } from './lib/mqgcp';

import { buildContext, buildSubscriptionContext } from './context';
import build from './server';

export const server = build();
const emitter = new MQGCP(server.log);

async function start() {
    try {
        initCleanup(emitter);
        if (!server) throw new Error('Server Building Failed');
        // does not run in production -- https://github.com/mercurius-js/mercurius-typescript/tree/master/packages/mercurius-codegen
        mercuriusCodgen(server, {
            targetPath: join(__dirname, './graphql-types.ts'),
            watchOptions: {
                // enabled: true,
            },
            codegenConfig: {
                internalResolversPrefix: '__',
                // idk why they change it from the default
                // https://github.com/mercurius-js/mercurius-typescript/blob/25f4f437d41be645ae13d0836123e82f4e14afe4/packages/mercurius-codegen/src/code.ts#L78
                customResolverFn:
                    '(parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult',
                // avoidOptionals: {
                //     defaultValue: true
                // },
                // maybeValue: 'T | null | undefined',
            },
        });

        server.addHook('preHandler', (req, reply, next) => {
            if (req.body) {
                req.log.info({ body: req.body }, 'parsed body');
            }
            next();
        });

        server.register(fastifyCors, {
            origin: '*',
            methods: ['POST', 'GET', 'DELETE', 'OPTIONS', 'PUT', 'HEAD'],
        });

        server.register(mercurius, {
            schema,
            graphiql: process.env.NODE_ENV === 'development',
            context: buildContext,
            subscription: {
                context: buildSubscriptionContext,
                emitter: process.env.NODE_ENV === 'development' ? undefined : emitter,
            },
            errorFormatter: (error, ...args) => {
                server.log.error(error);
                return mercurius.defaultErrorFormatter(error, ...args);
            },
        });

        server.register(cookie, {
            secret: process.env.COOKIE_SECRET,
        } as FastifyCookieOptions);

        server.register(AltairFastify);

        // Routes for kubernetes health checks
        server.get('/', async () => ({ status: 'Healthy' }));
        server.get('/healthz', async () => ({ status: 'Healthy' }));

        checkEnv();
        server.log.info(`${process.env.NODE_ENV} Server running on ${process.env.HOST}:${process.env.PORT}`);
        const runAddress = await server.listen(process.env.PORT, process.env.HOST);
        server.log.info(`Listening on ${runAddress}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

if (require.main === module) {
    start();
}
