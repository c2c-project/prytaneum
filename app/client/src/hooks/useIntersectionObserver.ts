import * as React from 'react';

export default function useIntersectionObserver(
    onIntersect: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    const ref = React.useRef<IntersectionObserver | null>(null);

    const getObserver = React.useCallback(() => {
        if (ref.current === null) {
            ref.current = new IntersectionObserver(onIntersect, options);
        }
        return ref.current;
    }, [onIntersect, options]);

    React.useEffect(() => () => getObserver().disconnect(), [getObserver]);

    return getObserver();
}
