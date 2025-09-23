import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

import { PreloadedEventLiveModratorView, EventLiveLoader } from '@local/features/events';

// Type guard for event ID validation
function isValidEventId(id: unknown): id is string {
    return typeof id === 'string' && id.length > 0;
}

// Styled component for better performance
const Container = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(3, 3, 0, 3), // add top padding so event video doesn't touch navbar
    },
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(0, 3),
    },
}));

// Error boundary component
class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): { hasError: boolean } {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Moderator page error:', error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: '100%' },
        disablePadding: true,
    };

    return { props: baseProps };
}

const EventModeratorPage: NextPage = React.memo(() => {
    const router = useRouter();

    if (!router.isReady) return <EventLiveLoader />;

    // Validate event ID
    const eventId = router.query.id;
    if (!isValidEventId(eventId)) {
        return (
            <Container>
                <div role='alert' aria-live='polite'>
                    Invalid event ID. Please check the URL and try again.
                </div>
            </Container>
        );
    }

    return (
        <Container role='main' aria-label='Event Moderation Panel' aria-busy={!router.isReady}>
            <ErrorBoundary
                fallback={
                    <div role='alert' aria-live='assertive'>
                        Something went wrong loading the moderator view. Please refresh the page.
                    </div>
                }
            >
                <React.Suspense fallback={<EventLiveLoader />}>
                    <PreloadedEventLiveModratorView eventId={eventId} />
                </React.Suspense>
            </ErrorBoundary>
        </Container>
    );
});

export default EventModeratorPage;
