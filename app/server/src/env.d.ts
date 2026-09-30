declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development' | 'staging' | 'test';
            PORT: string;
            HOST: string;
            ORIGIN: string;
            COOKIE_SECRET: string;
            JWT_SECRET: string;
            NODE_ENV: string;
            GCP_PROJECT_ID: string;
            POD_ID: string;
            PUB_SUB_PREFIX: string;
            LOG_LEVEL: string;
            REDIS_HOST: string;
            REDIS_PORT: string;
            REDIS_USERNAME: string;
            REDIS_PASSWORD: string;
            REDIS_URL: string;
            GCLOUD_ISSUE_GUIDES_STORAGE_BUCKET: string;
            MODERATION_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REDIRECT_URI: string;
            GEMINI_API_KEY: string;
        }
    }
}

export {};
