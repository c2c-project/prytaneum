import type { FastifyInstance } from 'fastify';
import AltairFastify from 'altair-fastify-plugin';

export function attachAltairTo(server: FastifyInstance) {
    server.log.debug('Attaching altair-fastify.');
    server.register(AltairFastify);
}
