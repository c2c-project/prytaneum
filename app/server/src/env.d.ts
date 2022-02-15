declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development' | 'staging' | 'test';
            PORT: string;
            HOST: string;
            COOKIE_SECRET: string;
            JWT_SECRET: string;
            NODE_ENV: string;
            GCP_PROJECT_ID: string;
            POD_ID: string;
            PUB_SUB_PREFIX: string;
            LOG_LEVEL: string;
        }
    }
}

export {};
