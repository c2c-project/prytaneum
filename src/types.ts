interface Reference {
    link: string;
    // TODO: IFf necessary, add more types of references in the future. There must be an icon for each referenceName
    name: 'Github' | 'LinkedIn' | 'resume' | 'personalWebsite';
}

export interface TeamMember {
    picturePath?: string;
    fullName: string;
    subtitle: string;
    description: string;
    startDate: Date;
    endDate: Date;
    references?: Reference[];
}

export interface Team {
    name: string;
    members: TeamMember[];
}
export interface User {
    _id: string;
}
