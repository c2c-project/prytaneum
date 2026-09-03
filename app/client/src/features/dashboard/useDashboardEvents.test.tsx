import * as React from 'react';
import { render, act } from '@testing-library/react';
import * as ReactRelay from 'react-relay';
import { useDashboardEvents } from './useDashboardEvents';

jest.mock('react-relay', () => ({
    ...jest.requireActual('react-relay'),
    graphql: () => ({}),
    useRefetchableFragment: jest.fn(),
}));

let refreshCallbacks: (() => void)[] = [];
jest.mock('@local/core', () => ({
    useRefresh: ({ callback }: { callback: () => void }) => {
        refreshCallbacks.push(callback);
    },
}));

function TestComponent({ fragmentRef }: { fragmentRef: any }) {
    useDashboardEvents({ fragmentRef });
    return null;
}

describe('useDashboardEvents', () => {
    it('should refetch with empty cursor to refresh list from the beginning', () => {
        const mockRefetch = jest.fn();
        const mockData = {
            events: {
                __id: 'connection-1',
                edges: [{ node: { id: 'event-1', title: 'Test Event', startDateTime: null, endDateTime: null, isActive: true } }],
                pageInfo: {
                    startCursor: 'cursor-start',
                    endCursor: 'cursor-end',
                },
            },
        };

        (ReactRelay.useRefetchableFragment as jest.Mock).mockReturnValue([mockData, mockRefetch]);

        render(<TestComponent fragmentRef={{} as any} />);

        act(() => {
            if (refreshCallbacks[0]) refreshCallbacks[0]();
        });

        expect(mockRefetch).toHaveBeenCalledWith(
            expect.objectContaining({ cursor: '' }),
            expect.objectContaining({ fetchPolicy: 'store-and-network' })
        );
    });
});
