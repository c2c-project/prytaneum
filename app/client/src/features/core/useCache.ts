import * as React from 'react';

// TODO: could be extended to use session storage?
export function useCache<T>(initialValue: T) {
    const ref = React.useRef(initialValue);
    return ref.current;
}
