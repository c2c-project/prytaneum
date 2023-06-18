import type { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';

export function attachCookieTo(server: FastifyInstance) {
    server.log.debug('Attaching fastify cookie.');
    server.register(require('@fastify/cookie'), {
        // Assumes that cookie exists already and is verified elswhere.
        secret: process.env.COOKIE_SECRET,
        parseOptions: {},
    } as FastifyCookieOptions);
}
