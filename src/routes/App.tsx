import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Update, State } from 'history';
import { AnimatePresence } from 'framer-motion';

// import Container from 'layout/Page';
import history from 'utils/history';
import Layout from 'layout';
import Redirect from 'components/Redirect';
import Dashboard from 'pages/Dashboard';

// for side effects (adding the routes)
import './Auth';
import './Townhall';
import './User';
import './Join';
import './Preview';

import { addRoutes, routes, parseQueryString, MyContext } from './utils';

addRoutes([
    {
        path: '/',
        action: () => {
            return <Redirect href='/login' />;
        },
    },
    {
        path: '/home',
        action: () => {
            return <Redirect replace href='/app/home' />;
        },
    },
    {
        path: '/app/home',
        action: () => {
            return <Dashboard />;
        },
    },
    { path: '(.*)', action: () => <h1>Ooops! No page found.</h1> },
]);
const router = new UniversalRouter<JSX.Element, MyContext>(routes);

type PageState = {
    component: JSX.Element | null | undefined;
    key: string | null;
};
const initialState: PageState = {
    component: null,
    key: null,
};

export default function App() {
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
