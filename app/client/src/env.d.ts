declare global {
    declare namespace NodeJS {
        export interface ProcessEnv {
            NODE_ENV: string;
            NEXT_PUBLIC_GRAPHQL_URL: string;
            // NEXT_PUBLIC_GRAPHQL_WS: string;
            // NEXT_PUBLIC_GRAPHQL_HOST: string;
        }
    }
}

export default {};
