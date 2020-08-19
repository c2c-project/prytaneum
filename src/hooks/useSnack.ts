// import React from 'react';
import { useSnackbar } from 'notistack';

/** 
 * 
 * @category hooks
 * 
*/
export default function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return [
        (message: string, type: 'error' | 'success' | 'warning' | 'info') => {
            enqueueSnackbar(message, { variant: type });
        },
        closeSnackbar,
    ];
}
