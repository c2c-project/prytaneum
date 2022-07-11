import * as React from 'react';
import { Hidden, Drawer, Toolbar } from '@mui/material';
import { ConditionalRender } from '@local/components';
import { UserSideNav, UserSideNavLoader, useUser } from '@local/features/accounts';

const Loader = () => (
    <Hidden lgDown>
        <UserSideNavLoader />
    </Hidden>
);

type SideNavProps = { isHidden: boolean; isOpen: boolean; close: () => void };
export function SideNav({ isHidden: _isHidden, isOpen, close }: SideNavProps) {
    const { user } = useUser();
    const isHidden = React.useMemo(() => _isHidden || !user, [_isHidden, user]);

    return (
        <>
            <ConditionalRender client>
                <React.Suspense fallback={isHidden ? <></> : <Loader />}>
                    <Drawer
                        variant={isHidden ? 'temporary' : 'permanent'}
                        open={isOpen}
                        onClose={close}
                        ModalProps={{
                            keepMounted: true, // slide in animation does not work otherwise
                        }}
                        sx={{
                            width: 250,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 250,
                                boxSizing: 'border-box',
                                padding: (theme) => theme.spacing(2, 0),
                            },
                        }}
                    >
                        {!isHidden && <Toolbar />}
                        <UserSideNav onClick={close} />
                    </Drawer>
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <Loader />
            </ConditionalRender>
        </>
    );
}
