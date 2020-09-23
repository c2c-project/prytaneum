import Loader from 'components/Loader';
import React from 'react';
/**
 * Brainstorming
 * 1. Make sure that we only fetch the NEXT data and not current data
 * 2. It may be something like 1-10 is currently shown and we need to keep track of that
 * then after they reach the trigger, we fetch 11-20
 * 3. That might look like this /api/some-list?page=1&limit=10 then on scroll /api/some-list?page=2&limit=10
 */

// Things that will need to change for FeedbackPortal API:
//   - Optional: add a limit query to GET endpoints
//   - Return a hasNext boolean value to let the client know if there are more pages to retrieve

// Potential Props: Children, HasMore, LoadMore, isLoading, initialLoad
// Could use an already existing infinite scroll package such as
interface Props {
    children: JSX.Element | JSX.Element[];
    loadMore: null | (() => void);
    isLoading: boolean;
    // hasMore: boolean;
}
// TODO: add loader somewhere? I don't know if this should be in parent component or this one -- probably this one?
export default function InfiniteScroll({
    children,
    loadMore,
    isLoading,
}: // hasMore,
Props) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    // const [page, setPage] = React.useState(1);
    // const [showLoader, setShowLoader] = React.useState(false);
    const handleScroll = () => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        // FIXME: || 0 MAY BE A BUG AND IT MAY BE BETTER TO DO SOMETHING ELSE

        // getBoundingClientRect.top returns the distance from the top of the page to the top of the 'bottom-of-page' divisor
        const top = ref.current?.getBoundingClientRect()?.top || 0;
        // window.innerHeight returns interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
        // We load more item if:
        //  - User has scrolled to the bottom of the page
        //  - There is no request currently loading
        //  - The API has more pages to return
        if (top >= 0 && top <= window.innerHeight && !isLoading) {
            console.log('visible');
            if (loadMore) loadMore();
            // TODO: trigger something because they've reached the bottom of the page
        }
    };
    return (
        // TODO: onScroll does not work with div
        <main onScroll={handleScroll}>
            {children}
            {/* {isLoading && <Loader />} */}
            {isLoading && <h1>Loading...</h1>}
            <div id='bottom-of-page' ref={ref} />
        </main>
    );
}
