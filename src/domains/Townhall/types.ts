export interface Townhall {
    _id: string;
    speaker: {
        name: string;
        party: string;
        territory: string;
    };
    moderator: string;
    topic: string;
    picture: string;
    readingMaterials: '';
    date: Date;
    url: string;
}

export interface TownhallForm {
    speaker?: string;
    moderator?: string;
    date?: Date;
    description?: string;
    url?: string;
    topic: string;
}

export interface TownhallQuestionForm {
    question: string;
}

export interface ClipData {
    timeStamp: string;
    duration: string;
    title: string;
    user: string;
    description: string;
    tags: string[];
}
