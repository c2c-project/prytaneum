/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import UniversalRouter, { RouteResultSync } from 'universal-router/sync';
import { Update, State } from 'history';
import { AnimatePresence } from 'framer-motion';

// import Container from 'layout/Page';
import history from 'utils/history';
import Layout, { Props as LayoutProps } from 'layout';

import {
    routes,
    parseQueryString,
    MyContext,
    ActionReturn,
    CustomLayout,
} from './utils';

const router = new UniversalRouter<ActionReturn, MyContext>(routes);

type PageState = {
    component: React.ReactNode;
    key: string;
    layoutProps: Omit<LayoutProps, 'children'>;
};
const initialState: PageState = {
    component: null,
    key: '',
    layoutProps: {},
};

function isCustomLayout(
    result: RouteResultSync<ActionReturn>
): result is CustomLayout {
    return (result as CustomLayout).layoutProps !== undefined;
}

// type PageDir = [PageState, 1 | 0 | -1];
export default function RouteHandler() {
    const [page, setPage] = React.useState<PageState>(initialState);
    // const [layoutProps, setLayoutProps] = React.useState<
    //     Omit<LayoutProps, 'children'>
    // >({});
    // const depth = React.useRef<number>(0);
    const handleLocationChange = React.useCallback(
        ({ location }: Update<State>) => {
            const result = router.resolve({
                pathname: location.pathname,
                query: parseQueryString(location.search),
            });

            // let newDir: 1 | 0 | -1 = 0;
            // const destDepth = location.pathname.split('/').length;
            // if (depth.current === 0) {
            //     newDir = 0;
            // } else if (depth.current === destDepth) {
            //     newDir = 0;
            // } else if (depth.current < destDepth) {
            //     newDir = 1;
            // } else {
            //     newDir = -1;
            // }

            if (!result) return;
            let component: React.ReactNode;
            let newLayoutProps: Omit<LayoutProps, 'children'> = {};

            if (isCustomLayout(result)) {
                component = result.component;
                newLayoutProps = result.layoutProps;
            } else {
                component = result;
            }

            // depth.current = destDepth;
            setPage({
                component,
                key: location.key,
                layoutProps: newLayoutProps,
            });
            // if (newLayoutProps) setLayoutProps(newLayoutProps);
        },
        [setPage]
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
        <Layout {...page.layoutProps}>
            <AnimatePresence>{page.component}</AnimatePresence>
        </Layout>
    );
}
