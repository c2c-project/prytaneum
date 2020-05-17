import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
    window.localStorage.clear();
    console.log('rendered');
    return <Redirect to='/login' />;
}
