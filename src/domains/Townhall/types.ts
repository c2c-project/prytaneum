export interface Townhall {
    _id: string;
    form: TownhallForm;
    settings: TownhallSettings;
}

export interface TownhallSettings {
    components: {
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
    };
    general: {
        private: boolean; // TODO: what does this mean? might put this in the form itself
        speaker: {
            name: string;
            party: string;
            territory: string;
            picture: string;
        };
        topic: string;
    };
}

export interface TownhallForm {
    title: string;
    date: Date;
    description: string;
    scope: 'state' | 'district';
}

export interface TownhallQuestionForm {
    question: string;
}
