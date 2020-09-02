/// <reference types="react-scripts" />

// declare global {
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_SERVER: string;
        REACT_APP_PROPUBLICA_API_KEY: string;
    }
}
// }
