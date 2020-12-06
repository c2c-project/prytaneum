import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Update, State } from 'history';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';

// import Page from 'layout/Page';
import history from 'utils/history';
import Nav from 'layout/Nav';
import Redirect from 'components/Redirect';

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
            return <Redirect href='/auth/login' />;
        },
    },
    {
        path: '/home',
        action: () => {
            return <Redirect replace href='/user/my-townhalls' />;
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

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
    // only keeping the below for example purposes, but it is not necessary
    '@keyframes slideInRight': {
        from: { transform: 'translateX(-100vw)' },
        to: { transform: 'translateX(0)' },
    },
    '@keyframes slideOutRight': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100vw)', visibility: 'hidden`' },
    },
    '@keyframes slideInLeft': {
        from: { transform: 'translateX(100vw)' },
        to: { transform: 'translateX(0)' },
    },
    '@keyframes slideOutLeft': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(100vw)', visibility: 'hidden' },
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    '@keyframes fadeOut': {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },
    navigateBack: {
        animationName: '$fadeIn',
        animationDuration: '400ms',
        overflow: 'visible',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    animationContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    main: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'auto',
    },
}));

const variants = {
    enter: (direction: number) => {
        if (direction === 0) return { opacity: 0 };
        return {
            zIndex: 0,
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        if (direction === 0) return { opacity: 0 };
        return {
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        };
    },
};

export default function App() {
    type PageDir = [PageState, 1 | 0 | -1];
    const [[currPage, dir], setCurrPage] = React.useState<PageDir>([
        initialState,
        0,
    ]);
    const depth = React.useRef<number>(0);
    const classes = useStyles();

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
        <div className={classes.root}>
            <Nav />
            <main className={classes.main}>
                <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                        key={currPage.key}
                        custom={dir}
                        variants={variants}
                        initial='enter'
                        animate='center'
                        exit='exit'
                        transition={{ ease: 'easeInOut' }}
                        className={classes.animationContainer}
                    >
                        {currPage.component}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
