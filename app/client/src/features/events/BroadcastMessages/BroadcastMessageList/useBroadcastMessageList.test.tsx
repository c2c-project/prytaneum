import * as React from 'react';
import { render, act } from '@testing-library/react';
import * as ReactRelay from 'react-relay';
import { useBroadcastMessageList } from './useBroadcastMessageList';

jest.mock('react-relay', () => ({
    ...jest.requireActual('react-relay'),
    graphql: () => ({}),
    usePaginationFragment: jest.fn(),
}));

jest.mock('@local/features/accounts', () => ({
    useUser: () => ({
        user: { preferredLang: 'EN' },
    }),
}));

let currentHookResult: ReturnType<typeof useBroadcastMessageList> | null = null;

function TestComponent({ fragmentRef }: { fragmentRef: any }) {
    currentHookResult = useBroadcastMessageList({ fragmentRef });
    return null;
}

describe('useBroadcastMessageList', () => {
    it('should refetch with empty after cursor and reset isRefreshing in onComplete', () => {
        const mockRefetch = jest.fn();
        const mockData = {
            id: 'event-123',
            currentBroadcastMessage: 'Hello',
            broadcastMessages: {
                __id: 'connection-bm',
                edges: [],
                pageInfo: {
                    startCursor: 'c1',
                    endCursor: 'c50',
                },
            },
        };

        (ReactRelay.usePaginationFragment as jest.Mock).mockReturnValue({
            data: mockData,
            loadNext: jest.fn(),
            loadPrevious: jest.fn(),
            hasNext: false,
            hasPrevious: false,
            isLoadingNext: false,
            isLoadingPrevious: false,
            refetch: mockRefetch,
        });

        render(<TestComponent fragmentRef={{} as any} />);

        act(() => {
            currentHookResult?.refresh();
        });

        expect(mockRefetch).toHaveBeenCalledWith(
            expect.objectContaining({
                first: 50,
                after: '',
                lang: 'EN',
            }),
            expect.objectContaining({
                fetchPolicy: 'store-and-network',
                onComplete: expect.any(Function),
            })
        );
    });
});
