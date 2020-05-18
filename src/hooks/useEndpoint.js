import React from 'react';
import API from '../contexts/API';

export default function useEndpoint(url, method = 'GET') {
    const _API = React.useContext(API);
    const request = new _API(url).method(method);
    return [request];
}
