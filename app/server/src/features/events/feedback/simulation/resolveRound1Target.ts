import type { PrismaClient } from '@local/__generated__/prisma';

export type Round1TargetIdentifiers = {
    eventId?: string;
    eventTitle?: string;
    promptId?: string;
    promptText?: string;
};

export type ResolvedRound1Target = {
    eventId: string;
    promptId: string;
};

export class Round1TargetResolutionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1TargetResolutionError';
    }
}

/** Resolve optional human-readable identifiers while leaving raw IDs on their existing validation path. */
export async function resolveRound1Target(
    prisma: PrismaClient,
    identifiers: Round1TargetIdentifiers
): Promise<ResolvedRound1Target> {
    let eventId = identifiers.eventId;
    if (!eventId) {
        if (!identifiers.eventTitle) {
            throw new Round1TargetResolutionError('One of eventId or eventTitle is required.');
        }
        const events = await prisma.event.findMany({
            where: { title: identifiers.eventTitle },
            select: { id: true },
            take: 2,
        });
        if (events.length === 0) {
            throw new Round1TargetResolutionError(`No event found with exact title: "${identifiers.eventTitle}".`);
        }
        if (events.length > 1) {
            throw new Round1TargetResolutionError(
                `More than one event has title "${identifiers.eventTitle}"; use --event <raw-event-uuid>.`
            );
        }
        eventId = events[0].id;
    }

    let promptId = identifiers.promptId;
    if (!promptId) {
        if (!identifiers.promptText) {
            throw new Round1TargetResolutionError('One of promptId or promptText is required.');
        }
        const prompts = await prisma.eventLiveFeedbackPrompt.findMany({
            where: { eventId, prompt: identifiers.promptText },
            select: { id: true },
            take: 2,
        });
        if (prompts.length === 0) {
            throw new Round1TargetResolutionError(
                `No prompt found in event ${eventId} with exact text: "${identifiers.promptText}".`
            );
        }
        if (prompts.length > 1) {
            throw new Round1TargetResolutionError(
                `More than one prompt in event ${eventId} has text "${identifiers.promptText}"; ` +
                    'use --prompt <raw-prompt-uuid>.'
            );
        }
        promptId = prompts[0].id;
    }

    return { eventId, promptId };
}
