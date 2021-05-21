// src: https://github.com/vercel/next.js/blob/canary/examples/with-relay-modern/lib/relay.js
import { useMemo } from 'react';
import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';

let relayEnvironment: Environment | null = null;

const fetchQuery: FetchFunction = async (params, variables) => {
    // console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
    // Fetch data from GitHub's GraphQL API:
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

function createEnvironment() {
    return new Environment({
        // Create a network layer from the fetch function
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
    });
}

type RecordMap = ConstructorParameters<typeof RecordSource>[0];

export function initEnvironment(initialRecords: RecordMap) {
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
