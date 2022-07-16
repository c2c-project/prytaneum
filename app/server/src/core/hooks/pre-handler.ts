import type { FastifyInstance } from 'fastify';

/**
 * Takes in a graphql string and prepares it for printing in pino in a formatted way
 */
function formatGqlForPino(target: string) {
    return target.split('\n').reduce((accum, line, idx) => ({ ...accum, [idx]: line }), {});
}

type UnknownObj = Record<string, unknown>;

/**
 * Typeguard for checkiing if the body exists on the request.
 */
function hasBody(req: unknown): req is UnknownObj & { body: UnknownObj } {
    return typeof req === 'object' && !!req && 'body' in req;
}

/**
 * Typeguard for checking if the body contains a query.
 */
function hasQuery(body: UnknownObj): body is UnknownObj & { query: string } {
    return 'query' in body && typeof body.query === 'string';
}

/**
 * Used to override the format of specific fields in the request.
 * Requires that the body is set. Intended for use in non-prod environments.
 */
function getBodyOverrides(req: UnknownObj & { body: UnknownObj }) {
    // Do not use this format in production. It's mainly helpful for development / debugging purposes.
    if (process.env.NODE_ENV === 'production') return {};
    const overrides: Record<string, unknown> = {};
    if (hasQuery(req.body)) {
        overrides.query = formatGqlForPino(req.body.query);
    }
    return overrides;
}

export function attachPreHandlerTo(server: FastifyInstance) {
    server.log.debug('Attaching preHandler');
    server.addHook('preHandler', (req, reply, next) => {
        if (hasBody(req)) {
            const overrides = getBodyOverrides(req);
            req.log.info({ msg: 'Parsed body', body: { ...req.body, ...overrides } });
        }
        next();
    });
}
