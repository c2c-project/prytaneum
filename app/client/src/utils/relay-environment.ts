// src: https://github.com/vercel/next.js/blob/canary/examples/with-relay-modern/lib/relay.js
import { useMemo } from 'react';
import { Environment, Network, RecordSource, Store, FetchFunction, Observable, SubscribeFunction } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let relayEnvironment: Environment | null = null;
let subscriptionClient: SubscriptionClient | null = null;

const fetchQuery: FetchFunction = async (params, variables) => {
    // console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: params.text,
            variables,
        }),
    });
    return response.json();
};

const createSubscriptionClient = () => {
    const wsProtocol = 'ws://';
    // first element will be "http"
    const [, ...url] = process.env.NEXT_PUBLIC_GRAPHQL_URL.split('://');
    return new SubscriptionClient([wsProtocol, ...url].join(''), {
        reconnect: true,
    });
};

const initSubscriptionClient = () => {
    const client = subscriptionClient ?? createSubscriptionClient();

    // For SSG and SSR always create a new subscription client
    if (typeof window === 'undefined') return client;
    if (!client) subscriptionClient = client;

    return client;
};

const subscribe: SubscribeFunction = (request, variables) => {
    const client = initSubscriptionClient();
    const subscribeObservable = client.request({
        query: request.text ?? undefined,
        operationName: request.name,
        variables,
    });
    // Important: Convert subscriptions-transport-ws observable type to Relay's
    // this is directly from the relay docs, so it should work?
    // might just be a typings issue -- will investigate if there's something going wrong
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Observable.from(subscribeObservable as any);
};

function createEnvironment() {
    return new Environment({
        // Create a network layer from the fetch function
        network: Network.create(fetchQuery, subscribe),
        store: new Store(new RecordSource()),
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

export function useEnvironment(initialRecords: RecordMap) {
    const store = useMemo(() => initEnvironment(initialRecords), [initialRecords]);
    return store;
}

/**
 * this will reset the environment, but it will not cause a rerender in the react-dom
 * what this means is that the environment will change, but the previous environment may
 * still be rendered within the react tree.  So we must navigate to /logout
 * render a tree with the previous environment, then navigate away from that page so that
 * the new, cleared, environment gets used the next render.
 *
 * Also, the useEnvironment hook will not rerun with the new environment
 */
export function clearEnvironment() {
    relayEnvironment = createEnvironment();
}
