import { Routes } from 'universal-router/sync';

export const routes: Routes<JSX.Element, MyContext> = [];

export interface MyContext {
    query: Record<string, string>;
}

export function addRoutes(newRoutes: Routes<JSX.Element, MyContext>) {
    routes.push(...newRoutes);
}

export function parseQueryString(str: string): Record<string, string> {
    if (str[0] !== '?') return {};
    if (str.length === 1) return {};
    // fancy one liner cause why not
    const entries = str
        .slice(1)
        .split('&')
        .map((pair) => pair.split('=')) as [string, string][];
    return Object.fromEntries(entries);
}
