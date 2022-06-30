export interface RoleGuardProps {
    organizer?: boolean;
    moderator?: boolean;
    children: JSX.Element | JSX.Element[];
}

export function RoleGuard({ organizer = false, moderator = false, children }: RoleGuardProps){
    if (organizer) return <>{children}</>
    if (moderator) return <>{children}</>
    return <></>
}