import { prismaMock } from '../../../mocks/prisma/singleton';
import { updateEvent } from './methods';

const EVENT_ID = '4ca977f8-3cf4-40ea-a9af-e2b852c0b15f';
const USER_ID = '531be5ae-6df9-47e2-a86d-8ee44062ab79';

const currentSimulation = {
    simulationEnabled: false,
    simulationParticipantCount: 10,
    simulationTopic: '',
    simulationBackground: '',
};

function authorize() {
    prismaMock.event.findUnique.mockResolvedValueOnce({
        organization: { members: [{ userId: USER_ID }] },
        moderators: [],
    } as any);
}

describe('updateEvent simulation settings', () => {
    test('persists a complete enabled simulation configuration', async () => {
        authorize();
        prismaMock.event.findUnique.mockResolvedValueOnce(currentSimulation as any);
        prismaMock.event.update.mockResolvedValue({ id: EVENT_ID } as any);

        await updateEvent(USER_ID, prismaMock, {
            eventId: EVENT_ID,
            simulationEnabled: true,
            simulationParticipantCount: 5,
            simulationTopic: 'Downtown transportation policy',
            simulationBackground: 'The city is considering several transportation options.',
        });

        expect(prismaMock.event.update).toHaveBeenCalledWith({
            where: { id: EVENT_ID },
            data: {
                simulationEnabled: true,
                simulationParticipantCount: 5,
                simulationTopic: 'Downtown transportation policy',
                simulationBackground: 'The city is considering several transportation options.',
            },
        });
    });

    test('rejects an unauthorized update', async () => {
        prismaMock.event.findUnique.mockResolvedValueOnce({ organization: { members: [] }, moderators: [] } as any);

        await expect(
            updateEvent(USER_ID, prismaMock, { eventId: EVENT_ID, simulationEnabled: false })
        ).rejects.toMatchObject({ userMessage: 'Insufficient permissions' });
        expect(prismaMock.event.update).not.toHaveBeenCalled();
    });

    test.each([
        [{ simulationParticipantCount: 0 }, 'between 1 and 20'],
        [{ simulationParticipantCount: 21 }, 'between 1 and 20'],
        [{ simulationEnabled: true, simulationTopic: '', simulationBackground: 'Background' }, 'topic is required'],
        [{ simulationEnabled: true, simulationTopic: 'Topic', simulationBackground: '' }, 'background is required'],
    ])('rejects invalid simulation settings', async (changes, expectedMessage) => {
        authorize();
        prismaMock.event.findUnique.mockResolvedValueOnce(currentSimulation as any);

        await expect(updateEvent(USER_ID, prismaMock, { eventId: EVENT_ID, ...changes })).rejects.toThrow(
            expectedMessage
        );
        expect(prismaMock.event.update).not.toHaveBeenCalled();
    });
});
