import * as React from 'react';
import { useQueryLoader } from 'react-relay';
import { Hidden, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import type { UserSideNavQuery } from '@local/__generated__/UserSideNavQuery.graphql';
import { ConditionalRender } from '@local/components';
import { UserSideNav, USER_SIDE_NAV_QUERY, UserSideNavProps, UserSideNavLoader } from '@local/features/accounts';
import { useUser } from '@local/hooks';

const Loader = () => (
    <Hidden mdDown>
        <UserSideNavLoader />
    </Hidden>
);

type PreloadedUserSideNavProps = Omit<UserSideNavProps, 'queryRef'>;
export function PreloadUserSideNav(props: PreloadedUserSideNavProps) {
    const [queryRef, loadQuery] = useQueryLoader<UserSideNavQuery>(USER_SIDE_NAV_QUERY);
    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [queryRef, loadQuery]);

    if (!queryRef) return <Loader />;

    return <UserSideNav queryRef={queryRef} {...props} />;
}

const useStyles = makeStyles((theme) => ({
    drawer: {
        padding: theme.spacing(2, 0),
    },
}));
type SideNavProps = { isHidden: boolean; isOpen: boolean; close: () => void };
export function SideNav({ isHidden: _isHidden, isOpen, close }: SideNavProps) {
    const classes = useStyles();
    const [user] = useUser();
    const isHidden = React.useMemo(() => _isHidden || !user, [_isHidden, user]);

    return (
        <>
            <ConditionalRender client>
                <React.Suspense fallback={isHidden ? <></> : <Loader />}>
                    <Drawer
                        variant={isHidden ? 'temporary' : 'permanent'}
                        classes={{ paper: classes.drawer }}
                        open={isOpen}
                        onClose={close}
                        ModalProps={{
                            keepMounted: true, // slide in animation does not work otherwise
                        }}
                    >
                        <PreloadUserSideNav onClick={close} />
                    </Drawer>
                    {!isHidden && <div style={{ paddingRight: 240 }} />}
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <Loader />
            </ConditionalRender>
        </>
    );
}
