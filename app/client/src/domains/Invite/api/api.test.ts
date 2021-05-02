/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosRequestConfig } from 'axios';
import axios from 'utils/axios';
import errors from 'utils/errors';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker/locale/en';
import API from './index';
import { InviteForm, InvitePreview } from '../types';

describe('createInvite', () => {
    const testEventDateTime = faker.date.future().toUTCString();
    const testDeliveryTime = new Date();
    const testFormData: InviteForm = {
        MoC: faker.name.firstName(),
        topic: 'Topic',
        eventDateTime: testEventDateTime,
        constituentScope: 'state',
        region: 'test',
        deliveryTime: testDeliveryTime,
        townhallId: 'testID',
    };

    const testPreview: InvitePreview = {
        sendPreview: true,
        previewEmail: faker.internet.email(),
    };

    const testFileData = [
        `email,fName,lName\n
    ${faker.internet.email()},${faker.name.firstName()},${faker.name.lastName()}\n
    ${faker.internet.email()},${faker.name.firstName()},${faker.name.lastName()}\n
    ${faker.internet.email()},${faker.name.firstName()},${faker.name.lastName()}\n
    ${faker.internet.email()},${faker.name.firstName()},${faker.name.lastName()}`,
    ];
    const testFile = new File(testFileData, 'test.csv', {
        type: 'text/csv',
    });

    beforeEach(() => {
        jest.spyOn(axios, 'post');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should accept valid invite data and a file', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        const expectedFormData = new FormData();
        expectedFormData.append('inviteFile', testFile);
        expectedFormData.append('MoC', testFormData.MoC as string);
        expectedFormData.append('topic', testFormData.topic as string);
        expectedFormData.append(
            'eventDateTime',
            testFormData.eventDateTime as string
        );
        expectedFormData.append(
            'constituentScope',
            testFormData.constituentScope
        );
        expectedFormData.append('region', testFormData.region as string);
        const deliveryTime = testFormData.deliveryTime as Date;
        expectedFormData.append(
            'deliveryTimeString',
            deliveryTime.toISOString()
        );
        expectedFormData.append(
            'townhallId',
            testFormData.townhallId as string
        );
        expectedFormData.append('previewEmail', testPreview.previewEmail);
        const expectedOptions: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await expect(
            API.createInvite(testFormData, testFile, testPreview)
        ).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith(
            '/api/invite',
            expectedFormData,
            expectedOptions
        );
    });
    it('should throw file error with undefined file', async () => {
        await expect(
            API.createInvite(testFormData, undefined, testPreview)
        ).rejects.toThrow(errors.missingFile());
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
            townhallId: 'testID',
        };
        await expect(
            API.createInvite(formData, testFile, testPreview)
        ).rejects.toThrow(errors.fieldError());
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
            townhallId: 'testID',
        };
        await expect(
            API.createInvite(formData, testFile, testPreview)
        ).rejects.toThrow(errors.fieldError());
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
            townhallId: 'testID',
        };
        await expect(
            API.createInvite(formData, testFile, testPreview)
        ).rejects.toThrow(errors.fieldError());
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
            townhallId: 'testID',
        };
        await expect(
            API.createInvite(formData, testFile, testPreview)
        ).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should throw field error with undefined townhallId', async () => {
        const formData: InviteForm = {
            MoC: faker.name.firstName(),
            topic: 'Topic',
            eventDateTime: testEventDateTime,
            constituentScope: 'state',
            region: 'test',
            deliveryTime: testDeliveryTime,
            townhallId: undefined,
        };
        await expect(
            API.createInvite(formData, testFile, testPreview)
        ).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
    });
});
