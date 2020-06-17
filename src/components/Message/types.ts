export interface Message {
    _id: string;
    message: string;
    username: string;
    moderated: boolean;
    sent: number;
    userId: string;
}
