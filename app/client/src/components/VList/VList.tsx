/* eslint-disable */ // FIXME:
import * as React from 'react';

import useCache from '@local/hooks/useCache';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    onLoadMore: () => void;
    loadDir: 'bottom' | 'top';
}

interface Cache {
    average: number;
    totalHeight: number;
    heights: number[];
    renderedNodes: [HTMLDivElement, number][];
}

export default function VList({ children, onLoadMore, loadDir }: Props) {
    const observerRef = React.useRef<IntersectionObserver | null>(null);
    const [childNodes, setChildNodes] = React.useState(() =>
        React.Children.toArray(children)
    );
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [slice, setSlice] = React.useState<[number, number]>([0, 1]);
    const [paddingTop, setPaddingTop] = React.useState(0);
    const cache = useCache<Cache>({
        average: 0,
        totalHeight: 0,
        heights: new Array<number>(childNodes.length).fill(0),
        renderedNodes: [],
    });

    function onIntersect(
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
    ) {
        // may be used later for animating in or out something
    }

    function getObserver() {
        if (observerRef.current === null) {
            observerRef.current = new IntersectionObserver(onIntersect, {
                threshold: 0.3,
            });
        }
        return observerRef.current;
    }

    function initializeCache() {
        const currentPageHeights = cache.heights
            .slice(...slice)
            .filter((n) => n !== 0);
        cache.average =
            currentPageHeights.reduce((accum, n) => n + accum, 0) /
            currentPageHeights.length;
    }

    function addRenderedNode(node: HTMLDivElement, idx: number) {
        if (idx >= slice[0] && idx <= slice[1]) {
            cache.renderedNodes.push([node, idx]);
        } else {
            console.log('wrong');
        }
    }

    function updateRenderedNodes(startIdx: number, endIdx: number) {
        cache.renderedNodes = cache.renderedNodes.filter(
            ([, idx]) => idx >= startIdx && idx <= endIdx
        );
    }

    function resizeCache() {
        const diff = childNodes.length - cache.heights.length;
        if (loadDir === 'top') {
            cache.heights = new Array<number>(diff)
                .fill(cache.average)
                .concat(cache.heights);

            // offset the indices of all currently rendered nodes
            cache.renderedNodes = cache.renderedNodes.map(([node, idx]) => [
                node,
                idx + diff,
            ]);

            // now we must make sure all nodes are ejected that shouldn't be in the cache(most likely all)
            updateRenderedNodes(...slice);
        } else if (loadDir === 'bottom') {
            cache.heights.concat(new Array<number>(diff).fill(cache.average));
        }
        cache.totalHeight += cache.average * diff;

        initializeCache();
    }

    function recordHeight(node: HTMLDivElement, idx: number) {
        // current node height and previous node height
        const nodeHeight = node.getBoundingClientRect().height;
        const prevHeight = cache.heights[idx];

        // only if they aren't equal, perform calculations
        if (nodeHeight !== prevHeight) {
            const heightDiff = nodeHeight - prevHeight;
            cache.heights[idx] = nodeHeight;
            cache.totalHeight += heightDiff;
            const nonZeroHeights = cache.heights.filter((n) => n !== 0).length;

            // recalculate average based on the total height and non-zero heights
            cache.average = Math.round(cache.totalHeight / nonZeroHeights);
        }
    }

    function recalculateHeights() {
        cache.heights.fill(0);
        // re-measure heights
        for (let i = 0; i < cache.renderedNodes.length; i += 1) {
            const [node, idx] = cache.renderedNodes[i];
            recordHeight(node, idx);
        }

        // save previous average
        // const previousAverage = cache.average;

        // re-initalize
        const nonZeroHeights = cache.heights.filter((n) => n !== 0);
        cache.average =
            nonZeroHeights.reduce((accum, n) => accum + n, 0) /
            nonZeroHeights.length;

        // // recalculate average from scratch

        // TODO: something is wrong here on window resize
        // loop through and update all of the old averages with the new one
        // const start = cache.heights.slice(0, slice[0]).fill(cache.average);
        // const end = cache.heights
        //     .slice(slice[1] + 1, cache.heights.length)
        //     .fill(cache.average);
        // const middle = cache.heights.slice(slice[0], slice[1] + 1);
        // cache.heights = start.concat(middle).concat(end);
        // cache.heights = cache.heights.map((height) =>
        //     height === previousAverage ? cache.average : height
        // );

        // apply appropriate changes to the padding top
        setPaddingTop(() =>
            cache.heights
                .slice(0, slice[0])
                .reduce(
                    (accum, n) => (n === 0 ? accum + cache.average : accum + n),
                    0
                )
        );
    }

    function observe(node: HTMLDivElement | null, idx: number) {
        if (node) {
            recordHeight(node, idx);
            addRenderedNode(node, idx);
        }
    }

    // from and to and indices representing what the start updated from and to
    function updatePaddingTop(from: number, to: number) {
        if (from > to) {
            // if I'm scrolling up
            setPaddingTop((prevPadding) =>
                cache.heights
                    .slice(to, from)
                    .reduce((accum, n) => accum - n, prevPadding)
            );
        } else if (from < to) {
            // if I'm scrolling down
            setPaddingTop((prevPadding) =>
                cache.heights
                    .slice(from, to)
                    .reduce((accum, n) => accum + n, prevPadding)
            );
        } else {
            // do nothing because if they're equal padding shouldn't change
        }
    }

    // will change the padding above and below
    function updateProjection() {
        if (containerRef.current) {
            // destructuring
            const { average } = cache;
            const { offsetHeight, scrollTop } = containerRef.current;

            // calculating indices
            const itemsPerPage = Math.ceil(Math.max(offsetHeight / average));
            const startIdx = Math.ceil(Math.max(scrollTop / average));
            const endIdx = startIdx + itemsPerPage; // not technically correct, but good enough

            // calculating buffers of 1 page before and 1 page after
            const startBuffer = Math.ceil(Math.max(0, startIdx - itemsPerPage));
            const endBuffer = Math.ceil(
                Math.min(childNodes.length, endIdx + itemsPerPage)
            );

            // perform appropriate updates based on calculations
            // cache updates
            updateRenderedNodes(startBuffer, endBuffer);

            // react state updates
            updatePaddingTop(slice[0], startBuffer);
            setSlice([startBuffer, endBuffer]);
        }
    }

    React.useEffect(() => () => getObserver().disconnect(), []);
    React.useEffect(() => {
        setChildNodes(React.Children.toArray(children));
    }, [children]);
    React.useLayoutEffect(() => {
        updateProjection();
        resizeCache();
    }, [childNodes]);
    React.useLayoutEffect(initializeCache, []);
    React.useLayoutEffect(() => {
        window.addEventListener('resize', recalculateHeights);
        return () => window.removeEventListener('resize', recalculateHeights);
    }, []);

    // FIXME: make this a state so that we can incrementally adjust this
    const paddingBottom = cache.heights
        .slice(slice[1] + 1, childNodes.length)
        .reduce((accum, n) => (n === 0 ? n + cache.average : n + accum), 0);

    return (
        <div
            style={{
                maxHeight: '100%', // must have to make it a scrollable area within the div
                minHeight: '100%', // must have to make the div take up 100% of parent
                overflowY: 'scroll', // scrollability is always on
            }}
            onScroll={updateProjection}
            ref={containerRef}
        >
            <div
                style={{
                    height: `${paddingTop}px`,
                }}
            />
            {childNodes.slice(...slice).map((child, idx) => {
                if (React.isValidElement(child)) {
                    return (
                        <div
                            ref={(node: HTMLDivElement) =>
                                observe(node, idx + slice[0])
                            }
                            key={child.key}
                        >
                            {child}
                        </div>
                    );
                }
                return null;
            })}
            <div
                style={{
                    height: `${paddingBottom}px`,
                }}
            />
        </div>
    );
}
