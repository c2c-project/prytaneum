export interface Townhall {
    _id: string;
    form: TownhallForm;
    settings: TownhallSettings;
}

export interface TownhallSettings {
    waitingRoom: {
        enabled: boolean;
        scheduled: null | Date;
    };
    chat: {
        enabled: boolean;
        automated: boolean;
    };
    questionQueue: {
        transparent: boolean;
        automated: boolean;
        // TODO: prepopulated questions (if transparent then users can see these)
    };
    credits: {
        enabled: boolean;
        list: string[]; // user id's
    };
    links: {
        enabled: boolean;
        links: {
            name: string;
            link: string;
        }[];
    };
    moderators: {
        list: string[]; // userid[]
        primary: string; // primary user id
    };
    registration: {
        reminders: {
            enabled: true;
            customTimes: string[]; // TODO: ISO times, don't need this now
        };
        registrants: string[]; // TODO: emails or userIds idk yet -- how to prevent abuse?
    };
}

export interface TownhallForm {
    title: string;
    date: Date;
    description: string;
    scope: 'state' | 'district';
    private: boolean; // TODO: what does this mean? might put this in the form itself
    speaker: Speaker;
    topic: string;
}

export interface Speaker {
    name: string;
    party: string;
    territory: string;
    picture: string;
}

export interface TownhallQuestionForm {
    question: string;
}

export type QuestionState = '' | 'IN_QUEUE' | 'ASKED' | 'CURRENT';
export interface Question {
    _id: string;
    meta: {
        townhallId: string;
        user: {
            _id: string;
            name: string;
        };
        timestamp: string;
    };
    question: string;
    state: QuestionState;
}
