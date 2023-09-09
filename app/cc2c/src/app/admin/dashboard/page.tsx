import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';

import { AppBar, UploadRoster } from '@local/components';
import { AdminDashboard } from './AdminDashboard';

export default async function AdminDashboardPage() {
    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore Server Component */}
            <AdminDashboard />
        </React.Fragment>
    );
}
