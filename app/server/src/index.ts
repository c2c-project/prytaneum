import 'module-alias/register';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';
import mercurius from 'mercurius';
import mercuriusCodgen from 'mercurius-codegen';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import AltairFastify from 'altair-fastify-plugin';
import fastifyCors from 'fastify-cors';

import { buildContext, buildSubscriptionContext } from './context';
import build from './server';

const typeDefsArr = loadFilesSync(join(__dirname, './features/**/*.graphql'));
const typeDefs = mergeTypeDefs(typeDefsArr);

const resolverArr = loadFilesSync([
    join(__dirname, './features/**/resolvers.ts'),
    join(__dirname, './features/type-parsers.ts'),
]);
const resolvers = mergeResolvers(resolverArr);

const schema = makeExecutableSchema({ typeDefs, resolvers });

function verifyEnv() {
    if (!process.env.NODE_ENV) throw new Error('Must define NODE_ENV');
    if (process.env.NODE_ENV === 'production') {
        if (!process.env.COOKIE_SECRET) throw new Error('Must define COOKIE_SECRET in production');
        if (!process.env.JWT_SECRET) throw new Error('Must define JWT_SECRET in production');
        if (!process.env.SERVER_PORT) throw new Error('Must define PORT in production');
        if (!process.env.HOST) throw new Error('Must define HOST in production');
        if (!process.env.GCP_PROJECT_ID) throw new Error('Must define GCP_PROJECT_ID in production');
    }
}

export const server = build();

async function start() {
    // Google Cloud Run will set this environment variable for you, so
    // you can also use it to detect if you are running in Cloud Run
    const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

    const port = process.env.SERVER_PORT || '3002';

    // You must listen on all IPV4 addresses in Cloud Run
    const address = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : process.env.HOST;

    try {
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
              req.log.info({ body: req.body }, 'parsed body')
            }
            next()
        });

        server.register(fastifyCors, {
            origin: '*',
            methods: ['POST', 'GET', 'DELETE', 'OPTIONS', 'PUT', 'HEAD'],
        });

        server.register(mercurius, {
            schema,
            graphiql: process.env.NODE_ENV === 'development',
            context: buildContext,
            // subscription: true,
            subscription: {
                context: buildSubscriptionContext,
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

        verifyEnv();
        server.log.info(`${process.env.NODE_ENV} Server running on ${address}:${port}`);
        const runAddress = await server.listen(port, address);
        server.log.info(`Listening on ${runAddress}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

if (require.main === module) {
    start();
}
