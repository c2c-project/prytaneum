// import { Resolvers as IResolvers } from '@local/graphql-types';
import mercurius, { IResolvers } from 'mercurius';

/**
 * Resolver type used for making resolvers
 */
export type Resolvers = IResolvers;
export const { withFilter } = mercurius;

// convenience export
export type Maybe<T> = T | null | undefined;

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
