export interface RoleGuardProps {
    authenticated?: boolean;
    organizer?: boolean;
    moderator?: boolean;
    children: JSX.Element | JSX.Element[];
}

/**
 * By default this component will not render any children unless the user is authenticated a moderator or an organizer of a particular event.
 */
export function RoleGuard({ authenticated = false, organizer = false, moderator = false, children }: RoleGuardProps) {
    if (authenticated || organizer || moderator) return <>{children}</>;
    return <></>;
}
