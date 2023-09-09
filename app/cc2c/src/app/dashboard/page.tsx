import { Fragment } from 'react';

import { AppBar } from '@local/components';
import { StudentDashboard } from './StudentDashboard';

export default async function DashboardPage() {
    return (
        <Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            <StudentDashboard />
        </Fragment>
    );
}
