export interface InviteForm {
	MoC: string | undefined,
	topic: string | undefined,
	eventDateTime: string | undefined,
	constituentScope: 'state' | 'district',
	region: string | undefined,
	deliveryTime: Date | undefined,
	townHallId: string | undefined,
}

export interface InvitePreview {
	sendPreview: boolean,
	previewEmail: string,
}

export interface InviteTokenResult {
	email: string,
	townHallId: string,
}
