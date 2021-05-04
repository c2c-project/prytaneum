declare global {
    declare namespace NodeJS {
        export interface ProcessEnv {
            NODE_ENV: string;
            NEXT_PUBLIC_GRAPHQL_URL: string;
        }
    }
}

export default {};
