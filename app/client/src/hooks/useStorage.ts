import React from 'react';

import * as Storage from 'utils/storage';

type SetFn = <T extends keyof Storage.Storage>(
    value: Storage.Storage[T]
) => void;

// get & set
type UtilityFns<T extends keyof Storage.Storage> = [Storage.Storage[T], SetFn];

export default function useStorage<T extends keyof Storage.Storage>(
    key: T
): UtilityFns<T> {
    const [state, setState] = React.useState(Storage.get(key));
    const set: SetFn = React.useCallback((value) => Storage.set(key, value), [
        key,
    ]);
    // const get = React.useCallback(() => Storage.get(key), [key]);

    // We could check if just the key changed is a key of the Storage interface
    // and only update if the key is a member of the Storage interface
    // however, it is unlikely, due to current design, that the key changed is NOT a part of the Storage interface
    // therefore, simply forcing an update and rerender of the component is easier/sufficient
    const handleStorageChange = React.useCallback(
        (event: StorageEvent) => {
            // NOTE: this ignores all event.newValues that are null
            // it would only ever be null when I clear, but I re-initialize right after, so there's no point
            // in doing anything with null values
            if (event.key !== key || !event.newValue) return;
            if (JSON.stringify(state) !== event.newValue)
                setState(JSON.parse(event.newValue) as Storage[T]);
        },
        [key, state]
    );

    React.useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [handleStorageChange]);

    return [state, set];
}
