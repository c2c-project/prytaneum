import React from 'react';

import { debounce, Callback } from 'utils';

export default function useDebounce<T extends Callback>(
    cb: T,
    deps: React.DependencyList,
    timeout = 100
) {
    const _cb = React.useCallback(debounce<T>(cb, timeout), deps);
    return _cb;
}
