import { Routes, Route } from 'universal-router/sync';
import { Props as LayoutProps } from 'layout';
import { ParsedQs } from 'qs';

export interface QueryContext {
    query: ParsedQs;
}
export type CustomLayout = {
    component: React.ReactElement;
    layoutProps: Omit<LayoutProps, 'children'>;
};
export type ActionResult = React.ReactElement | CustomLayout;
export type PrytaneumRoutes = Routes<ActionResult, QueryContext>;
export type PrytaneumRoute = Route<ActionResult, QueryContext>;
export const routes: PrytaneumRoutes = [];

export function addRoutes(newRoutes: PrytaneumRoutes) {
    routes.push(...newRoutes);
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
