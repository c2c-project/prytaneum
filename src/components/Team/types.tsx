interface reference {
    link: string;
    name: string;
    icon: JSX.Element;
}

export interface teamMember {
    picturePath?: string;
    fullName: string;
    subtitle: string;
    description: string;
    startDate: Date;
    endDate: Date;
    references?: reference[];
}
