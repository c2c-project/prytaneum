/// <reference types="react-scripts" />

// declare global {
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_SERVER: string;
    }
}
// }
