import React from 'react';

import { AppBar } from '@local/components';
import { TeacherDashboard } from './TeacherDashboard';

export default async function DashboardPage() {
    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            <TeacherDashboard />
        </React.Fragment>
    );
}
