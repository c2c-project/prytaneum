import React from 'react';

// TODO: could be extended to use session storage?
export default function useCache<T>(initialValue: T) {
    const ref = React.useRef(initialValue);
    return ref.current;
}
