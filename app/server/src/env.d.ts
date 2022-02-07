declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            HOST: string;
            COOKIE_SECRET: string;
            JWT_SECRET: string;
            NODE_ENV: string;
            GCP_PROJECT_ID: string;
        }
    }
}

export {};
