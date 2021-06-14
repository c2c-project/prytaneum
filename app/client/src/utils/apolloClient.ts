// source: https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { WebSocketLink } from '@apollo/client/link/ws';
import { TypedTypePolicies } from '@local/graphql-types';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ReturnType<typeof createApolloClient> | null = null;

function createApolloClient() {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    });

    const cache = new InMemoryCache({
        // typePolicies: {
        //     Event: {
        //         keyFields: ['id'],
        //     },
        //     User: {
        //         keyFields: ['userId'],
        //     },
        //     EventLiveFeedback: {
        //         keyFields: ['feedbackId'],
        //     },
        //     EventQuestion: {
        //         keyFields: ['questionId'],
        //     },
        //     EventVideo: {
        //         keyFields: ['url'],
        //     },
        //     Organization: {
        //         keyFields: ['orgId'],
        //     },
        //     Like: {
        //         keyFields: [],
        //     },
        // } as TypedTypePolicies,
        // typePolicies: {
        //     Query: {
        //         fields: {
        //             allPosts: concatPagination(),
        //         },
        //     },
        // },
    });

    if (process.browser) {
        // console.log(process.env.NEXT_PUBLIC_GRAPHQL_URL);
        const [, ...rest] = process.env.NEXT_PUBLIC_GRAPHQL_URL.split(':');
        const wsLink = new WebSocketLink({
            uri: `ws:${rest.join(':')}`,
            options: {
                reconnect: true,
            },
        });

        // The split function takes three parameters:
        //
        // * A function that's called for each operation to execute
        // * The Link to use for an operation if the function returns a "truthy" value
        // * The Link to use for an operation if the function returns a "falsy" value
        const splitLink = split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
            },
            wsLink,
            httpLink
        );
        return new ApolloClient({
            ssrMode: typeof window === 'undefined',
            link: splitLink,
            cache,
        });
    }
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: httpLink,
        cache,
    });
}

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client: ReturnType<typeof initializeApollo>, pageProps: Record<string, any>) {
    return {
        ...pageProps,
        props: {
            ...pageProps.props,
            [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
        },
    };
}

export function useApollo(pageProps?: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
