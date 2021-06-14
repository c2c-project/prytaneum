import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { join } from 'path';
import mercurius from 'mercurius';
import mercuriusCodgen from 'mercurius-codegen';
import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import AltairFastify from 'altair-fastify-plugin';

import { buildContext, buildSubscriptionContext } from './context';
import { server } from './server';

const typeDefsArr = loadFilesSync(join(__dirname, './features/**/*.graphql'));
const typeDefs = mergeTypeDefs(typeDefsArr);

const resolverArr = loadFilesSync([
    join(__dirname, './features/**/resolvers.ts'),
    join(__dirname, './features/type-parsers.ts'),
]);
const resolvers = mergeResolvers(resolverArr);

const schema = makeExecutableSchema({ typeDefs, resolvers });

server.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: buildContext,
    // subscription: true,
    subscription: {
        context: buildSubscriptionContext,
    },
});

server.register(cookie, {
    secret: process.env.COOKIE_SECRET,
} as FastifyCookieOptions);

server.register(AltairFastify);

function verifyEnv() {
    if (!process.env.NODE_ENV) throw new Error('Must define NODE_ENV');
    if (process.env.NODE_ENV === 'production') {
        if (!process.env.COOKIE_SECRET) throw new Error('Must define COOKIE_SECRET in production');
        if (!process.env.JWT_SECRET) throw new Error('Must define JWT_SECRET in production');
        if (!process.env.PORT) throw new Error('Must define PORT in production');
        if (!process.env.HOST) throw new Error('Must define HOST in production');
    }
}

async function start() {
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
    verifyEnv();
    await server.listen(process.env.PORT, process.env.HOST);
}

start();
