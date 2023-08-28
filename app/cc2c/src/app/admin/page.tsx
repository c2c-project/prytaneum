import { Fragment } from 'react';

import { AppBar } from '@local/components';
import { Admin } from './admin';

export default async function AdminPage() {
    return (
        <Fragment>
            <AppBar />
            <Admin />
        </Fragment>
    );
}
