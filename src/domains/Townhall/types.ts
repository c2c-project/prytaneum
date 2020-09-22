export interface Townhall {
    _id: string;
    form: TownhallForm;
}

export interface TownhallForm {
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
    description: string;
}

export interface TownhallQuestionForm {
    question: string;
}
