// Using supertest to test non /grapqhl routes
import supertest from 'supertest';
import { getOrCreateServer } from '@local/core/server';
import { setupMetaRoutes } from './meta-routes';

const server = getOrCreateServer();

beforeAll(() => {
    setupMetaRoutes(server);
});

afterAll(() => {
    server.close();
});

describe('Meta routes', () => {
    test('Get `/` route', async () => {
        await server.ready();

        const response = await supertest(server.server)
            .get('/')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({ status: 'Healthy' });
    });
    test('Get `/healthz` route', async () => {
        await server.ready();

        const response = await supertest(server.server)
            .get('/healthz')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({ status: 'Healthy' });
    });
});
