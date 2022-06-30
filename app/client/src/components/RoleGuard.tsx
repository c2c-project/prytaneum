import { useUser } from '@local/features/accounts';
export interface RoleGuardProps {
    organizer?: boolean;
    children: JSX.Element | JSX.Element[];
}

// By default this component will not render any children unless the user is an organizer
export function RoleGuard({ organizer, children }: RoleGuardProps) {
    const [user] = useUser();
    if (!user) return <></>; // if user is not logged in
    if (user.isOrganizer && organizer) return <>{children}</>; // if user is organizer
    return <></>; // if the user is logged in but not an organizer // bug: isOrganizer is not returning correctly
}
