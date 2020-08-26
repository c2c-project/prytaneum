/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'utils/axios';
import errors from 'utils/errors';
import faker from 'faker';

import * as API from '.';

// Creates a mocked axios.post function but also tracks calls to axios.post
beforeEach(() => {
    jest.spyOn(axios, 'post');
    jest.spyOn(axios, 'get');
});

// Resets the state of all mocks.
afterEach(() => {
    jest.restoreAllMocks();
});

describe('#FeedbackRports', () => {
    describe('#create', () => {
        const form = {
            description: faker.lorem.paragraphs(),
        };

        const date = new Date().toISOString();

        it('should reject the feedback report because of missing description', async () => {
            await expect(API.createFeedbackReport({}, date)).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should reject the feedback report because of missing date', async () => {
            await expect(API.createFeedbackReport(form, '')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should create a feedback report', async () => {
            const resolvedValue = { status: 200 };

            // Makes the mocked axios.post call to return a status of 200
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            // .resolves makes Jest wait for the mocked API call to resolve
            // .toBe is the expected value returned from the mocked API call
            await expect(API.createFeedbackReport(form, date)).resolves.toBe(
                resolvedValue
            );
            // .toHaveBeenCalledWith ensures that the mocked API call function was called with specific arguments (endpoint and body).
            expect(axios.post).toHaveBeenCalledWith(
                '/api/feedback/create-report',
                {
                    ...form,
                    date,
                }
            );
        });
    });

    describe('#get', () => {
        const page = faker.random.number();
        const ascending = 'false';
        const submitterId = faker.random.alphaNumeric(12);
        it('should reject since page number is not provided', async () => {
            await expect(
                API.getFeedbackReportsBySubmitter(0, ascending, submitterId)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since ascending is not provided', async () => {
            await expect(
                API.getFeedbackReportsBySubmitter(page, '', submitterId)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since submitterId is not provided', async () => {
            await expect(
                API.getFeedbackReportsBySubmitter(page, ascending, '')
            ).rejects.toThrow(errors.internalError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should get feedback reports', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
                resolvedValue
            );
            await expect(
                API.getFeedbackReportsBySubmitter(page, ascending, submitterId)
            ).resolves.toBe(resolvedValue);
            expect(axios.get).toHaveBeenCalledWith(
                `/api/feedback/get-reports/${submitterId}`,
                {
                    params: {
                        page,
                        ascending,
                    },
                }
            );
        });
    });

    describe('#update', () => {
        const form = {
            description: 'This is a feedback report',
            _id: '507f1f77bcf86cd799439011',
        };
        it('should reject update', async () => {
            await expect(API.updateFeedbackReport({})).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should update a feedback report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.updateFeedbackReport(form)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith(
                '/api/feedback/update-report',
                {
                    _id: form._id,
                    newDescription: form.description,
                }
            );
        });
    });

    describe('#delete', () => {
        const _id = faker.random.alphaNumeric(12);
        it('should reject delete', async () => {
            await expect(API.deleteFeedbackReport('')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should delete a feedback report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.deleteFeedbackReport(_id)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith(
                '/api/feedback/delete-report',
                {
                    _id,
                }
            );
        });
    });
});

describe('#BugRports', () => {
    describe('#create', () => {
        const form = {
            description: 'This is a bug report',
        };
        const townhallId = faker.random.alphaNumeric(12);
        const date = new Date().toISOString();

        it('should reject the bug report since form body is not provided', async () => {
            await expect(
                API.createBugReport({}, date, townhallId)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should reject the bug report since townhallId is not provided', async () => {
            await expect(API.createBugReport(form, date, '')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should reject the bug report since date is not provided', async () => {
            await expect(API.createBugReport(form, '', '')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should create a bug report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(
                API.createBugReport(form, date, townhallId)
            ).resolves.toBe(resolvedValue);
            expect(axios.post).toHaveBeenCalledWith('/api/bugs/create-report', {
                ...form,
                date,
                townhallId,
            });
        });
    });

    describe('#get', () => {
        const page = faker.random.number();
        const ascending = 'true';
        const submitterId = faker.random.alphaNumeric(12);

        it('should reject since page number is not provided', async () => {
            await expect(
                API.getBugReportsBySubmitter(0, ascending, submitterId)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since ascending is not provided', async () => {
            await expect(
                API.getBugReportsBySubmitter(page, '', submitterId)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since submitterId is not provided', async () => {
            await expect(
                API.getBugReportsBySubmitter(page, ascending, '')
            ).rejects.toThrow(errors.internalError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should get bug reports', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
                resolvedValue
            );
            await expect(
                API.getBugReportsBySubmitter(page, ascending, submitterId)
            ).resolves.toBe(resolvedValue);
            expect(axios.get).toHaveBeenCalledWith(
                `/api/bugs/get-reports/${submitterId}`,
                {
                    params: {
                        page,
                        ascending,
                    },
                }
            );
        });
    });

    describe('#update', () => {
        const form = {
            description: 'This is a bug report',
            _id: faker.random.alphaNumeric(12),
        };
        it('should reject update', async () => {
            await expect(API.updateBugReport({})).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should update a bug report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.updateBugReport(form)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith('/api/bugs/update-report', {
                _id: form._id,
                newDescription: form.description,
            });
        });
    });

    describe('#delete', () => {
        const _id = faker.random.alphaNumeric(12);
        it('should reject delete', async () => {
            await expect(API.deleteBugReport('')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should delete a bug report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.deleteBugReport(_id)).resolves.toBe(resolvedValue);
            expect(axios.post).toHaveBeenCalledWith('/api/bugs/delete-report', {
                _id,
            });
        });
    });
});
