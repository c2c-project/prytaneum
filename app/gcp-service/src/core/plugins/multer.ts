import type { FastifyInstance } from 'fastify';
import multer from 'fastify-multer';

export function attachMulterTo(server: FastifyInstance) {
    server.log.debug('Attaching fastify multer.');
    server.register(multer.contentParser);
}
