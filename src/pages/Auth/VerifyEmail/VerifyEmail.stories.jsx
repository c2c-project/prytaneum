import React from 'react';
import { MemoryRouter, Route, Switch, useHistory } from 'react-router-dom';
import { withKnobs, select } from '@storybook/addon-knobs';

import Fixtures from 'mock/Fixtures';
import routeNames from '../route-names';
import Page from '.';

export default { title: 'Pages/Auth', decorators: [withKnobs] };

const options = {
    success: {
        meta: {
            status: 200,
            statusText: 'OK',
        },
    },
    failure: {
        meta: {
            status: 500,
            statusText: 'Internal Server Error',
        },
    },
};

const defaultValue = options.success;

const Helper = () => {
    const history = useHistory();
    const [time, setTime] = React.useState(5);
    React.useEffect(() => {
        const handle = setTimeout(() => history.goBack(), 5000);
        const handle2 = setInterval(() => setTime((t) => t - 1), 1000);
        return () => {
            clearTimeout(handle);
            clearTimeout(handle2);
        };
    }, []);
    return <h1>{`Redirecting in ${time}`}</h1>;
};

export function VerifyEmail() {
    return (
        <Fixtures.Provider value={select('Outcome', options, defaultValue)}>
            <MemoryRouter initialEntries={['/123456']}>
                <Switch>
                    <Route path={routeNames.login}>
                        <Helper />
                    </Route>
                    <Route path='/:userId'>
                        <Page />
                    </Route>
                </Switch>
            </MemoryRouter>
        </Fixtures.Provider>
    );
}
