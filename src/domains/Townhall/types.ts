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
