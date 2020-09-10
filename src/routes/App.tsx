import React from 'react';
import UniversalRouter from 'universal-router/sync';
import { Slide } from '@material-ui/core';
import { Update, State } from 'history';

import Page from 'layout/Page';
import history from 'utils/history';

const router = new UniversalRouter([
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

type PageState = {
    component: JSX.Element | null | undefined;
    key: string | null;
};
const initialState: PageState = {
    component: null,
    key: null,
};

export default function App() {
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

    return (
        <div>
            <Slide
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
            </Slide>
        </div>
    );
}
