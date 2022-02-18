import type { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

export function attachCorsTo(server: FastifyInstance) {
    server.log.debug('Attaching fastify cors.');
    server.register(fastifyCors, {
        origin: '*',
        methods: ['POST', 'GET', 'DELETE', 'OPTIONS', 'PUT', 'HEAD'],
    });
}
