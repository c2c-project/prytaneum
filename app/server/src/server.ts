import fastify from 'fastify';

export const server = fastify({ logger: { prettyPrint: process.env.NODE_ENV === 'development' } });
