/* eslint-disable @typescript-eslint/indent */
import type { ReasoningType, Vote } from '@local/__generated__/prisma';
import type { Round1PersonaCovariates } from './round1Covariates';

export type Round1QuestionType = 'MULTIPLE_CHOICE' | 'VOTE' | 'OPEN_ENDED';

export type Round1PromptTypeFlags = {
    isMultipleChoice: boolean;
    isVote: boolean;
    isOpenEnded: boolean;
};

export class Round1QuestionTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Round1QuestionTypeError';
    }
}

export function deriveRound1QuestionType(flags: Round1PromptTypeFlags): Round1QuestionType {
    const activeTypes: Round1QuestionType[] = [];
    if (flags.isMultipleChoice) activeTypes.push('MULTIPLE_CHOICE');
    if (flags.isVote) activeTypes.push('VOTE');
    if (flags.isOpenEnded) activeTypes.push('OPEN_ENDED');
    if (activeTypes.length !== 1) {
        throw new Round1QuestionTypeError('Prompt must have exactly one active question-type flag.');
    }
    return activeTypes[0];
}

export type Round1MultipleChoiceQuestion = {
    questionType: 'MULTIPLE_CHOICE';
    options: string[];
    reasoningType: ReasoningType;
};

export type Round1VoteQuestion = {
    questionType: 'VOTE';
    reasoningType: ReasoningType;
};

export type Round1OpenEndedQuestion = {
    questionType: 'OPEN_ENDED';
};

export type Round1Question = Round1MultipleChoiceQuestion | Round1VoteQuestion | Round1OpenEndedQuestion;

export type Round1InputParticipant = {
    participantKey: string;
    userId: string;
    persona: { covariates: Round1PersonaCovariates };
};

type Round1InputBase = {
    schemaVersion: 2;
    runId: string;
    eventId: string;
    promptId: string;
    question: string;
    topic: string;
    background: string;
    generation: { force: boolean };
    participants: Round1InputParticipant[];
};

export type Round1Input = Round1InputBase & Round1Question;

type Round1ResponseBase = {
    participantKey: string;
    userId: string;
};

export type Round1MultipleChoiceResponse = Round1ResponseBase & {
    questionType: 'MULTIPLE_CHOICE';
    standpointNum: number;
    selectedOption: string;
    reasoning: string;
};

export type Round1VoteResponse = Round1ResponseBase & {
    questionType: 'VOTE';
    vote: Vote;
    reasoning: string;
};

export type Round1OpenEndedResponse = Round1ResponseBase & {
    questionType: 'OPEN_ENDED';
    response: string;
};

export type Round1Response = Round1MultipleChoiceResponse | Round1VoteResponse | Round1OpenEndedResponse;

type Round1OutputBase = {
    schemaVersion: 2;
    runId: string;
    eventId: string;
    promptId: string;
    model: string;
    generatedAt: string;
};

export type Round1MultipleChoiceOutput = Round1OutputBase &
    Round1MultipleChoiceQuestion & { responses: Round1MultipleChoiceResponse[] };
export type Round1VoteOutput = Round1OutputBase & Round1VoteQuestion & { responses: Round1VoteResponse[] };
export type Round1OpenEndedOutput = Round1OutputBase &
    Round1OpenEndedQuestion & { responses: Round1OpenEndedResponse[] };
export type Round1OutputV2 = Round1MultipleChoiceOutput | Round1VoteOutput | Round1OpenEndedOutput;

export type Round1OutputV1 = {
    schemaVersion: 1;
    runId: string;
    eventId: string;
    promptId: string;
    model: string;
    generatedAt: string;
    options: string[];
    reasoningType: ReasoningType;
    responses: Omit<Round1MultipleChoiceResponse, 'questionType'>[];
};

export type Round1Output = Round1OutputV1 | Round1OutputV2;

export function getRound1OutputQuestionType(output: Round1Output): Round1QuestionType {
    return output.schemaVersion === 1 ? 'MULTIPLE_CHOICE' : output.questionType;
}
