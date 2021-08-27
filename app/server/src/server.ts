import fastify from 'fastify';

export default function build() {
    const server = fastify({ logger: { prettyPrint: process.env.NODE_ENV === 'development' }, trustProxy: true });
    return server;
}

