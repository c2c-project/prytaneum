import React from 'react';
import AdminToolbar from './AdminToolbar';

export default { title: 'AdminDashboard/AdminToolbar' };

export function Primary() {
    return <AdminToolbar onLoadUsers={() => {}} />;
}
