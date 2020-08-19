/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider } from 'notistack';

/** @todo description
 *  @category Context
 *  @constructor SnackContext
 *  @todo params
*/
// eslint-disable-next-line react/prop-types
function SnackContext({ children, ...rest }) {
    // add action to all snackbars
    const notistackRef = React.createRef();
    const onClickDismiss = (k) => () => {
        notistackRef.current.closeSnackbar(k);
    };
    return (
        <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
                <Button onClick={onClickDismiss(key)}>Dismiss</Button>
            )}
            {...rest}
        >
            {children}
        </SnackbarProvider>
    );
}

export default SnackContext;
