/* eslint-disable @typescript-eslint/indent */
// import { Resolvers as IResolvers } from '@local/graphql-types';
import mercurius, { IResolvers } from 'mercurius';
import * as Relay from 'graphql-relay';
import { Node, ResolversParentTypes, MutationResponse, Maybe } from '@local/graphql-types';


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
interface TFilterFieldArgs<TObj extends Record<string, unknown>, TKeys extends keyof TObj> {
    input: TObj;
    allowedFields: Record<TKeys, true>;
}

type TDefinedFields<TObj extends Record<string, unknown>> = {
    [Key in keyof TObj]: NonNullable<TObj[Key]>;
};
/**
 * ### Description
 * - `input` is an object to trim/filter
 * - `allowedFields` is a map consisting of keys possibly present in `input` and the boolean value `true`.  A whitelist is better
 * to maintain than a blacklist.  If using a blacklist, a scenario where you add sensitive information and forget to update the blacklist
 * is likely to happen and the "failure" is much worse than when using a whitelist.  When using a whitelist, the possible failure is that
 * the client does not get all of the data it needs, which is a simple bug to fix -- not a big deal.
 *
 * The result of this function is an object whose keys are the intersection of keys from `input` and `allowedFields`, and at
 * the same time trimming keys that are null or undefined within the `input` object.
 */
export function filterFields<TObj extends Record<string, unknown>, TKeys extends keyof TObj>({
    input,
    allowedFields,
}: TFilterFieldArgs<TObj, TKeys>): TDefinedFields<Pick<TObj, TKeys>> {
    return (
        // make entries based on allowedFields
        Object.entries(allowedFields)
            // create an entry array where each element is a 2 array tuple or an array of length 0 if input[key] is undefined or null
            .map(([key]) => (input[key] !== null && input[key] !== undefined ? ([key, input[key]] as const) : []))
            // trim every entry with length 0 -- input[key] was undefined or null
            .filter((entry) => entry.length !== 0)
            // build the object back up using each [key, value] tuple entry
            .reduce((accum, [k, v]) => ({ ...accum, [k]: v }), {}) as unknown as TDefinedFields<Pick<TObj, TKeys>>
    );
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
        const id = Relay.toGlobalId(type, obj.id);
        return { ...obj, id };
    };
}

type TCallback<TReturn> = () => Promise<TReturn> | TReturn;
type TRunMutationReturn<TReturn> = Promise<MutationResponse & { body: Maybe<TReturn> }>;
export async function runMutation<TReturn>(cb: TCallback<TReturn>): TRunMutationReturn<TReturn> {
    try {
        const result = await cb();
        return {
            isError: false,
            message: '',
            body: result,
        };
    } catch (e) {
        return {
            isError: true,
            message: e.message,
            body: null,
        };
    }
}
