import { ConnectionHandler } from 'relay-runtime';
import { onDeckEnqueuedMutationUpdater } from './utils';

describe('OnDeck utils', () => {
    describe('onDeckEnqueuedMutationUpdater', () => {
        it('should use ConnectionHandler.getConnection with filter arguments rather than manual string concatenation', () => {
            const mockEventRecord = {
                getDataID: jest.fn().mockReturnValue('event-123'),
            };

            const mockModQueueRecord = {
                getDataID: jest.fn().mockReturnValue('mod-queue-id'),
            };

            const mockOnDeckRecord = {
                getDataID: jest.fn().mockReturnValue('on-deck-id'),
            };

            const mockDefaultTopicRecord = {
                getDataID: jest.fn().mockReturnValue('default-topic-id'),
            };

            const mockTopicRecord = {
                getDataID: jest.fn().mockReturnValue('custom-topic-id'),
            };

            const mockQuestionEdge = {
                getDataID: jest.fn().mockReturnValue('edge-123'),
            };

            const mockPayload = {
                getLinkedRecord: jest.fn().mockReturnValue(mockQuestionEdge),
            };

            const mockStore: any = {
                get: jest.fn((id: string) => {
                    if (id === 'event-123') return mockEventRecord;
                    if (id === 'on-deck-connection-id') return mockOnDeckRecord;
                    return null;
                }),
                getRootField: jest.fn((field: string) => {
                    if (field === 'addQuestionToOnDeck') return mockPayload;
                    return null;
                }),
            };

            const getConnectionSpy = jest.spyOn(ConnectionHandler, 'getConnection').mockImplementation(
                (record: any, key: string, filters?: any) => {
                    if (key === 'useQuestionModQueueFragment_questionModQueue') {
                        return mockModQueueRecord as any;
                    }
                    if (key === 'useQuestionsByTopicFragment_questionsByTopic') {
                        if (filters?.topic === 'default') return mockDefaultTopicRecord as any;
                        if (filters?.topic === 'climate') return mockTopicRecord as any;
                    }
                    return null;
                }
            );

            const deleteNodeSpy = jest.spyOn(ConnectionHandler, 'deleteNode').mockImplementation(() => {});
            const insertEdgeAfterSpy = jest.spyOn(ConnectionHandler, 'insertEdgeAfter').mockImplementation(() => {});

            onDeckEnqueuedMutationUpdater({
                store: mockStore,
                connections: ['on-deck-connection-id'],
                eventId: 'event-123',
                questionId: 'question-456',
                topics: [{ id: 'topic-1', topic: 'climate', description: 'climate change' }],
            });

            // Assert that ConnectionHandler.getConnection was called with the correct filter objects
            expect(getConnectionSpy).toHaveBeenCalledWith(
                mockEventRecord,
                'useQuestionsByTopicFragment_questionsByTopic',
                { topic: 'default' }
            );

            expect(getConnectionSpy).toHaveBeenCalledWith(
                mockEventRecord,
                'useQuestionsByTopicFragment_questionsByTopic',
                { topic: 'climate' }
            );

            // Assert deleteNode was called on default and custom topic records
            expect(deleteNodeSpy).toHaveBeenCalledWith(mockDefaultTopicRecord, 'question-456');
            expect(deleteNodeSpy).toHaveBeenCalledWith(mockTopicRecord, 'question-456');

            getConnectionSpy.mockRestore();
            deleteNodeSpy.mockRestore();
            insertEdgeAfterSpy.mockRestore();
        });
    });
});
