import React from 'react';

import Loader from 'components/Loader';

interface Props {
    children: JSX.Element | JSX.Element[];
    loadMore: null | (() => void);
    isLoading: boolean;
}
export default function InfiniteScroll({
    children,
    loadMore, // Note: If loadMore is null then there are no more pages to fetch (This is handled in the parent component. See ExampleInfiniteScroll.tsx)
    isLoading,
}: Props) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const handleScroll = () => {
        const top = ref.current?.getBoundingClientRect()?.top || 0;
        // Note: window.innerHeight returns interior height of the window in pixels, including the height of the horizontal scroll bar, if present.

        // We call loadMore if:
        //  - User has scrolled to the bottom of the page
        //  - There is no request currently loading
        if (top >= 0 && top <= window.innerHeight && !isLoading) {
            if (loadMore) loadMore();
        }
    };
    return (
        // TODO: onScroll does not work with div. Might need to use a ref and state in the main element (https://github.com/Bedrock-Layouts/Bedrock/blob/master/packages/use-stateful-ref/examples/basic.example.tsx)
        <main onScroll={handleScroll}>
            {children}
            {isLoading && (
                <div style={{ height: 1 }}>
                    <Loader />
                </div>
            )}
            <div id='bottom-of-page' ref={ref} />
        </main>
    );
}
