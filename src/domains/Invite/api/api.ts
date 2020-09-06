import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'utils/axios';
import errors from 'utils/errors';
import { InviteForm, InvitePreview } from '../types';

// API

export async function createInvite(
	inviteData: InviteForm,
	file: File | undefined,
	preview: InvitePreview
): Promise<AxiosResponse> {
	if (!file) {
		throw errors.missingFile();
	}
	const { MoC, topic, eventDateTime, constituentScope, region, deliveryTime, townHallId } = inviteData;
	if (
		MoC === undefined ||
		topic === undefined ||
		eventDateTime === undefined ||
		region === undefined ||
		deliveryTime === undefined ||
		townHallId === undefined
	)
		throw errors.fieldError();
	// Set formData
	const formData = new FormData();
	formData.append('inviteFile', file);
	formData.append('MoC', MoC);
	formData.append('topic', topic);
	formData.append('eventDateTime', eventDateTime);
	formData.append('constituentScope', constituentScope);
	formData.append('region', region);
	formData.append('deliveryTimeString', deliveryTime.toISOString());
	formData.append('townHallId', townHallId);
	if (preview.sendPreview) formData.append('previewEmail', preview.previewEmail);
	if (!MoC || !topic || !eventDateTime || !region || !deliveryTime) {
		throw errors.fieldError();
	}
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	return axios.post('/api/invite', formData, config);
}

export async function loginWithJWT(token: string) {
	if (!token) {
		throw errors.fieldError();
	}
	// Verify the token and allow user to login if valid
	// TODO Username vs Email, or doesn't matter since we can just post with jwt and have it handled in API
	return axios.post('/api/users/login-with-jwt', {
		token,
	});
}

// TODO Find out if/what data/cookie (town hall ID?) is required to get relevant data.
export async function getInviteData(): Promise<AxiosResponse> {
	return axios.get('/api/get-invite-data');
}
