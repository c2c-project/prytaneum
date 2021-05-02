import * as React from 'react';

import useIntersectionObserver from '@local/hooks/useIntersectionObserver';

export default function useScrollTo(anchor: React.RefObject<HTMLElement>) {
    const [isAnchorInView, setIsAnchorInView] = React.useState<boolean>(false);
    const isObserving = React.useRef(false);
    const onIntersect = React.useCallback<IntersectionObserverCallback>(
        // there should only ever be one entry, so this is fine
        // NOTE: on firefox, sometimes there will be multiple entries for the same element when there should only be one
        // on chrome this is not an issue
        ([entry]) => setIsAnchorInView(entry.isIntersecting),
        [setIsAnchorInView]
    );
    const io = useIntersectionObserver(onIntersect);
    const firstRender = React.useRef(true);
    const scrollToAnchor = (behavior: 'smooth' | 'auto') => {
        if (!anchor.current) return;
        anchor.current.scrollIntoView({
            behavior,
        });
    };

    const handleAutoScroll = () => {
        if (anchor.current && isAnchorInView) {
            scrollToAnchor(firstRender.current ? 'smooth' : 'auto');
        }
    };

    React.useEffect(() => {
        firstRender.current = false;
        return () => io.disconnect();
    }, [io]);

    React.useLayoutEffect(handleAutoScroll);

    // whenever scrollTarget.current changes, disconnect and observe
    // may be optimizations I could do here
    React.useEffect(() => {
        if (!anchor.current) return;
        if (isObserving.current === true) return;
        isObserving.current = true;
        io.observe(anchor.current);
    });

    return [scrollToAnchor, isAnchorInView] as const;
}
