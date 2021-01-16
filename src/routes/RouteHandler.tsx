/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { RouteResultSync } from 'universal-router/sync';
import { Update, State } from 'history';
import { AnimatePresence } from 'framer-motion';

// import Container from 'layout/Page';
import history from 'utils/history';
import Layout, { Props as LayoutProps } from 'layout';
import useRouter from 'hooks/useRouter';

import { routes, ActionResult, CustomLayout } from './utils';

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
    result: RouteResultSync<ActionResult>
): result is CustomLayout {
    return (result as CustomLayout).layoutProps !== undefined;
}

export default function RouteHandler() {
    const [page, setPage] = React.useState<PageState>(initialState);
    const router = useRouter(routes);
    const handleLocationChange = React.useCallback(
        ({ location }: Update<State>) => {
            const result = router.resolve({
                pathname: location.pathname,
                query: location.search,
            });

            if (!result) return;
            let component: React.ReactNode;
            let newLayoutProps: Omit<LayoutProps, 'children'> = {};

            if (isCustomLayout(result)) {
                component = result.component;
                newLayoutProps = result.layoutProps;
            } else {
                component = result;
            }

            setPage({
                component,
                key: location.key,
                layoutProps: newLayoutProps,
            });
        },
        [setPage, router]
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
