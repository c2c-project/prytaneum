import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'utils/axios';
import errors from 'utils/errors';
import { InviteForm } from '../types';

// API

export async function createInvite(
    inviteData: InviteForm,
    file: File | undefined
): Promise<AxiosResponse> {
    if (!file) {
        throw errors.missingFile();
    }
    const {
        MoC,
        topic,
        eventDateTime,
        constituentScope,
        region,
        deliveryTime,
    } = inviteData;
    if (
        MoC === undefined ||
        topic === undefined ||
        eventDateTime === undefined ||
        region === undefined ||
        deliveryTime === undefined
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

export async function checkIfRegistered(email: string): Promise<AxiosResponse> {
    // TODO update axios request to match correct route
    return axios.post('/api/account/is-registered', email);
}

// TODO Find out if/what data/cookie (town hall ID?) is required to get relevant data.
export async function getInviteData(): Promise<AxiosResponse> {
    return axios.get('/api/get-invite-data');
}
