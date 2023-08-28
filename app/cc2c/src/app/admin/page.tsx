import { Fragment } from 'react';

import { AppBar } from '@local/components';
import { Admin } from './Admin';

export default async function AdminPage() {
    return (
        <Fragment>
            <AppBar />
            <Admin />
        </Fragment>
    );
}
