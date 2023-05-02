export interface RoleGuardProps {
    organizer?: boolean;
    moderator?: boolean;
    admin?: boolean;
    children: JSX.Element | JSX.Element[];
}

/**
 * By default this component will not render any children unless the user is a moderator or an organizer of a particular event.
 */
export function RoleGuard({ organizer = false, moderator = false, admin = false, children }: RoleGuardProps) {
    if (organizer || moderator || admin) return <>{children}</>;
    return <></>;
}
