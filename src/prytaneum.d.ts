declare namespace Prytaneum {
    interface Townhall {
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
    interface User {
        _id: string;
    }

    interface Reference {
        link: string;
        name: string;
        icon: JSX.Element;
    }

    interface TeamMember {
        picturePath?: string;
        fullName: string;
        subtitle: string;
        description: string;
        startDate: Date;
        endDate: Date;
        references?: Reference[];
    }

    interface Team {
        name: string;
        members: TeamMember[];
    }
}
