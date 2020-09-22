interface Reference {
    link: string;
    name: string;
    icon: JSX.Element;
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
