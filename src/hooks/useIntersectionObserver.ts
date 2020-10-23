import React from 'react';

export default function useIntersectionObserver(
    onIntersect: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    const ref = React.useRef<IntersectionObserver | null>(null);

    function getObserver() {
        if (ref.current === null) {
            ref.current = new IntersectionObserver(onIntersect, options);
        }
        return ref.current;
    }

    React.useEffect(() => getObserver().disconnect(), []);

    return getObserver();
}
