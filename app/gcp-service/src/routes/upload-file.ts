import type { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import multer from 'fastify-multer';
import { v4 as uuid } from 'uuid';

import { getOrCreateServer } from '@local/core/server';
import { uploadFile } from '@local/core/utils';

const server = getOrCreateServer();
const downloadPath = path.join(__dirname, '..', 'downloads');

// Multer setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath);
        }
        cb(null, downloadPath);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

// eslint-disable-next-line @typescript-eslint/ban-types
const fileFilter = (req: unknown, file: any, cb: any) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept
    } else {
        cb(new Error('Invalid File')); // Reject
    }
};

// TODO Discuss storing locally or in memory
const multerStorage = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limit
    },
    fileFilter,
});

interface FastifyMulterRequest extends FastifyRequest {
    file?: Express.Multer.File;
}

server.route({
    method: 'POST',
    url: '/cc2c/upload-file',
    preHandler: multerStorage.single('file'),
    handler: async (req: FastifyMulterRequest, reply: FastifyReply) => {
        const { file, body } = req;

        try {
            const { bucket } = body as { bucket?: string };
            console.log(bucket);
            if (!bucket) throw new Error('Bucket name not provided.');
            if (!file) {
                server.log.error('File undefined');
                throw new Error('The uploaded file could not be read.');
            }

            const { filename, path: filePath } = file;

            const generatedFileName = `${uuid()}-${filename}`;

            await uploadFile({ filePath, destFileName: generatedFileName, bucketName: bucket });

            // Remove file after use
            if (fs.existsSync(file.path))
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });

            reply.code(200).send({ message: 'File uploaded successfully.', generatedFileName });
            return;
        } catch (error: any) {
            console.log(error, typeof error);
            if (error instanceof Error) server.log.error(error);
            if (error?.code === 403) {
                if (error?.errors[0]?.reason === 'retentionPolicyNotMet') {
                    reply.code(403).send({ message: 'This file has already been uploaded.' });
                    return;
                }
            }

            if (file && fs.existsSync(file.path)) {
                // Remove file after use
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });
            }
            reply.code(500).send({ message: error instanceof Error ? error.message : 'An unknown error occurred.' });
        }
    },
});
