/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_SERVER: string;
        REACT_APP_PROPUBLICA_API_KEY: string;
        REACT_APP_MSW: string;
        HOST: string;
    }
}
