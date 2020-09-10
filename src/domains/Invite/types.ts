export interface InviteForm {
    MoC?: string;
    topic?: string;
    eventDateTime?: string;
    constituentScope: 'state' | 'district';
    region?: string;
    deliveryTime?: Date;
    townHallId?: string;
}

export interface InvitePreview {
    sendPreview: boolean;
    previewEmail: string;
}

export interface InviteTokenResult {
    email: string;
    townHallId: string;
}
