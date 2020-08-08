import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'utils/axios';
import errors from 'utils/errors';

// TYPE DECLARATIONS

export interface InviteForm {
    MoC: string | undefined;
    topic: string | undefined;
    eventDateTime: string | undefined;
    constituentScope: 'state' | 'district';
    region: string | undefined;
    deliveryTime: Date | undefined;
}

// API

export async function createInvite(
    formData: InviteForm,
    file: File | undefined
): Promise<AxiosResponse> {
    console.log('Create Invite');
    if (!file) {
        throw errors.missingFile();
    }
    console.log('File Data: ', file, file.name, file.type, file.size);
    const {
        MoC,
        topic,
        eventDateTime,
        constituentScope,
        region,
        deliveryTime,
    } = formData;
    if (!MoC || !topic || !eventDateTime || !region || !deliveryTime) {
        throw errors.fieldError();
    }
    const metadata = {
        name: file.name,
        lastModified: new Date(file.lastModified).toUTCString(), // UNIX epoch time
        size: file.size, // Size in bytes
    };
    const buffer = await file.arrayBuffer();
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'text/csv',
            moc: MoC,
            topic,
            eventdatetime: eventDateTime,
            constituentscope: constituentScope,
            region,
            deliverytime: deliveryTime.toISOString(),
            metadata: JSON.stringify(metadata),
        },
    };
    return axios.post('/api/invite', buffer, config);
}
