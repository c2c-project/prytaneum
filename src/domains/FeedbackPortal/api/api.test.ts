/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'utils/axios';
import errors from 'utils/errors';
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
            date: new Date(),
            description: 'This is a feedback report',
        };

        it('should reject the feedback report', async () => {
            await expect(API.createFeedbackReport({})).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should create a feedback report', async () => {
            const resolvedValue = { status: 200 };

            //  TODO: Makes the mocked axios.post call to return a status of 200
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            // .resolves makes Jest wait for the mocked API call to resolve
            // .toBe is the expected value returned from the mocked API call
            await expect(API.createFeedbackReport(form)).resolves.toBe(
                resolvedValue
            );
            // .toHaveBeenCalledWith ensures that the mocked API call function was called with specific arguments (endpoint and body).
            expect(axios.post).toHaveBeenCalledWith(
                '/api/feedback/create-report',
                {
                    ...form,
                }
            );
        });
    });

    describe('#get', () => {
        const page = 2;
        const ascending = 'false';

        it('should reject since page number is not provided', async () => {
            await expect(
                API.getFeedbackReports(undefined, ascending)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since ascending is not provided', async () => {
            await expect(API.getFeedbackReports(page, '')).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should get feedback reports', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
                resolvedValue
            );
            await expect(API.getFeedbackReports(page, ascending)).resolves.toBe(
                resolvedValue
            );
            expect(axios.get).toHaveBeenCalledWith(
                '/api/feedback/get-reports',
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
        const form = {
            _id: '507f1f77bcf86cd799439011',
        };
        it('should reject delete', async () => {
            await expect(API.deleteFeedbackReport({})).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should delete a feedback report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.deleteFeedbackReport(form)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith(
                '/api/feedback/delete-report',
                {
                    _id: form._id,
                }
            );
        });
    });
});

describe('#BugRports', () => {
    describe('#create', () => {
        const form = {
            date: new Date(),
            description: 'This is a bug report',
        };
        const townhallId = '507f1f77bcf86cd799439022';

        it('should reject the bug report since form body is not provided', async () => {
            await expect(API.createBugReport({}, townhallId)).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should reject the bug report since townhallId is not provided', async () => {
            await expect(API.createBugReport(form, '')).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should create a bug report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.createBugReport(form, townhallId)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith('/api/bugs/create-report', {
                ...form,
                townhallId,
            });
        });
    });

    describe('#get', () => {
        const page = 1;
        const ascending = 'true';

        it('should reject since page number is not provided', async () => {
            await expect(
                API.getBugReports(undefined, ascending)
            ).rejects.toThrow(errors.fieldError());
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should reject since ascending is not provided', async () => {
            await expect(API.getBugReports(page, '')).rejects.toThrow(
                errors.fieldError()
            );
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('should get bug reports', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
                resolvedValue
            );
            await expect(API.getBugReports(page, ascending)).resolves.toBe(
                resolvedValue
            );
            expect(axios.get).toHaveBeenCalledWith('/api/bugs/get-reports', {
                params: {
                    page,
                    ascending,
                },
            });
        });
    });

    describe('#update', () => {
        const form = {
            description: 'This is a bug report',
            _id: '507f1f77bcf86cd799439011',
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
        const form = {
            _id: '507f1f77bcf86cd799439011',
        };
        it('should reject delete', async () => {
            await expect(API.deleteBugReport({})).rejects.toThrow(
                errors.internalError()
            );
            expect(axios.post).not.toHaveBeenCalled();
        });
        it('should delete a bug report', async () => {
            const resolvedValue = { status: 200 };
            (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
                resolvedValue
            );
            await expect(API.deleteBugReport(form)).resolves.toBe(
                resolvedValue
            );
            expect(axios.post).toHaveBeenCalledWith('/api/bugs/delete-report', {
                _id: form._id,
            });
        });
    });
});
