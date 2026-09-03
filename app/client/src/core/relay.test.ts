import { makeFetchFunction, makeServerFetchFunction, clearEnvironment, initEnvironment } from './relay';
import type { RequestParameters } from 'relay-runtime';
import type { GetServerSidePropsContext } from 'next';

// Mock SubscriptionClient
jest.mock('subscriptions-transport-ws', () => {
    const mockClose = jest.fn();
    const mockRequest = jest.fn();
    return {
        SubscriptionClient: jest.fn().mockImplementation(() => ({
            close: mockClose,
            request: mockRequest,
        })),
        __mockClose: mockClose,
    };
});

describe('Relay Network & Environment', () => {
    const originalFetch = global.fetch;
    const originalEnv = process.env.NEXT_PUBLIC_GRAPHQL_URL;

    beforeEach(() => {
        process.env.NEXT_PUBLIC_GRAPHQL_URL = 'http://localhost:8080/graphql';
    });

    afterEach(() => {
        global.fetch = originalFetch;
        process.env.NEXT_PUBLIC_GRAPHQL_URL = originalEnv;
        jest.clearAllMocks();
    });

    describe('makeFetchFunction', () => {
        const mockRequestParams: RequestParameters = {
            name: 'TestQuery',
            operationKind: 'query',
            text: 'query TestQuery { viewer { id } }',
            id: null,
            metadata: {},
        };

        it('should dispatch fetch with credentials: "include" and correct headers', async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ data: { viewer: { id: '123' } } }),
            });
            global.fetch = mockFetch;

            const fetchFn = makeFetchFunction();
            const result = await (fetchFn as any)(mockRequestParams, { var1: 'val1' });

            expect(mockFetch).toHaveBeenCalledTimes(1);
            const [url, options] = mockFetch.mock.calls[0];
            expect(url).toBe('http://localhost:8080/graphql');
            expect(options.method).toBe('POST');
            expect(options.credentials).toBe('include');
            expect(options.headers).toMatchObject({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            expect(JSON.parse(options.body)).toEqual({
                query: 'query TestQuery { viewer { id } }',
                variables: { var1: 'val1' },
            });
            expect(result).toEqual({ data: { viewer: { id: '123' } } });
        });

        it('should throw an error when HTTP status is not ok', async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                text: async () => 'Server Crashed',
            });
            global.fetch = mockFetch;

            const fetchFn = makeFetchFunction();
            await expect((fetchFn as any)(mockRequestParams, {})).rejects.toThrow(
                /500.*Internal Server Error/
            );
        });

        it('should throw an error when GraphQL errors are returned without data', async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    errors: [{ message: 'Unauthorized' }, { message: 'Invalid token' }],
                }),
            });
            global.fetch = mockFetch;

            const fetchFn = makeFetchFunction();
            await expect((fetchFn as any)(mockRequestParams, {})).rejects.toThrow(
                /Unauthorized, Invalid token/
            );
        });
    });

    describe('makeServerFetchFunction', () => {
        const mockRequestParams: RequestParameters = {
            name: 'TestServerQuery',
            operationKind: 'query',
            text: 'query TestServerQuery { viewer { id } }',
            id: null,
            metadata: {},
        };

        it('should add Authorization Bearer header when jwt cookie is present', async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ data: { viewer: { id: '456' } } }),
            });
            global.fetch = mockFetch;

            const mockContext = {
                req: {
                    cookies: {
                        jwt: 'fake-jwt-token',
                    },
                },
            } as unknown as GetServerSidePropsContext;

            const fetchFn = makeServerFetchFunction(mockContext);
            await (fetchFn as any)(mockRequestParams, {});

            const [, options] = mockFetch.mock.calls[0];
            expect(options.headers).toMatchObject({
                Authorization: 'Bearer fake-jwt-token',
            });
        });
    });

    describe('clearEnvironment & teardown', () => {
        it('should create a fresh environment instance when clearEnvironment is called', () => {
            const env1 = initEnvironment();
            clearEnvironment();
            const env2 = initEnvironment();

            expect(env1).not.toBe(env2);
        });

        it('should close the subscription client when clearEnvironment is called', () => {
            const { __mockClose } = jest.requireMock('subscriptions-transport-ws');
            const env = initEnvironment();
            env.getNetwork()
                .execute(
                    {
                        name: 'Sub',
                        operationKind: 'subscription',
                        text: 'subscription Sub { foo }',
                        id: null,
                        metadata: {},
                    },
                    {},
                    {}
                )
                .subscribe({});
            clearEnvironment();

            expect(__mockClose).toHaveBeenCalled();
        });
    });
});
