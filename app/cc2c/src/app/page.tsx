import { AppBar } from '@local/components';
import { Fragment } from 'react';
import Landing from './landing';

export default async function LandingPage() {
    return (
        <Fragment>
            <AppBar />
            <Landing />
        </Fragment>
    );
}
