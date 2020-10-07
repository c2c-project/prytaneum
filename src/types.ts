export type ReferenceNames =
    | 'Github'
    | 'LinkedIn'
    | 'resume'
    | 'personalWebsite'
    | 'email'
    | 'phone'
    | 'other';

interface Reference {
    link: string;
    // Note: IFf necessary, add more types of references in the future. There must be an icon for each Reference.name
    name: ReferenceNames;
}

export interface TeamMember {
    picturePath?: string;
    fullName: string;
    subtitle: string;
    description: string;
    startDate: string;
    endDate: string;
    references?: Reference[];
}

export interface Team {
    name: string;
    members: TeamMember[];
}
export interface User {
    _id: string;
    roles: string[];
    email: {
        verified: boolean;
        address: string;
    };
    settings: {
        townhall: {
            anonymous: boolean;
        };
        notifications: {
            enabled: boolean;
            types: string[];
        };
    };
}
