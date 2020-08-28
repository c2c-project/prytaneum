export interface InviteForm {
    // TODO Add the townhall id
    MoC: string | undefined;
    topic: string | undefined;
    eventDateTime: string | undefined;
    constituentScope: 'state' | 'district';
    region: string | undefined;
    deliveryTime: Date | undefined;
    townHallID: string | undefined;
}
