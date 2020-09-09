// TODO once user shape is more standardized, modify these interfaces appropriately -- most likely using transformation functions

export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    timeStamp: Date;
    status: UserStatus[];
    actionHistoryData: UserActionHistory[];
}

export interface UserActionHistory {
    timeStamp: Date;
    action: string;
}

interface UserStatus {
    status: string;
    count: number;
    active: boolean;
}

export interface UserProfileFormat {
    _id: string;
    actionHistoryData: UserActionHistoryFormat[];
    profileInfo: ProfileInfoFormat;
    tags: string[];
}

export interface UserActionHistoryFormat {
    _id: string;
    primary: string;
    secondary: string;
}

export interface ProfileInfoFormat {
    primary: string;
    info: UserStatus[];
}

export interface UserPromotionType {
    _id: string;
    name: string;
    email: string;
    status: { status: string; count: number; active: boolean }[];
    timeStamp: string;
}
