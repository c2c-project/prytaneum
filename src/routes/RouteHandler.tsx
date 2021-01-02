import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Update, State } from 'history';
import { AnimatePresence } from 'framer-motion';

// import Container from 'layout/Page';
import history from 'utils/history';
import Layout from 'layout';

import { routes, parseQueryString, MyContext } from './utils';

const router = new UniversalRouter<React.ReactNode, MyContext>(routes);

type PageState = {
    component: React.ReactNode;
    key: string | null;
};
const initialState: PageState = {
    component: null,
    key: null,
};

export default function RouteHandler() {
    type PageDir = [PageState, 1 | 0 | -1];
    const [[currPage], setCurrPage] = React.useState<PageDir>([
        initialState,
        0, // dir, unused atm
    ]);
    const depth = React.useRef<number>(0);
    const handleLocationChange = React.useCallback(
        ({ location }: Update<State>) => {
            const result = router.resolve({
                pathname: location.pathname,
                query: parseQueryString(location.search),
            });
            const state = {
                component: result,
                key: location.key,
            };
            let newDir: 1 | 0 | -1 = 0;
            const destDepth = location.pathname.split('/').length;
            if (depth.current === 0) {
                newDir = 0;
            } else if (depth.current === destDepth) {
                newDir = 0;
            } else if (depth.current < destDepth) {
                newDir = 1;
            } else {
                newDir = -1;
            }

            depth.current = destDepth;
            setCurrPage([state, newDir]);
        },
        [setCurrPage]
    );

    React.useEffect(() => {
        // setup listener
        const unlisten = history.listen(handleLocationChange);

        // replace initial state into the history
        // replace so that refreshing isn't a push
        history.replace(history.location);

        // cleanup and unlisten on unrender
        return unlisten;
    }, [handleLocationChange]);
    return (
        <Layout>
            <AnimatePresence>{currPage.component}</AnimatePresence>
        </Layout>
    );
}
