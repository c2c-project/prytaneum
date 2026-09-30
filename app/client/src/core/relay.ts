// src: https://github.com/vercel/next.js/blob/canary/examples/with-relay-modern/lib/relay.js
import { useState, useEffect, useCallback } from 'react';
import { Environment, Network, RecordSource, Store, FetchFunction, Observable, SubscribeFunction } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GetServerSidePropsContext } from 'next';

let relayEnvironment: Environment | null = null;
let subscriptionClient: SubscriptionClient | null = null;

export function makeFetchFunction(config?: RequestInit): FetchFunction {
    return async (params, variables) => {
        const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
            method: 'POST',
            credentials: 'include',
            ...config,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify({
                query: params.text,
                variables,
            }),
        });

        if (!response.ok) {
            let errorText = '';
            try {
                errorText = await response.text();
            } catch {
                // ignore
            }
            throw new Error(
                `Network response was not ok: ${response.status} ${response.statusText}${
                    errorText ? ` - ${errorText}` : ''
                }`
            );
        }

        const json = await response.json();
        if (json.errors && (!json.data || Object.keys(json.data).length === 0)) {
            const errorMessages = json.errors
                .map((e: { message?: string }) => e.message || 'GraphQL Error')
                .join(', ');
            throw new Error(errorMessages);
        }
        return json;
    };
}

export function makeServerFetchFunction(ctx: GetServerSidePropsContext) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    if (ctx.req.cookies.jwt) headers.Authorization = `Bearer ${ctx.req.cookies?.jwt}`;
    // inject cookies only for now
    return makeFetchFunction({
        headers,
    });
}

export function closeSubscriptionClient() {
    if (subscriptionClient) {
        subscriptionClient.close();
        subscriptionClient = null;
    }
}

const createSubscriptionClient = () => {
    if (typeof window === 'undefined') return null;
    const wsProtocol = process.env.NODE_ENV === 'production' ? 'wss://' : 'ws://';
    // first element will be "http"
    const [, ...url] = process.env.NEXT_PUBLIC_GRAPHQL_URL.split('://');
    return new SubscriptionClient([wsProtocol, ...url].join(''), {
        reconnect: true,
    });
};

const initSubscriptionClient = () => {
    if (typeof window === 'undefined') return null;
    const client = subscriptionClient ?? createSubscriptionClient();
    if (!subscriptionClient) subscriptionClient = client;

    return client;
};

const subscribe: SubscribeFunction = (request, variables) => {
    const client = initSubscriptionClient();
    if (!client) {
        return Observable.create((sink) => {
            sink.complete();
        });
    }
    const subscribeObservable = client.request({
        query: request.text ?? undefined,
        operationName: request.name,
        variables,
    });
    // Important: Convert subscriptions-transport-ws observable type to Relay's
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Observable.from(subscribeObservable as any);
};

function createEnvironment() {
    return new Environment({
        // Create a network layer from the fetch function
        network: Network.create(makeFetchFunction(), subscribe),
        store: new Store(new RecordSource(), { queryCacheExpirationTime: 5 * 60 * 1000 }), // 5 minutes cache expiration
        isServer: typeof window === 'undefined',
    });
}

export type RecordMap = ConstructorParameters<typeof RecordSource>[0];

export function initEnvironment(initialRecords?: RecordMap) {
    // Create a network layer from the fetch function
    const environment = relayEnvironment ?? createEnvironment();

    // If your page has Next.js data fetching methods that use Relay, the initial records
    // will get hydrated here
    if (initialRecords) {
        environment.getStore().publish(new RecordSource(initialRecords));
    }
    // For SSG and SSR always create a new Relay environment
    if (typeof window === 'undefined') return environment;
    // Create the Relay environment once in the client
    if (!relayEnvironment) relayEnvironment = environment;

    return relayEnvironment;
}

export function initServerEnvironment(fetchFunction: FetchFunction) {
    const environment = new Environment({
        network: Network.create(fetchFunction, subscribe),
        store: new Store(new RecordSource(), { queryCacheExpirationTime: 5 * 60 * 1000 }), // 5 minutes cache expiration
        isServer: true,
    });
    return environment;
}

type EnvListener = (newEnv: Environment) => void;
const envListeners = new Set<EnvListener>();

export function clearEnvironment() {
    closeSubscriptionClient();
    relayEnvironment = createEnvironment();
    envListeners.forEach((listener) => listener(relayEnvironment!));
}

export function useEnvironment(initialRecords?: RecordMap) {
    const [env, setEnv] = useState<Environment>(() => initEnvironment(initialRecords));

    useEffect(() => {
        const listener = (newEnv: Environment) => {
            setEnv(newEnv);
        };
        envListeners.add(listener);
        return () => {
            envListeners.delete(listener);
        };
    }, []);

    const resetEnv = useCallback(() => {
        clearEnvironment();
    }, []);

    return {
        env,
        resetEnv,
    };
}
