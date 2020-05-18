import React from 'react';

export default function useErrorHandler() {
    const handleError = (e) => console.error(e);
    // TODO: log this to server?
    return [handleError];
}
