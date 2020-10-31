import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Update, State } from 'history';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';

// import Page from 'layout/Page';
import history from 'utils/history';
import Nav from 'layout/Nav';
import Redirect from 'components/Redirect';
import useCache from 'hooks/useCache';

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
}));

const variants = {
    enter: (direction: number) => {
        if (direction === 0) return { opacity: 0 };
        return {
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
            x: direction < 0 ? -300 : 300,
            opacity: 0,
        };
    },
};

export default function App() {
    // TODO: NEED TO DETERMINE DIRECTION BETTER
    // const classes = useStyles();
    const [[currPage, dir], setCurrPage] = React.useState<
        [PageState, 1 | 0 | -1]
    >([initialState, 0]);
    let depth = useCache<number>(0);
    // const [dir, setDir] = React.useState<-1 | 0 | 1>(1);

    const handleLocationChange = ({ location }: Update<State>) => {
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
        if (depth === 0) {
            newDir = 0;
        } else if (depth === destDepth) {
            newDir = 0;
        } else if (depth < destDepth) {
            newDir = 1;
        } else {
            newDir = -1;
        }
        // console.log(newDir, depth, destDepth);
        depth = destDepth;
        setCurrPage([state, newDir]);
        // setTimeout(() => {
        // setCurrPage(state);
        // }, 25);
    };

    React.useEffect(() => {
        // setup listener
        const unlisten = history.listen(handleLocationChange);

        // replace initial state into the history
        // replace so that refreshing isn't a push
        history.replace(history.location);

        // cleanup and unlisten on unrender
        return unlisten;
    }, []);

    // React.useEffect(() => {
    //     if (currPage.component === null) setCurrPage(destPage);
    // }, [destPage, currPage.component]);

    // React.useEffect(() => {}, [history.location.key]);
    // console.log(dir);
    return (
        <>
            {/* <Page key={currPage.key}> */}
            <Nav />
            <h1 style={{ position: 'absolute', top: '50px' }}>{dir}</h1>
            <main style={{ overflow: 'hidden' }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currPage.key}
                        custom={dir}
                        variants={variants}
                        initial='enter'
                        animate='center'
                        exit='exit'
                        // initial={{ x: 300, opacity: 0 }}
                        // animate={{ x: 0, opacity: 1 }}
                        // exit={{ x: -300, opacity: 0 }}
                        transition={{ ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        {currPage.component}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* <Fade
                key={currPage.key}
                in={history.location.key === currPage.key}
                onExited={() => setCurrPage(destPage)}
            >
                <div
                    style={{
                        height: 'inherit',
                        width: 'inherit',
                    }}
                >
                    {currPage.component}
                </div>
            </Fade> */}

            {/* </Page> */}
            {/* <Slide
                key={currPage.key}
                in={history.location.key === currPage.key}
                direction='right'
                timeout={400}
            >
                <Page>
                    <div>{currPage.component}</div>
                </Page>
            </Slide>
            <Slide
                key={destPage.key || 'nextPage'}
                in={history.location.key === destPage.key}
                direction='left'
                onEntered={() => {
                    setCurrPage(destPage);
                    setDestPage(initialState);
                }}
                timeout={400}
            >
                <Page>
                    <div>{destPage.component}</div>
                </Page>
            </Slide> */}
        </>
    );
}
