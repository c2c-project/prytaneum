export interface UserInfo {
    id: string;
    name: string;
    status: string;
    timeStamp: number | string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    status: UserStatus[];
    actionHistoryData: UserActionHistory[];
}

export interface UserActionHistory {
    timeStamp: string | number;
    action: string;
}

interface UserStatus {
    status: string;
    count: number;
}
