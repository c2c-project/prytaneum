/* eslint-disable import/no-extraneous-dependencies */
import { Storage, Bucket, UploadResponse } from '@google-cloud/storage';
import { getOrCreateServer } from '@local/core/server';

const server = getOrCreateServer();

let _storage: Storage | null = null;
const bucketsVerified: Record<string, boolean> = {};

export const getOrCreateStorage = () => {
    if (!_storage) {
        _storage = new Storage({
            projectId: process.env.GCP_PROJECT_ID,
            // keyFilename: './src/core/utils/gcp-storage-credentials.json',
        });
    }

    return _storage;
};

export const getOrCreateBucket = async (bucketName: string): Promise<Bucket> => {
    const storage = getOrCreateStorage();
    if (bucketsVerified[bucketName]) {
        return storage.bucket(bucketName);
    }
    const bucketExists = await storage.bucket(bucketName).exists();
    if (!bucketExists[0]) {
        await storage.createBucket(bucketName);
        server.log.info(`Bucket ${bucketName} created.`);
    }
    bucketsVerified[bucketName] = true;
    return storage.bucket(bucketName);
};

interface UploadFileParams {
    filePath: string;
    destFileName: string;
    bucketName: string;
}

export const uploadFile = async ({ filePath, destFileName, bucketName }: UploadFileParams): Promise<UploadResponse> => {
    const bucket = await getOrCreateBucket(bucketName);

    const options = {
        destination: destFileName,
        // Optional:
        // Set a generation-match precondition to avoid potential race conditions
        // and data corruptions. The request to upload is aborted if the object's
        // generation number does not match your precondition. For a destination
        // object that does not yet exist, set the ifGenerationMatch precondition to 0
        // If the destination object already exists in your bucket, set instead a
        // generation-match precondition using its generation number.
        // preconditionOpts: { ifGenerationMatch: 0 },
    };

    const uploadResponse = await bucket.upload(filePath, options);
    console.log(`${filePath} uploaded to ${bucketName}`);
    return uploadResponse;
};
