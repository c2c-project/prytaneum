export interface RoleGuardProps {
    organizer?: boolean;
    moderator?: boolean;
    children: JSX.Element | JSX.Element[];
}

/**
 * By default this component will not render any children unless the user is a moderator or an organizer of a particular event.
 */
export function RoleGuard({ organizer = false, moderator = false, children }: RoleGuardProps) {
    if (organizer || moderator) return <>{children}</>;
    return <></>;
}
