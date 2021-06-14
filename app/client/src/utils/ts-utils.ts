/**
 * Maps each key of T to T[Key] | null
 */
export type NullableFields<T extends Record<string, unknown>> = {
    [Key in keyof T]: T[Key] | null;
};

/**
 * #### When to use
 * Sometimes it is inconvenient when a field is nullable for initial states; especially in forms.  Fix that inconvenience using this function.
 * __BEWARE__: This function will not take into account fields which are `undefined`, only `null`.
 *
 *
 * This is by design because `null` and `undefined` mean different things.
 * - `null` means that the field was queried, but the user couldn't access the field or no value was found.
 * - `undefined` means that the field was not queried.
 *
 * You should probably modify your query if you want to display the field `fizz` and it is `undefined` (not part of the query).
 * #### Description
 * - __Input:__ An initial state, `foo`, and an object from a graphql query, `bar`
 * - __Output:__ A `TState` object, where null fields within `bar` are replaced by the corresponding value from `foo`
 *
 * #### Example
 * ```ts
 * type Result = { readonly foo: String | null };
 * type TState = { foo: String };
 * const result: Result = someGraphQLQuery(...);
 * // if foo is null from the graphql query, it will be replaced with 'initial value'
 * const initialState: TState = makeInitialState({ foo: 'initial value' }, result);
 * ```
 */
export function makeInitialState<TState extends Record<string, unknown>>(
    initialState: TState,
    fromGraphQL?: NullableFields<TState>
): TState {
    if (!fromGraphQL) return initialState;
    const nonFalsyKeys = Object.keys(initialState).filter((key) => fromGraphQL[key] !== null);
    const nonFalsyEntries = nonFalsyKeys.map((key) => [key, fromGraphQL[key]]);
    return {
        ...initialState,
        ...Object.fromEntries(nonFalsyEntries),
    };
}

/**
 * extract array element type
 * src: https://stackoverflow.com/a/51399781/15437092
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

/**
 * #### Description
 * Utility to make one key in a map non-optional
 * 
 * #### Example
 * ```ts
 * type foo1 = { bar1: string; bar2?: string; };
 * type foo2 = PickRequired<foo1, 'bar2'>
 * // type foo2 = { bar1: string; bar2: string; };
 * // bar2 is not optional anymore
 * ```
 */
export type PickRequired<T extends Record<string, unknown>, TKey extends keyof T> = T & Required<Pick<T, TKey>>;
