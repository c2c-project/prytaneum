interface reference {
    link: string;
    name: string;
    icon: JSX.Element;
}

export interface teamMember {
    picturePath?: string;
    fullName: string;
    description: string;
    references?: reference[];
}
