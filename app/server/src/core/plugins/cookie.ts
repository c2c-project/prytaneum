import type { FastifyInstance } from 'fastify';
import fastifyCookie from 'fastify-cookie';

export function attachCookieTo(server: FastifyInstance) {
    server.log.debug('Attaching fastify cookie.');
    server.register(fastifyCookie, {
        // Assumes that cookie exists already and is verified elswhere.
        secret: process.env.COOKIE_SECRET,
    });
}
