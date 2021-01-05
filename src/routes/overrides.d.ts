import { RouteContext } from 'universal-router/sync';

declare module 'universal-router/sync' {
    interface RouteContext {
        query?: string;
    }
}
