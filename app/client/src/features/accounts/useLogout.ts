import { useMutation, graphql } from 'react-relay';
import { useLogoutMutation } from '@local/__generated__/useLogoutMutation.graphql';
import { useIsClient, useEnvironment } from '@local/core';

const USE_LOGOUT_MUTATION = graphql`
    mutation useLogoutMutation {
        logout
    }
`;

interface Props {
    onComplete?: () => void;
}

// Logs out the user using mutation & setting user context to null
export default function useLogout({ onComplete }: Props) {
    const { resetEnv } = useEnvironment();
    const [runMutation] = useMutation<useLogoutMutation>(USE_LOGOUT_MUTATION);
    const isClient = useIsClient();

    const logoutUser = () => {
        if (!isClient) return;
        runMutation({
            variables: {},
            onCompleted() {
                resetEnv();
                if (onComplete) onComplete();
            },
        });
    };

    return { logoutUser };
}
