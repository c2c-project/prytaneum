import React from 'react';

interface useRefreshProps {
    refreshInterval: number; // in milliseconds
    callback: () => void;
}

export function useRefresh({ refreshInterval, callback }: useRefreshProps) {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [refreshPaused, setRefreshPaused] = React.useState(false);

    const pauseRefresh = React.useCallback(() => {
        setRefreshPaused(true);
    }, [setRefreshPaused]);

    const resumeRefresh = React.useCallback(() => {
        setRefreshPaused(false);
    }, [setRefreshPaused]);

    const refresh = React.useCallback(() => {
        if (isRefreshing || refreshPaused) return;
        setIsRefreshing(true);
        callback();
        setIsRefreshing(false);
    }, [refreshPaused, isRefreshing, callback]);

    React.useEffect(() => {
        const interval = setInterval(refresh, refreshInterval);
        return () => clearInterval(interval);
    }, [refresh, refreshInterval]);

    return { pauseRefresh, resumeRefresh };
}
