/* eslint-disable @typescript-eslint/indent */
// import { Resolvers as IResolvers } from '@local/graphql-types';
import mercurius, { IResolvers } from 'mercurius';
import * as Relay from 'graphql-relay';
import { Node, ResolversParentTypes } from '@local/graphql-types';

/**
 * Resolver type used for making resolvers
 */
export type Resolvers = IResolvers;
export const { withFilter } = mercurius;

/**
 * common error messages
 */
export const errors = {
    /**
     * Error thrown if there is no user logged in
     */
    noLogin: 'Must be logged in',
    /**
     * Error thrown if there are invalid arguments
     */
    invalidArgs: 'Missing arguments', // TODO: should be handled by joi to tell what arguments are missing
    /**
     * Error thrown if something doesn't exist
     * @arg thing the "thing" that doesn't exist as a string ex. "User does not exist"
     */
    DNE: (thing: string) => `${thing} does not exist!`,
    /**
     * Error thrown if there are insufficient permissions
     */
    permissions: 'Insufficient permissions',
};

/**
 * filters out any keys from an object where the value is falsy
 * does NOT recursively do this, ie at most 1 depth
 */
export function filterOutUndefined<T extends Record<string, unknown>>(obj: T) {
    const entries = Object.entries(obj);
    return entries
        .filter(([_, value]) => value !== undefined)
        .reduce((accum, [key, value]) => ({ ...accum, [key]: value }), {});
}

/**
 * Curried function for converting all objects to a global id
 * ```ts
 * const toFooId = toGlobalId('Foo'); // Assuming Foo is some graphql type
 * // ...
 * const formattedFoo = toFooId(someFooObj);
 * ```
 */
export function toGlobalId(type: NonNullable<ResolversParentTypes['Node']['__typename']>) {
    return <T extends Node | null>(obj: T): T => {
        if (obj === null) return obj;
        return { ...obj, id: Relay.toGlobalId(type, obj.id) };
    };
}
