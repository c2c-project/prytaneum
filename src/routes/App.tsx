import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Fade } from '@material-ui/core';
import { Update, State } from 'history';
import { makeStyles } from '@material-ui/core/styles';

import Page from 'layout/Page';
import history from 'utils/history';
import Nav from 'layout/Nav';

// for side effects (adding the routes)
import './Auth';
import './Townhall';

import { addRoutes, routes } from './utils';

addRoutes([
    {
        path: '/',
        action: () => (
            <div>
                <h1>Page One</h1>
                <a href='/two'>Page Two</a>
                <br />
                <a href='/eh'>404</a>
            </div>
        ),
    },
    {
        path: '/two',
        action: () => (
            <div>
                <h1>Page Two</h1>
                <a href='/'>Page One</a>
                <br />
                <a href='/eh'>404</a>
            </div>
        ),
    },
    { path: '(.*)', action: () => <h1>404</h1> },
]);
const router = new UniversalRouter<JSX.Element>(routes);

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

export default function App() {
    // const classes = useStyles();
    const [currPage, setCurrPage] = React.useState<PageState>(initialState);
    const [destPage, setDestPage] = React.useState<PageState>(initialState);

    const handleLocationChange = ({ location }: Update<State>) => {
        const result = router.resolve(location.pathname);
        const state = {
            component: result,
            key: location.key,
        };

        setDestPage(state);
    };

    React.useEffect(() => {
        // setup listener
        const unlisten = history.listen(handleLocationChange);

        // push initial state into the history
        history.push(history.location);

        // cleanup and unlisten on unrender
        return unlisten;
    }, []);

    React.useEffect(() => {
        if (currPage.component === null) setCurrPage(destPage);
    }, [destPage]);

    return (
        <div>
            <Nav />
            <Page key={currPage.key}>
                <Fade
                    in={history.location.key === currPage.key}
                    onExited={() => setCurrPage(destPage)}
                >
                    <div>{currPage.component}</div>
                </Fade>
            </Page>
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
        </div>
    );
}
