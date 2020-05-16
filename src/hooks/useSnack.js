// import React from 'react';
import { useSnackbar } from 'notistack';

export default function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return [
        (message, type) => {
            enqueueSnackbar(message, { variant: type });
        },
        closeSnackbar
    ];
}
