export default {
    fieldError: () => new Error('Please make sure to fill out all fields'),
    notAllowed: () => new Error('Not Allowed to do that!'),
    passMatch: () => new Error('Passwords must match'),
    missingToken: () => new Error('Missing Token.'),
    invalidEmail: () => new Error('Invalid email'),
    invalidInfo: () => new Error('Invalid information provided'),
};
