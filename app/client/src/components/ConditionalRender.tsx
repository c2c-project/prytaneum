import { useIsClient } from '@local/hooks';

export interface ConditionalRenderProps {
    server?: boolean;
    client?: boolean;
    children: JSX.Element | JSX.Element[];
}

/**
 * Use to ensure React.Suspense is only used on client
 */
export function ConditionalRender({ client = false, server = false, children }: ConditionalRenderProps) {
    const isClient = useIsClient();

    if (isClient && client) return <>{children}</>;
    if (!isClient && server) return <>{children}</>;
    return <></>;
}
