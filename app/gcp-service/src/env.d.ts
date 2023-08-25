declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development' | 'staging' | 'test';
            PORT: string;
            HOST: string;
            ORIGIN: string;
            NODE_ENV: string;
            GCP_PROJECT_ID: string;
            GCP_BUCKET_NAME: string;
            POD_ID: string;
            LOG_LEVEL: string;
        }
    }
}

export {};
