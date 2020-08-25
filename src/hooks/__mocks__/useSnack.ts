// import React from 'react';
import { useSnackbar } from 'notistack';

interface Options {
    action?: JSX.Element;
    onExited?: () => void;
}

export default function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return [
        (message: string, 
            type: 'error' | 'success' | 'warning' | 'info' | 'default', 
            options?: Options
        ) => {
            enqueueSnackbar(message, { 
                variant: type,
                action: options?.action,
                onExited: options?.onExited,
            });
        },
        closeSnackbar,
    ];
}

/*
export default function useSnack() {
    return [
        () => {
            return true;
        },
        () => {
            return false;
        },
    ];
}
*/