/* eslint-disable */
import React from 'react';

import { debounce, Callback } from 'utils';

const defaultTimeout = 100;
export default function useDebounce<T extends Callback>(
    cb: T,
    deps: React.DependencyList,
    timeout?: number
) {
    // FIXME:
    // const _cb = React.useCallback(
    //     () => debounce(cb, timeout || defaultTimeout),
    //     [...deps, cb, timeout]
    // );
    return () => {};
}
