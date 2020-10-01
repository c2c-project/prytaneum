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
