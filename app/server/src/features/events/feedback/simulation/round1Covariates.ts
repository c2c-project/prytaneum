export const ROUND1_COVARIATE_KEYS = [
    'region',
    'gender',
    'age',
    'education',
    'race',
    'uscitizen',
    'maritalstatus',
    'religion',
    'religionattend',
    'partyid',
    'income',
    'politics',
    'hhsize',
    'employstatus',
] as const;

export type Round1CovariateKey = typeof ROUND1_COVARIATE_KEYS[number];
export type Round1Persona = Record<Round1CovariateKey, string>;
export type Round1PersonaCovariates = Partial<Round1Persona>;

export const DEFAULT_ROUND1_COVARIATE_KEYS: Round1CovariateKey[] = ['gender'];

const allowedKeys = new Set<string>(ROUND1_COVARIATE_KEYS);

export function normalizeRound1CovariateKeys(keys: readonly string[]): Round1CovariateKey[] {
    if (!Array.isArray(keys) || keys.some((key) => typeof key !== 'string')) {
        throw new Error('Simulation covariates must be an array of strings.');
    }
    if (keys.length === 0) throw new Error('At least one simulation covariate must be selected.');
    const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
    if (duplicates.length > 0) throw new Error(`Simulation covariates contain duplicate key: ${duplicates[0]}.`);
    const invalid = keys.find((key) => !allowedKeys.has(key));
    if (invalid) throw new Error(`Unsupported simulation covariate: ${invalid}.`);
    const selected = new Set(keys);
    return ROUND1_COVARIATE_KEYS.filter((key) => selected.has(key));
}

export function selectRound1Covariates(
    persona: Round1Persona,
    selectedKeys: readonly Round1CovariateKey[]
): Round1PersonaCovariates {
    return Object.fromEntries(selectedKeys.map((key) => [key, persona[key]])) as Round1PersonaCovariates;
}
