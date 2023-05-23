import React from 'react';

interface useRefreshProps {
    refreshInterval: number; // in milliseconds
    callback: () => void;
}

export function useRefresh({ refreshInterval, callback }: useRefreshProps) {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        callback();
        setIsRefreshing(false);
    }, [isRefreshing, setIsRefreshing, callback]);

    React.useEffect(() => {
        const interval = setInterval(refresh, refreshInterval);
        return () => clearInterval(interval);
    }, [refresh, refreshInterval]);

    return;
}
