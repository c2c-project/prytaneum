//
// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────────
//

const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => !Number.isNaN(Number(value));

//
// ─── ISVALID FUNCTIONS FOR REACH ENV VARIABLE ───────────────────────────────────
//

const isValidNodeEnv =
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging' ||
    process.env.NODE_ENV === 'test';

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

// Any number is a valid port.
const isValidPort = isNumber(process.env.PORT);

const isValidHost =
    isString(process.env.HOST) &&
    // These values may change in the future
    (process.env.HOST === '0.0.0.0' || process.env.HOST === '127.0.0.1' || process.env.HOST === 'localhost');

const isValidOrigin = isString(process.env.ORIGIN);

// This only needs to be defined in production.
const isValidGcpProjectId = isProduction || isStaging ? isString(process.env.GCP_PROJECT_ID) : true;
const isValidGcpBucketName = isProduction || isStaging ? isString(process.env.GCP_BUCKET_NAME) : true;

export function checkEnv() {
    if (!isValidNodeEnv) throw new Error('NODE_ENV is not a valid value');
    if (!isValidPort) throw new Error('PORT is not valid');
    if (!isValidHost) throw new Error('HOST is not valid');
    if (!isValidOrigin) throw new Error('ORIGIN is not valid');
    if (!isValidGcpProjectId) throw new Error('GCP_PROJECT_ID is not valid');
    if (!isValidGcpBucketName) throw new Error('GCP_BUCKET_NAME is not valid');
}
