import { Routes } from 'universal-router/sync';
import { Props as LayoutProps } from 'layout';

export type CustomLayout = {
    component: React.ReactElement;
    layoutProps: Omit<LayoutProps, 'children'>;
};
export type ActionReturn = React.ReactElement | CustomLayout;
export type PrytaneumRoutes = Routes<ActionReturn, MyContext>;
export const routes: PrytaneumRoutes = [];

export interface MyContext {
    query: Record<string, string>;
}

export function addRoutes(newRoutes: PrytaneumRoutes) {
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

export function areParamsValid<T extends string>(
    params: Record<string, string | string[]>,
    keys: T[]
): params is Record<T, string> {
    for (let i = 0; i < keys.length; i += 1) {
        if (!params[keys[i]]) return false;
        if (Array.isArray(params[keys[i]])) return false;
    }
    return true;
}
