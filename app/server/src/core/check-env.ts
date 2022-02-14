//
// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────────
//

const isString = (value: unknown): value is string => typeof value === 'string';
const isSecret = (value: string) => value === 'secret';
const isNumber = (value: unknown): value is number => !Number.isNaN(Number(value));

//
// ─── ISVALID FUNCTIONS FOR REACH ENV VARIABLE ───────────────────────────────────
//

// There are only 3 values which are valid for NODE_ENV. At the moment we don't use staging, but we may in the future
const isValidNodeEnv =
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging';

const isProduction = process.env.NODE_ENV === 'production';

const isValidCookieSecret = isProduction
    ? isString(process.env.COOKIE_SECRET) && !isSecret(process.env.COOKIE_SECRET)
    : isString(process.env.COOKIE_SECRET);

const isValidJwtSecret = isProduction
    ? isString(process.env.COOKIE_SECRET) && !isSecret(process.env.COOKIE_SECRET)
    : isString(process.env.COOKIE_SECRET);

// Any number is a valid port.
const isValidPort = isNumber(process.env.PORT);

const isValidHost =
    isString(process.env.HOST) &&
    // These values may change in the future
    (process.env.HOST === '0.0.0.0' || process.env.host === '127.0.0.1' || process.env.HOST === 'localhost');

// This does not need to be defined in production
const isValidGcpProjectId = isProduction ? isString(process.env.GCP_PROJECT_ID) : true;

export function checkEnv() {
    if (!isValidNodeEnv) throw new Error('NODE_ENV is not a valid value');
    if (!isValidCookieSecret) throw new Error('COOKIE_SECRET is not valid');
    if (!isValidJwtSecret) throw new Error('JWT_SECRET is not valid');
    if (!isValidPort) throw new Error('PORT is not valid');
    if (!isValidHost) throw new Error('HOST is not valid');
    if (!isValidGcpProjectId) throw new Error('GCP_PROJECT_ID is not valid');
}
