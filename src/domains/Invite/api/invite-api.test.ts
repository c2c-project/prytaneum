import { AxiosRequestConfig } from 'axios';
import axios from 'utils/axios';
import errors from 'utils/errors';
import faker from 'faker';
import { createInvite, InviteForm } from './invite-api';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

const testEventDateTime = faker.date.future().toUTCString();
const testDeliveryTime = new Date();
const testFormData: InviteForm = {
    MoC: faker.name.firstName(),
    topic: 'Topic',
    eventDateTime: testEventDateTime,
    constituentScope: 'state',
    region: 'test',
    deliveryTime: testDeliveryTime,
};

const testFileData = [
    `email,fName,lName\n
    ${faker.internet.email()},${faker.name.firstName()},${faker.name.lastName()}`,
];
const testFile = new File(testFileData, 'test.csv', {
    type: 'text/csv',
});

describe('createInvite', () => {
    it('should accept valid invite data and a file', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(createInvite(testFormData, testFile)).resolves.toBe(
            resolvedValue
        );
        const expectedBuffer = await testFile.arrayBuffer();
        const testMetadata = {
            name: testFile.name,
            lastModified: new Date().toUTCString(), // UNIX epoch time
            size: testFile.size, // Size in bytes
        };
        const expectedOptions: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'text/csv',
                moc: testFormData.MoC,
                topic: testFormData.topic,
                eventdatetime: testFormData.eventDateTime,
                constituentscope: testFormData.constituentScope,
                region: testFormData.region,
                deliverytime: testFormData.deliveryTime,
                metadata: JSON.stringify(testMetadata),
            },
        };
        expect(axios.post).toHaveBeenCalledWith(
            '/api/invite',
            expectedBuffer,
            expectedOptions
        );
    });
    it('should throw file error with undifined file', async () => {
        await expect(createInvite(testFormData, undefined)).rejects.toThrow(
            errors.missingFile()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should throw field error with undefined MoC', async () => {
        const formData: InviteForm = {
            MoC: undefined,
            topic: 'Topic',
            eventDateTime: testEventDateTime,
            constituentScope: 'state',
            region: 'test',
            deliveryTime: testDeliveryTime,
        };
        await expect(createInvite(formData, testFile)).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should throw field error with undefined topic', async () => {
        const formData: InviteForm = {
            MoC: faker.name.firstName(),
            topic: undefined,
            eventDateTime: testEventDateTime,
            constituentScope: 'state',
            region: 'test',
            deliveryTime: testDeliveryTime,
        };
        await expect(createInvite(formData, testFile)).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should throw field error with undefined eventDateTime', async () => {
        const formData: InviteForm = {
            MoC: faker.name.firstName(),
            topic: 'Topic',
            eventDateTime: undefined,
            constituentScope: 'state',
            region: 'test',
            deliveryTime: testDeliveryTime,
        };
        await expect(createInvite(formData, testFile)).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should throw field error with undefined region', async () => {
        const formData: InviteForm = {
            MoC: faker.name.firstName(),
            topic: 'Topic',
            eventDateTime: testEventDateTime,
            constituentScope: 'state',
            region: undefined,
            deliveryTime: testDeliveryTime,
        };
        await expect(createInvite(formData, testFile)).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
});
