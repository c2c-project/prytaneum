import fastify, { FastifyInstance } from 'fastify';
import { attachCorsTo } from './cors';

describe('Fastify CORS Plugin', () => {
    let server: FastifyInstance;

    beforeEach(async () => {
        server = fastify();
        attachCorsTo(server);
        server.get('/test', async () => ({ status: 'ok' }));
        server.post('/test', async () => ({ status: 'ok' }));
        await server.ready();
    });

    afterEach(async () => {
        await server.close();
    });

    it('should reflect origin and allow credentials on preflight OPTIONS request', async () => {
        const response = await server.inject({
            method: 'OPTIONS',
            url: '/test',
            headers: {
                origin: 'http://localhost:3000',
                'access-control-request-method': 'POST',
            },
        });

        expect(response.statusCode).toBe(204);
        expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
        expect(response.headers['access-control-allow-credentials']).toBe('true');
    });

    it('should reflect origin and allow credentials on GET/POST requests', async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/test',
            headers: {
                origin: 'http://localhost:3000',
            },
        });

        expect(response.statusCode).toBe(200);
        expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
        expect(response.headers['access-control-allow-credentials']).toBe('true');
    });

    it('should not use wildcard origin "*" when request contains an origin', async () => {
        const response = await server.inject({
            method: 'OPTIONS',
            url: '/test',
            headers: {
                origin: 'http://localhost:8080',
                'access-control-request-method': 'POST',
            },
        });

        expect(response.headers['access-control-allow-origin']).not.toBe('*');
        expect(response.headers['access-control-allow-origin']).toBe('http://localhost:8080');
        expect(response.headers['access-control-allow-credentials']).toBe('true');
    });
});
