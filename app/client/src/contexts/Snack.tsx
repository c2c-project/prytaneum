/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, ProviderContext } from 'notistack';

interface Props {
    [index: string]: unknown;
    children: JSX.Element | JSX.Element[];
}

// eslint-disable-next-line react/prop-types
function SnackContext({ children, ...rest }: Props) {
    // add action to all snackbars
    const notistackRef = React.useRef<ProviderContext | null>(null);
    
    const onClickDismiss = (key: React.ReactText) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };
    
    return (
        <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
                <Button color='inherit' onClick={onClickDismiss(key)}>Dismiss</Button>
            )}
            {...rest}
        >
            {children}
        </SnackbarProvider>
    );
}

export default SnackContext;
