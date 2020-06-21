export default {
    fieldError: (): Error =>
        new Error('Please make sure to fill out all fields'),
    notAllowed: (): Error => new Error('Not Allowed to do that!'),
    passMatch: (): Error => new Error('Passwords must match'),
    missingToken: (): Error => new Error('Missing Token.'),
    invalidEmail: (): Error => new Error('Invalid email'),
    invalidInfo: (): Error => new Error('Invalid information provided'),
    internalError: (): Error =>
        new Error('Looks like something went wrong! Please contact support.'), // this means a programming error in the data flow
};
