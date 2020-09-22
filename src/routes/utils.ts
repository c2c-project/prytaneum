import { Routes } from 'universal-router/sync';

export const routes: Routes<JSX.Element> = [];

export function addRoutes(newRoutes: Routes<JSX.Element>) {
    routes.push(...newRoutes);
}
