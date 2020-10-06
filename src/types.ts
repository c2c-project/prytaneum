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
